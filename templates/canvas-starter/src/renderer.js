/**
 * Anti-Slop Canvas 2D Renderer
 * Draws clean geometric grids, node networks, and vector paths.
 */
export class CanvasRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.colors = {
      bgPrimary: '#090A0F',
      gridHairline: 'rgba(255, 255, 255, 0.08)',
      textPrimary: '#F4F5F8',
      textMuted: '#8A8F9E',
      accent: '#FF4F00',
    };
  }

  clear() {
    this.ctx.fillStyle = this.colors.bgPrimary;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGrid(cols = 8, rows = 5, progress = 1.0) {
    this.ctx.strokeStyle = this.colors.gridHairline;
    this.ctx.lineWidth = 1;

    // Vertical lines
    for (let i = 1; i < cols; i++) {
      const x = (i / cols) * this.width;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height * progress);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let j = 1; j < rows; j++) {
      const y = (j / rows) * this.height;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width * progress, y);
      this.ctx.stroke();
    }
  }

  drawNetwork(nodes, connections, progress = 1.0) {
    // Connections
    this.ctx.strokeStyle = this.colors.accent;
    this.ctx.lineWidth = 1.5;

    connections.forEach(([i, j]) => {
      const n1 = nodes[i];
      const n2 = nodes[j];
      if (!n1 || !n2) return;

      this.ctx.beginPath();
      this.ctx.moveTo(n1.x, n1.y);
      this.ctx.lineTo(
        n1.x + (n2.x - n1.x) * progress,
        n1.y + (n2.y - n1.y) * progress
      );
      this.ctx.stroke();
    });

    // Nodes
    nodes.forEach((node) => {
      this.ctx.fillStyle = this.colors.textPrimary;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      this.ctx.fill();

      // Outer ring
      this.ctx.strokeStyle = this.colors.gridHairline;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
      this.ctx.stroke();
    });
  }

  drawText(text, x, y, font = '700 48px Inter, sans-serif', color = this.colors.textPrimary) {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
  }
}

