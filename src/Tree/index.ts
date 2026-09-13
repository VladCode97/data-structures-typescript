type TBinaryNode = {
  value: T,
  left: TBinaryNode<T> | null
  right: TBinaryNode<T> | null
}

class Queue<T> {

  private data: T[]

  constructor() {
    this.data = []
  }

  enqueue(element: T): void {
    this.data.push(element)
  }

  dequeue(): T |  undefined {
    if(this.isEmpty()) {
      return undefined
    }
    const firstElement = this.peek()
    this.data.shift()
    return firstElement
  }

  peek(): T |  undefined {
    if(this.isEmpty()) {
      return undefined
    }
    return this.data[0]
  }

  isEmpty(): boolean {
    return this.data.length === 0
  }

  print(): void {
    console.log(this.data)
  }

  get Queue() {
    return this.data
  }

}


class Tree<T> {

  private root: TBinaryNode<T> | null
  private queue: Queue<TBinaryNode<T>>

  constructor() {
    this.root = null
    this.queue = new Queue<TBinaryNode<T>>()
  }

  public leverOrder(): T[] {
    const result: T[] = []
    const queueOrder = new Queue<TBinaryNode<T>>()
    queueOrder.enqueue(this.root)
    while(!queueOrder.isEmpty()) {
      const currentNode = queueOrder.dequeue()
      result.push(currentNode.value)
      if(currentNode.left !== null) {
        queueOrder.enqueue(currentNode.left)
       } 
       if(currentNode.right !== null) {
        queueOrder.enqueue(currentNode.right)
       } 
    }
    return result
  } 

  public insert(value: T) {
    const newNode: TBinaryNode<T> = {
      value,
      left: null,
      right: null
    }
    if(this.root === null) {
      this.root = newNode
      this.queue.enqueue(newNode)
      return
    }
    const currentNode = this.queue.peek()
    if(currentNode === undefined) return
    if(currentNode.left === null) {
      currentNode.left = newNode
      this.queue.enqueue(newNode)
      return
    }
    currentNode.right = newNode
    this.queue.enqueue(newNode)
    this.queue.dequeue()
  }


  public preOrder(node: TBinaryNode<T>, data: T) {
    if(node === null) {
      return
    } else {
      data.push(node.value)
      this.preOrder(node.left, data)
      this.preOrder(node.right, data)
    }
  } 

  public inOrder(node: TBinaryNode<T>, data: T) {
    if(node === null) {
      return
    } else {
      this.preOrder(node.left, data)
      data.push(node.value)
      this.preOrder(node.right, data)
    }
  } 

  public postOrder(node: TBinaryNode<T>, data: T) {
    if(node === null) {
      return
    } else {
      this.preOrder(node.left, data)
      this.preOrder(node.right, data)
      data.push(node.value)
    }
  } 

  get Root(): TBinaryNode<T> | null { return this.root }

}

const tree: Tree<number> = new Tree<number>()

tree.insert(1)
tree.insert(2)
tree.insert(3)
tree.insert(4)
console.log(tree.leverOrder())