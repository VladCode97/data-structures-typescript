type TBinaryNode<T> = {
  value: T,
  left: TBinaryNode<T> | null
  right: TBinaryNode<T> | null,
  heigth?: number
}

class AVL<T> {


  private root: TBinaryNode<T>  | null

  constructor() {
    this.root = null
  }

  public append(value: T) {
    if(this.root === null) {
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

  private insert(node: TBinaryNode<T>  | null , value: T): TBinaryNode<T>  | null {
    if( node === null ) { 
      node = {
        value,
        left: null,
        right: null,
        heigth: 0
      }
      return node
    } else {
      if( value < node.value ) {
        node.left = this.insert(node.left, value)
        return node
      }
      if( value > node.value ) {
        node.right = this.insert(node.right, value)
        return node
      }
      return node
    }
  }

  public search(value: T): boolean {
    if(this.root === null) return false
    if(this.root.value === value) return true
    const currentNode = this.root
    const isFounded = this.searchElement(currentNode, value)
    return isFounded !== null  
  }

  private searchElement(node: TBinaryNode<T>  | null , value: T): TBinaryNode<T>  | null {
    if(node === null) { return null }
    if(node.value === value) return node
    else {
      if( value < node.value ) {
        return this.searchElement(node.left, value)
      }
      if( value > node.value ) {
        return this.searchElement(node.right, value)
      }
    }
  }

  public print(): void {
    console.log(JSON.stringify(this.root, null, 2))
  }

}

const avl: AVL<number> = new AVL<number>()
avl.append(1)
avl.append(-2)
avl.append(3)
avl.print()
console.log(avl.search(-3))