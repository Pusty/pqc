// Manually adjust fixed colors from svgs to theme variables

// gray
document.querySelectorAll('path[fill="#909090"]').forEach(el => {
 el.setAttribute('fill', '');
 el.setAttribute('style', 'fill: var(--sidebar-non-existant);');
 el.style.fill = 'var(--sidebar-non-existant)';
});

document.querySelectorAll('path[stroke="#909090"]').forEach(el => {
 el.setAttribute('stroke', '')
 el.style.stroke = 'var(--sidebar-non-existant)';
});

// black
document.querySelectorAll('path[fill="#000000"]').forEach(el => {
 el.setAttribute('fill', '');
 el.style.fill = 'var(--fg)';
});

document.querySelectorAll('path[stroke="#000000"]').forEach(el => {
 el.setAttribute('stroke', '')
 el.style.stroke = 'var(--fg)';
});

document.querySelectorAll('rect[fill="#000000"]').forEach(el => {
 el.setAttribute('fill', '');
 el.style.fill = 'var(--fg)';
});

document.querySelectorAll('rect[stroke="#000000"]').forEach(el => {
 el.setAttribute('stroke', '');
 el.style.stroke = 'var(--fg)';
});

document.querySelectorAll('div[style]').forEach(el => {
 if(el.style["color"] == "") return;
 if(el.style["color"] != "rgb(0, 0, 0)" && el.style["color"] != "rgb(0, 0, 0, 255)" && el.style["color"] != "#000000") return;
 el.style.color='var(--fg)';
});


// Fix plot font color

document.querySelectorAll('path[style="stroke:#000000;stroke-width:0.8"]').forEach(el => {
 el.setAttribute('style', 'stroke: var(--fg);stroke-width:0.8');
});

document.querySelectorAll('path[style="fill:none;stroke:#000000;stroke-width:0.8;stroke-linecap:square;stroke-linejoin:miter"]').forEach(el => {
 el.setAttribute('style', "fill:none;stroke:var(--fg);stroke-width:0.8;stroke-linecap:square;stroke-linejoin:miter");
});