type TBinaryNode<T> = {
  value: T,
  left: TBinaryNode<T> | null
  right: TBinaryNode<T> | null,
  heigth: number
}

class AVL<T> {

  private root: TBinaryNode<T> | null

  constructor() {
    this.root = null
  }

  public append(value: T) {
    if (this.root === null) {
      this.root = {
        value,
        left: null,
        right: null,
        heigth: 0
      }
      return
    }
    const currentNode = this.root
    this.insert(currentNode, value)
  }

  private insert(node: TBinaryNode<T> | null, value: T): TBinaryNode<T> | null {
    if (node === null) {
      return {
        value,
        left: null,
        right: null,
        heigth: 0
      }
    }
    if (value < node.value) {
      node.left = this.insert(node.left, value)
    } else if (value > node.value) {
      node.right = this.insert(node.right, value)
    }
    this.updateHeight(node)
    this.getBalanceFactor(node)
    return node
  }

  public print(): void {
    console.log(JSON.stringify(this.root, null, 2))
  }

  public height(node: TBinaryNode<T> | null = this.root): number {
    if (node === null) { return -1 }
    else {
      return 1 + this.max(this.height(node.left), this.height(node.right))
    }
  }


  public search(value: T): boolean {
    if (this.root === null) return false
    if (this.root.value === value) return true
    const currentNode = this.root
    const isFounded = this.searchElement(currentNode, value)
    return isFounded !== null
  }

  private searchElement(node: TBinaryNode<T> | null, value: T): TBinaryNode<T> | null {
    if (node === null) { return null }
    if (node.value === value) return node
    else {
      if (value < node.value) {
        return this.searchElement(node.left, value)
      }
      if (value > node.value) {
        return this.searchElement(node.right, value)
      }
      return null
    }
  }


  private updateHeight(node: TBinaryNode<T> | null): void {
    if (node === null) return
    node.heigth = 1 + this.max(
      this.getStoredHeight(node.left),
      this.getStoredHeight(node.right)
    )
  }

  private getStoredHeight(node: TBinaryNode<T> | null): number {
    return node === null ? -1 : node.heigth
  }

  private max(nodeLeftValue: number, nodeRightValue: number): number {
    return Math.max(nodeLeftValue, nodeRightValue)
  }

  private getBalanceFactor(node: TBinaryNode<T> | null) {
    if (node === null) { return '' }
    const result = this.getStoredHeight(node.left) - this.getStoredHeight(node.right)
    switch (result) {
      case 0: {
        console.log(`The node ${node.value} is perfectly balanced`)
        break
      }
      case 1: {
        console.log(`The node ${node.value}:: The left subtree is 1 level taller than the right subtree`)
        break
      }
      case -1: {
        console.log(`The node ${node.value}:: The right subtree is 1 level taller than the left subtree`)
        break
      }
      case 2: {
        console.log(`The node ${node.value}:: The left subtree is 2 levels taller than the right subtree — unbalanced`)
        break
      }
      case -2: {
        console.log(`The node ${node.value}:: The right subtree is 2 levels taller than the left subtree — unbalanced`)
        break
      }
    }
  }

}

const avl: AVL<number> = new AVL<number>()
avl.append(1)
avl.append(-2)
avl.append(3)
avl.append(-3)
avl.append(-1)
avl.print()
console.log(avl.search(-3))
console.log(avl.height())
