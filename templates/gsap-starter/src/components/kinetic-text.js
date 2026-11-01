export function wrapLinesInMasks(lines, container) {
  if (!container) return;
  container.innerHTML = '';

  lines.forEach(({ text, isAccent }) => {
    const mask = document.createElement('div');
    mask.className = 'line-mask';

    const span = document.createElement('span');
    span.className = isAccent ? 'line accent' : 'line';
    span.textContent = text;

    mask.appendChild(span);
    container.appendChild(mask);
  });
}

