type TBinaryNode<T> = {
  value: T,
  left: TBinaryNode<T> | null
  right: TBinaryNode<T> | null,
  heigth: number
}

type TDirectionImbalanceNode = 'LEFT' | 'RIGHT' | 'BALANCED'
type TDirectonNode = 'LL' | 'LR' | 'RR' | 'RL'

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
    this.root = this.insert(this.root, value)
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
    const balanceFator = this.getBalanceFactor(node)
    const direction = this.buildBalanceFactor(balanceFator)
    if (direction === 'LEFT') {
      const type = this.calculateBalanceFator(node, node.left)
      if (type === 'LL') {
        return this.rotateRight(node)
      } else if (type === 'LR') {
        node.left = this.rotateLeft(node.left)
        return this.rotateRight(node)
      }
    } else if (direction === 'RIGHT') {
      const type = this.calculateBalanceFator(node, node.right)
      if (type === 'RR') {
        return this.rotateLeft(node)
      } else if (type === 'RL') {
        node.right = this.rotateRight(node.right)
        return this.rotateLeft(node)
      }
    }
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

  public rangeQuery(min: T, max: T): T[] {
    const result: T[] = []
    this.rangeSearchElement(this.root, min, max, result);
    return result
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

  private rangeSearchElement(node: TBinaryNode<T> | null, min: T, max: T, result: T[]): void {
    if (node === null) return
    if (node.value < min) {
      this.rangeSearchElement(node.right, min, max, result)
    } else if (node.value > max) {
      this.rangeSearchElement(node.left, min, max, result)
    } else {
      this.rangeSearchElement(node.left, min, max, result)
      result.push(node.value)
      this.rangeSearchElement(node.right, min, max, result)
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

  private getBalanceFactor(node: TBinaryNode<T> | null): number {
    if (node === null) { return 0 }
    return this.getStoredHeight(node.left) - this.getStoredHeight(node.right)
  }

  private getDirectionNode(bfValue: number): TDirectionImbalanceNode {
    const direction = Math.sign(bfValue)
    if (direction === 1) {
      return 'LEFT'
    }
    if (direction === -1) {
      return 'RIGHT'
    }
    return 'BALANCED'
  }


  private buildBalanceFactor(bfValue: number): TDirectionImbalanceNode {
    if ((bfValue) > 1) {
      return 'LEFT'
    } else if ((bfValue) < -1) {
      return 'RIGHT'
    } else {
      return 'BALANCED'
    }
  }


  private calculateBalanceFator(node: TBinaryNode<T> | null, childNode: TBinaryNode<T> | null): TDirectonNode {
    const nodeDirection = this.getDirectionNode(this.getBalanceFactor(node))[0]
    const childNodeDirection = this.getDirectionNode(this.getBalanceFactor(childNode))[0]
    return nodeDirection + childNodeDirection as TDirectonNode
  }

  private rotateRight(node: TBinaryNode<T> | null): TBinaryNode<T> | null {
    if (node === null) return null
    let child = node.left
    if (child === null) return null
    let subtree = child.right
    child.right = node
    node.left = subtree
    this.updateHeight(node)
    this.updateHeight(child)
    return child
  }

  private rotateLeft(node: TBinaryNode<T> | null): TBinaryNode<T> | null {
    if (node === null) return null
    let child = node.right
    if (child === null) return null
    let subtree = child.left
    child.left = node
    node.right = subtree
    this.updateHeight(node)
    this.updateHeight(child)
    return child
  }

}


const avl = new AVL<number>()

const startInsert = performance.now()

for (let i = 0; i < 50_000_000; i++) {
  avl.append(i)
}

console.log(`Insert: ${performance.now() - startInsert} ms`)
console.log(`Height: ${avl.height()}`)

const startSearch = performance.now()

console.log(avl.search(9_999_999))

console.log(`Search: ${performance.now() - startSearch} ms`)

const startRange = performance.now()

const result = avl.rangeQuery(5_000_000, 5_000_100)

console.log(`Range query: ${performance.now() - startRange} ms`)
console.log(result.length)
