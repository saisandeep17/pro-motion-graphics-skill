export function renderGridLines(container, cols = 8, rows = 5) {
  if (!container) return;
  container.innerHTML = '';

  for (let i = 1; i < cols; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line v';
    line.style.left = `${(i / cols) * 100}%`;
    container.appendChild(line);
  }

  for (let j = 1; j < rows; j++) {
    const line = document.createElement('div');
    line.className = 'grid-line h';
    line.style.top = `${(j / rows) * 100}%`;
    container.appendChild(line);
  }
}

