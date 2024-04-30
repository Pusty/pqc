# [Baby Kyber](https://cryptopedia.dev/posts/kyber/)

<input type="number" id="x" name="x" value="1">
<button type="button" onclick="process()">Encrypt</button> 
<br>

<hr>

<div id="contentHere" style="overflow-x: scroll">
</div>



<script>
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
    var res = Array(len_a+len_b-1).fill(0n);
    for(var i=0;i<len_a;i++) {
       for(var j=0;j<len_b;j++) { 
        res[(i+j)] = mod(res[i+j] + (a[i]*b[j]), m);
       }
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
    return poly.map((x, index) => x===0n ? "" : (x+" x^{"+index+"}")).filter(x => x!="").reduce((x,y) => x+" + "+y, "0").replaceAll(" x^{0}", "").replaceAll("x^{1}", "x").replaceAll(" + 1 x", " + x").replaceAll("0 + ", "");
}

function polymod(a, b, m) {
    var len_a = Number(degree(a))+1;
    var len_b = Number(degree(b))+1;
    if(len_b == 1 && b[0] === 0n) {
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
                r[(j+i+1)%len_r] = mod(r[(j+i+1)%len_r] - mod(q * b[len_b-1-j],m),m);
            }
        }
    }
    return (r.slice(len_q+1, len_r).concat(r.slice(0, len_q))).reverse();
}

var globalQ = 17n; // Prime, Modulo
var globalF = [1n, 0n, 0n, 0n, 1n]; // Modulo Poly


function genSecretKey() {
    return [[0n, 1n, 16n, 16n], [0n, 16n, 0n, 16n]];
}
function genPublicKey(s, f, q) {
    var A = [[[11n, 16n, 16n, 6n], [3n, 6n, 4n, 9n]], [[1n, 10n, 3n, 5n],[15n, 9n, 1n, 6n]]];
    var e = [[0n, 0n, 1n, 0n], [0n, 16n, 1n, 0n]];
    var t = [polymod(polyadd(polyadd(polymul(A[0][0], s[0], q), polymul(A[0][1], s[1],q),q), e[0] ,q), f, q),
             polymod(polyadd(polyadd(polymul(A[1][0], s[0], q), polymul(A[1][1], s[1],q),q), e[1] ,q), f, q)];
    return [A, e, t];
}

function encrypt(v, A, t, f, q) {
    var r = [[0n, 0n, 1n, 16n], [16n, 0n, 1n, 1n]];
    var e1 = [[0n, 1n, 1n, 0n], [0n, 0n, 1n, 0n]];
    var e2 = [0n, 0n, 16n, 16n];
    
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

function process() {

    var readX =  BigInt(document.getElementById("x").value);
   
   
    var q = globalQ;
    var f = globalF;
    var s = genSecretKey();
    var [A, e, t] = genPublicKey(s, f, q);
    var [r, e1, e2, m, u, v] = encrypt(readX, A, t, f, q);
    var [mn, dv] = decrypt(u, v, s, f, q);
    
    const div = document.getElementById("contentHere");
    div.innerHTML = "";
    
    
    div.appendChild(document.createTextNode("$$ n = 4, k = 2, q = "+q+" $$"));
    
    div.appendChild(document.createTextNode("$$ s = ("+polyprint(s[0])+", "+polyprint(s[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ \\textbf{A} = \\begin{bmatrix} "+polyprint(A[0][0])+" & "+polyprint(A[0][1])+" \\\\ "+polyprint(A[1][0])+" & "+polyprint(A[1][1])+" \\end{bmatrix} $$"));
    div.appendChild(document.createTextNode("$$ e = ("+polyprint(e[0])+", "+polyprint(e[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ t = \\textbf{A}  s + e = ("+polyprint(t[0])+", "+polyprint(t[1])+")"+"$$"));
    div.appendChild(document.createElement("br"));
    
    
    div.appendChild(document.createTextNode("$$ \\text{Encryption:} $$"));
    div.appendChild(document.createTextNode("$$ r = ("+polyprint(r[0])+", "+polyprint(r[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ e_1 = ("+polyprint(e1[0])+", "+polyprint(e1[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ e_2 = "+polyprint(e2)+"$$"));
    div.appendChild(document.createTextNode("$$ m = encode(x) = "+polyprint(m)+"$$"));
    div.appendChild(document.createTextNode("$$ u = \\textbf{A} ^T r + e_1 = ("+polyprint(u[0])+", "+polyprint(u[1])+")"+"$$"));
    div.appendChild(document.createTextNode("$$ v = t^T r + e_2 + m = "+polyprint(v)+"$$"));
    div.appendChild(document.createElement("br"));

    div.appendChild(document.createTextNode("$$ \\text{Decryption:} $$"));
    div.appendChild(document.createTextNode("$$ m_{noisy} = v - s^T u = e^T r + e_2 + m + s^T e_1 = "+polyprint(mn)+"$$"));
    div.appendChild(document.createTextNode("$$ v_{dec} = decode(m_{noisy}) = "+dv+"$$"));
    div.appendChild(document.createElement("br"));

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}


</script>