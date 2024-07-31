// https://cryptopedia.dev/posts/kyber/

// Mod in Z/nZ
function mod(n, m) {
  return ((n % m) + m) % m;
};


function abs(n) {
    return n < 0n ? -n : n;
}

function polymul(a, b, m) {
    var len_a = Number(degree(a))+1;
    var len_b = Number(degree(b))+1;
    
    if(len_a == 0 || len_b == 0) {
        return [];
    }
    
    var res = Array(len_a+len_b-1).fill(0n);
    for(var i=0;i<len_a;i++) {
       for(var j=0;j<len_b;j++) { 
        res[(i+j)] = mod(res[i+j] + (a[i]*b[j]), m);
       }
    }
    
    while (res.indexOf(0) === 0n) { // remove leading 0s
        res.shift()
    }
    return res;
}

function polyadd(a, b, m) {
    var len_a = Number(degree(a))+1;
    var len_b = Number(degree(b))+1;

    var res = Array(Math.max(len_a,len_b)).fill(0n);
    for(var i=0;i<len_a;i++) {
        res[i] = mod(a[i], m);
    }
    for(var i=0;i<len_b;i++) {
        res[i] = mod(res[i] + b[i], m);
    }
    return res;
}

function polysub(a, b, m) {
    var len_a = Number(degree(a))+1;
    var len_b = Number(degree(b))+1;
    
    var res = Array(Math.max(len_a,len_b)).fill(0n);
    for(var i=0;i<len_a;i++) {
        res[i] = mod(a[i], m);
    }
    for(var i=0;i<len_b;i++) {
        res[i] = mod(res[i] - b[i], m);
    }
    return res;
}

function degree(poly) {
    if(poly.length == 0) { return -1n; }
    if(poly[poly.length-1] !== 0n) { return BigInt(poly.length-1); }
    for(var i=poly.length-1;i>=0;i--) {
        if(poly[i] !== 0n) {
            return BigInt(i);
        }
    }
    return -1n;
}

function polyprint(poly) {
    var polystr = poly.map((x, index) => x===0n ? "" : (x+" x^{"+index+"}")).filter(x => x!="").reduce((x,y) => x+" + "+y, "").replaceAll(" x^{0}", "").replaceAll("x^{1}", "x").replaceAll(" + 1 x", " + x");
    return polystr == "" ? "0":polystr.substr(3);
}

function polymod(a, b, m) {
    var len_a = Number(degree(a))+1;
    var len_b = Number(degree(b))+1;
    if(len_b == 0) {
        throw "Can't divide by 0"
    }
    if(len_a < len_b) {
        var res = Array(len_a).fill(0n);
        for(var i=0;i<len_a;i++) {
            res[i] = a[i];
        }
        return res;
    }
    
    if(len_b == 1) {
        return [a[0]];
    }
    
    var len_q = len_a - len_b + 1;
    var len_r = len_b;
    var r = Array(len_r).fill(0n);
    for(var i=0;i<len_r-1;i++) {
        r[(1+i)%len_r] = a[len_a - 1 - i];
    }
    
    for(var i=0;i<len_q;i++) {
        r[i] = a[(len_a - 1)-(i+len_r-1)];
        if(r[i+1] > 0n) {
            var q = mod(r[i+1] * b[len_b-1] ,m);
            for(var j=1;j<len_b;j++) {
                r[(j+i+1)%len_r] = mod(r[(j+i+1)%len_r] - mod(q * b[len_b-1-j],m), m);
            }
        }
    }
    res = (r.slice(len_q+1, len_r).concat(r.slice(0, len_q))).reverse();
    while (res.indexOf(0) === 0n) { // remove leading 0s
        res.shift()
    }
    return res;
}


var globalQ = 47n; //3329n; //17n; // Prime, Modulo
var globalN = 4; // maximum degree of polynomials
var globalF = Array(globalN+1).fill(0n); //[1n, 0n, 0n, 0n, 1n]; // Modulo Poly
globalF[0] = 1n;
globalF[globalN] = 1n;
var globalK = 2; // amount of polynomials per vector

var globalEta = 2;


function sampleRandom(q) {
    var eta = globalEta;
    var input_bytes = new Uint8Array(globalN/4*eta);
    var output = [];
    crypto.getRandomValues(input_bytes);
    for(var i=0;i<globalN;i++) {
        var a = 0n;
        var b = 0n;
        for(var j=0;j<eta;j++) {
            var ai = 2*i*eta + j;
            var bi = 2*i*eta + eta + j;
            a += BigInt((input_bytes[Math.floor(ai/8)] >> (ai%8))&1);
            b += BigInt((input_bytes[Math.floor(bi/8)] >> (bi%8))&1);
        }
        output.push(mod(a-b, q));
    }
    return output;
}

