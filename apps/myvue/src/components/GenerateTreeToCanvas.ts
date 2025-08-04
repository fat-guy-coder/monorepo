export interface KnowledgeNode {
  id: string;
  name: string;
  description: string;
  code?: string;
  children?: KnowledgeNode[];
  position?: { x: number; y: number };
  expanded?: boolean;
}

export default class TreeVisualizer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private treeData: KnowledgeNode;
  private selectedNode: KnowledgeNode | null = null;
  private nodeRadius = 20;
  private levelHeight = 100;
  private nodeWidth = 150;

  constructor(canvasId: string, treeData: KnowledgeNode) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.treeData = treeData;

    this.initCanvas();
    this.calculatePositions(this.treeData);
    this.drawTree();
    this.setupEventListeners();
  }

  private initCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private calculatePositions(node: KnowledgeNode, x = this.canvas.width / 2, y = 50, level = 0) {
    node.position = { x, y };
    if (node.children && node.expanded) {
      const childrenCount = node.children.length;
      const startX = x - (childrenCount - 1) * this.nodeWidth / 2;
      node.children.forEach((child, i) => {
        this.calculatePositions(
          child,
          startX + i * this.nodeWidth,
          y + this.levelHeight,
          level + 1
        );
      });
    }
  }

  private drawTree() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawNode(this.treeData);
  }

  private drawNode(node: KnowledgeNode) {
    if (!node.position) return;

    // Draw connections
    if (node.children && node.expanded) {
      node.children.forEach(child => {
        if (child.position) {
          this.ctx.beginPath();
          this.ctx.moveTo((node.position?.x as number), (node.position?.y as number) + this.nodeRadius);
          this.ctx.lineTo(child.position?.x, child.position?.y - this.nodeRadius);
          this.ctx.strokeStyle = '#999';
          this.ctx.stroke();
        }
      });
    }

    // Draw node
    this.ctx.beginPath();
    this.ctx.arc(node.position.x, node.position.y, this.nodeRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = node.children ? '#4CAF50' : '#2196F3';
    this.ctx.fill();
    this.ctx.strokeStyle = '#fff';
    this.ctx.stroke();

    // Draw text
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = '14px Arial';
    this.ctx.fillText(node.name, node.position.x, node.position.y);

    // Draw children
    if (node.children && node.expanded) {
      node.children.forEach(child => this.drawNode(child));
    }
  }

  private findNodeAt(x: number, y: number, node = this.treeData): KnowledgeNode | null {
    if (!node.position) return null;

    const dx = node.position.x - x;
    const dy = node.position.y - y;
    if (Math.sqrt(dx * dx + dy * dy) < this.nodeRadius) {
      return node;
    }

    if (node.children && node.expanded) {
      for (const child of node.children) {
        const found = this.findNodeAt(x, y, child);
        if (found) return found;
      }
    }
    return null;
  }

  private toggleNodeExpansion(node: KnowledgeNode) {
    if (node.children) {
      node.expanded = !node.expanded;
      this.calculatePositions(this.treeData);
      this.drawTree();
    }
  }

  private showDetailPanel(node: KnowledgeNode) {
    const panel = document.getElementById('detailPanel')!;
    const title = document.getElementById('nodeTitle')!;
    const desc = document.getElementById('nodeDesc')!;
    const code = document.getElementById('nodeCode')!;

    panel.style.display = 'block';
    title.textContent = node.name;
    desc.textContent = node.description;
    code.textContent = node.code || '// 暂无代码示例';
  }

  private setupEventListeners() {
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const node = this.findNodeAt(x, y);
      if (node) {
        this.selectedNode = node;
        if (node.children) {
          this.toggleNodeExpansion(node);
        }
        this.showDetailPanel(node);
      }
    });

    window.addEventListener('resize', () => {
      this.initCanvas();
      this.calculatePositions(this.treeData);
      this.drawTree();
    });
  }
}
