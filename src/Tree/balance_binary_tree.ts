/**
 *
 * Type reference
 */
type TBinaryNode<T> = {
  value: T,
  left: TBinaryNode<T> | null,
  right: TBinaryNode<T>  | null
}


/**
 *
 * Tree
 *
 */
class BalanceBinaryTree<T> {

  private root: TBinaryNode<T> | null

  public constructor() {
    this.root = null
  }

  public append(value: T) {
    if(this.root === null) {
      this.root = {
        value,
        left: null,
        right: null
      }
      return
    }
    const currentNode = this.root
    this.insert(currentNode, value)
  }

  public insert(currentNode: TBinaryNode<T> | null, value: T): TBinaryNode<T> | null {
    if(currentNode === null) {
      currentNode = {
        value,
        left: null,
        right: null
      }
      return currentNode
    } else {
      if( value < currentNode.value ) {
        currentNode.left = this.insert(currentNode.left, value)
        return currentNode
      }
      if (value > currentNode.value) {
        currentNode.right = this.insert(currentNode.right, value)
        return currentNode
      }
      return currentNode
    }
  }

  public print(): void {
     console.log(JSON.stringify(this.root, null, 2))
  }

  public search(value): boolean {
    if (this.root === null) return false
    if(this.root.value === value) { return true }
    const currentNode = this.root
    const searchNode = this.searchValue(currentNode, value)
    return searchNode !== null
  }

  private searchValue(currentNode: TBinaryNode<T> | null, value: T): TBinaryNode<T> | null {
    if(currentNode === null) { return null }
    if(currentNode.value === value) { return currentNode }
    else {
      if(value < currentNode.value) {
        return this.searchValue(currentNode.left, value)
      }
      if(value > currentNode.value) {
        return this.searchValue(currentNode.right, value)
      }
    }
  }

}

const balanceBinaryTree: BalanceBinaryTree<number> = new BalanceBinaryTree<number>()
balanceBinaryTree.append(1)
balanceBinaryTree.append(-2)
balanceBinaryTree.append(3)
balanceBinaryTree.print()
console.log(balanceBinaryTree.search(-2))