function sampleRandomVector(q) {
    var out=[];
    for(var i=0;i<globalK;i++) {
        out.push(sampleRandom(q));
    }
    return out;
}

function sampleUniformMatrix(q) {
    var mat = [];
    for(var i=0;i<globalK;i++) {
        var row = [];
        for(var j=0;j<globalK;j++) {
            var input_bytes = new Uint32Array(globalN);
            crypto.getRandomValues(input_bytes);
            var vector = [];
            for(var x=0;x<globalN;x++) {
                vector.push(mod(BigInt(input_bytes[x]), q));
            }
            row.push(vector);
        }
        mat.push(row);
    }
    return mat;
}

function genSecretKey(q) {
    var sec = sampleRandomVector(q); //[[0n, 1n, 16n, 16n], [0n, 16n, 0n, 16n]];
    return sec;
}
function genPublicKey(s, f, q) {
    var A = sampleUniformMatrix(q);  // [[[11n, 16n, 16n, 6n], [3n, 6n, 4n, 9n]], [[1n, 10n, 3n, 5n],[15n, 9n, 1n, 6n]]];
    var e = sampleRandomVector(q); // [[0n, 0n, 1n, 0n], [0n, 16n, 1n, 0n]];
    var t = [polymod(polyadd(polyadd(polymul(A[0][0], s[0], q), polymul(A[0][1], s[1],q),q), e[0] ,q), f, q),
             polymod(polyadd(polyadd(polymul(A[1][0], s[0], q), polymul(A[1][1], s[1],q),q), e[1] ,q), f, q)];
    return [A, e, t];
}

function encrypt(v, A, t, f, q) {
    var r = sampleRandomVector(q); // [[0n, 0n, 1n, 16n], [16n, 0n, 1n, 1n]];
    var e1 = sampleRandomVector(q); // [[0n, 1n, 1n, 0n], [0n, 0n, 1n, 0n]];
    var e2 = sampleRandom(q); // [0n, 0n, 16n, 16n];
    
    var bits = BigInt(degree(f));
    var m = [];
    for(var i=0n;i<bits;i++) {
        m.push(v%2n === 1n?BigInt(Math.round(Number(q)/2)):0n);
        v = v / 2n;
    }
    
    var u = [polymod(polyadd(polyadd(polymul(A[0][0], r[0], q), polymul(A[1][0], r[1],q),q), e1[0] ,q), f, q),
             polymod(polyadd(polyadd(polymul(A[0][1], r[0], q), polymul(A[1][1], r[1],q),q), e1[1] ,q), f, q)];
             

    var v = polymod(polyadd(polyadd(polyadd(polymul(t[0],r[0],q),polymul(t[1],r[1],q),q),m,q),e2,q) ,f, q);
    
    return [r, e1, e2, m, u, v];
}

function decrypt(u, v, s, f, q) {
    var mn = polymod(polysub(v, polyadd(polymul(s[0], u[0],q), polymul(s[1], u[1],q), q),q) ,f, q);
    
    const hq = BigInt(Math.round(Number(q)/2));
    
    var bits = BigInt(degree(f));
    
    var dv = 0n;
    for(var i=0;i<bits;i++) {
        dv = dv * 2n;
        if(abs(mn[mn.length-1-i] - hq)*2n < hq) {
            dv = dv + 1n;
        }
    }
    
    return [mn, dv];
}


// https://github.com/pq-crystals/security-estimates/tree/master
// Code to calculate error chance

var fac_mem = [];
function fac(x) {
    if (x === 0 || x === 1) {
        return 1;
    }
    if (fac_mem[x] > 0) {
        return fac_mem[x];
    }
    
    fac_mem[x] = fac(x-1) * x;
    return fac_mem[x];
}

function binomial(x, y) {
    if(x-y < 0 || x < 0 || y < 0) { return 0; }
    var fy = fac(y);
    var fxy = fac(x-y);
    var fx = fac(x);
    if(fy === 0 || fxy === 0) {
        return 0;
    }
    return fx/fy/fxy;
}

function centered_binomial_pdf(k, x) {
    return binomial(2*k, x+k) / (1<<(2*k));
}

function build_centered_binomial_law(k) {
    var D = {};
    for(var i=-k; i<k+1; i++) {
        D[i] = centered_binomial_pdf(k, i);
    }
    return D;
}

function law_convolution(A, B) {
    var C = {};
    
    for (const [keyA, valueA] of Object.entries(A)) {
        for (const [keyB, valueB] of Object.entries(B)) {
            var c = Number(keyA) + Number(keyB);
            C[c] = (C[c]??0) + valueA * valueB;
        }
    }
    return C;
}

function law_product(A, B) {
    var C = {};
    
    for (const [keyA, valueA] of Object.entries(A)) {
        for (const [keyB, valueB] of Object.entries(B)) {
            var c = Number(keyA) * Number(keyB);
            C[c] = (C[c]??0) + valueA * valueB;
        }
    }
    return C;
}

