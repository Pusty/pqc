// Manually adjust fixed colors from svgs to theme variables

// gray
document.querySelectorAll('path[fill="#909090"]').forEach(el => {
 el.setAttribute('fill', '');
 el.setAttribute('style', 'fill: var(--sidebar-non-existant);');
});

document.querySelectorAll('path[stroke="#909090"]').forEach(el => {
 el.setAttribute('stroke', '')
 el.setAttribute('style', 'stroke: var(--sidebar-non-existant);');
});

// black
document.querySelectorAll('path[fill="#000000"]').forEach(el => {
 el.setAttribute('fill', '');
 el.setAttribute('style', 'fill: var(--fg);');
});

document.querySelectorAll('path[stroke="#000000"]').forEach(el => {
 el.setAttribute('stroke', '')
 el.setAttribute('style', 'stroke: var(--fg);');
});


// Fix plot font color

document.querySelectorAll('path[style="stroke:#000000;stroke-width:0.8"]').forEach(el => {
 el.setAttribute('style', 'stroke: var(--fg);stroke-width:0.8');
});

document.querySelectorAll('path[style="fill:none;stroke:#000000;stroke-width:0.8;stroke-linecap:square;stroke-linejoin:miter"]').forEach(el => {
 el.setAttribute('style', "fill:none;stroke:var(--fg);stroke-width:0.8;stroke-linecap:square;stroke-linejoin:miter");
});