function iter_law_convolution(A, i) {
    var D = {"0": 1.0};
    var i_bin = (i >>> 0).toString(2);
    for(var j=0;j<i_bin.length;j++) {
        D = law_convolution(D, D);
        D = clean_dist(D);
        if(i_bin[j] == "1") {
            D = law_convolution(D, A);
            D = clean_dist(D);
        }
    }
    return D;
}

function clean_dist(A) {
    var B = {};
    for (const [x, y] of Object.entries(A)) {
        if(y > 2**(-300)) {
            B[Number(x)] = y;
        }
    }
    return B;
}

function p2_cyclotomic_final_error_distribution() {
    var chis = build_centered_binomial_law(globalEta);
    var chie = build_centered_binomial_law(globalEta);
    var chie_pk = build_centered_binomial_law(globalEta);
    
    var B1 = law_product(chie_pk, chis);
    var B2 = law_product(chis, chie);
    
    C1 = iter_law_convolution(B1, globalK * globalN); 
    C2 = iter_law_convolution(B2, globalK * globalN);

    var C=law_convolution(C1, C2);
    var D = law_convolution(C, chie);
    return D;
}

function tail_probability(D, t) {
    var s = 0;
    var ma = 0;
    for (const [x, y] of Object.entries(D)) {
        if(Number(x) > ma) {
            ma = Number(x);
        }
    }
    if(t >= ma) { return 0; }
    for(var i=ma-1;i>=Math.ceil(t);i--) {
        s = s + (D[i] ?? 0) + (D[-i] ?? 0);
    }
    return s;
}

function p2_cyclotomic_error_probability(q) {
    var F = p2_cyclotomic_final_error_distribution();
    proba = tail_probability(F, Number(q)/4);
    return globalN*proba;
}

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}


function process() {

    var readX =  BigInt(document.getElementById("x").value);
    var readQ =  Number(document.getElementById("q").value);
    
    
    if(q < 2 || !isPrime(readQ)) {
    
        const div = document.getElementById("contentHere");
        div.innerHTML = "";
        div.appendChild(document.createTextNode("q needs to be prime"));
        return;
    }
   
    //var q = globalQ;
    var q = BigInt(readQ);
    
    var f = globalF;
    var s = genSecretKey(q);
    var [A, e, t] = genPublicKey(s, f, q);
    var [r, e1, e2, m, u, v] = encrypt(readX, A, t, f, q);
    var [mn, dv] = decrypt(u, v, s, f, q);
    
    var noise = polymod(polysub(mn, m, q), f, q);
    
    const div = document.getElementById("contentHere");
    div.innerHTML = "";
    
    
    div.appendChild(document.createTextNode("$$ n = "+globalN+", k = "+globalK+", q = "+q+" $$"));
    
    div.appendChild(document.createTextNode("$$ s = ("+polyprint(s[0])+", "+polyprint(s[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ \\textbf{A} = \\begin{bmatrix} "+polyprint(A[0][0])+" & "+polyprint(A[0][1])+" \\\\ "+polyprint(A[1][0])+" & "+polyprint(A[1][1])+" \\end{bmatrix} $$"));
    div.appendChild(document.createTextNode("$$ e = ("+polyprint(e[0])+", "+polyprint(e[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ t = \\textbf{A}  s + e = ("+polyprint(t[0])+", "+polyprint(t[1])+")"+"$$"));
    
    
    div.appendChild(document.createTextNode("$$ \\text{Encryption:} $$"));
    div.appendChild(document.createTextNode("$$ r = ("+polyprint(r[0])+", "+polyprint(r[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ e_1 = ("+polyprint(e1[0])+", "+polyprint(e1[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ e_2 = "+polyprint(e2)+"$$"));
    div.appendChild(document.createTextNode("$$ m = encode(x) = "+polyprint(m)+"$$"));
    div.appendChild(document.createTextNode("$$ u = \\textbf{A} ^T r + e_1 = ("+polyprint(u[0])+", "+polyprint(u[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ v = t^T r + e_2 + m = "+polyprint(v)+"$$"));
    div.appendChild(document.createElement("br"));

    div.appendChild(document.createTextNode("$$ \\text{Decryption:} $$"));
    div.appendChild(document.createTextNode("$$ m_{noisy} = v - s^T u = e^T r + e_2 + m - s^T e_1 = "+polyprint(mn)+"$$"));
    div.appendChild(document.createTextNode("$$ noise = e^T r + e_2 - s^T e_1 = "+polyprint(noise)+"$$"));
    div.appendChild(document.createTextNode("$$ v_{dec} = decode(m_{noisy}) = "+dv+"$$"));
    div.appendChild(document.createTextNode("$$ \\delta \\text{ (decode error chance)} = "+p2_cyclotomic_error_probability(q)*100+" \\% $$"));


    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}