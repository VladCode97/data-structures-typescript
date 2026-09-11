class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}


class LinkedList<T> {
  
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(element: T): void {
    const node: Node<T> = new Node<T>(element)
    if(this.head === null) {
      this.head = node
      this.tail = node
      this.size+=1;
    } else {
      this.tail.next = node
      this.tail = node
      this.size+=1;
    }
  }

  prepend(element: T): void {
    const newHead: Node<T> = new Node<T>(element)
    if(this.head === null ) {
      this.head = newHead
      this.tail = newHead
      this.size+=1;
    } else {
      newHead.next = this.head;
      this.head = newHead;
      this.size+=1;
    }
  }

  pop(): void {
    if(this.isEmpty()) { return }
    if(this.head.next === null) {
      this.head = null
      this.tail = null
      this.size = 0
    } else {
      let currentNode = this.head;
      while(currentNode.next) {
        if(currentNode.next === this.tail) {
          currentNode.next = null
          this.tail = currentNode
          this.size-=1
          break
        } else {
          currentNode = currentNode.next
        }
      }
    }
  }

  shift(): void {
    if(this.isEmpty()) {
      console.error('Does not exist element of list')
      return
    }
    if(this.head.next === null) {
      this.head = null
      this.tail = null
      this.size = 0
    } 
    else {
      const newHead = this.head.next;
      this.head = null;
      this.head = newHead
      this.size-=1
    }
  }

  print(): void {
    if(this.isEmpty()) {
      console.error('Does not exist element of list')
    } else {
      let currentNode = this.head;
      let formatPrint: string = ''
      while (currentNode) {
        formatPrint += `${currentNode.value}->`
        currentNode = currentNode.next
      }
      console.log(formatPrint)
    }
  }

  find(element: T): boolean {
    let currentNode = this.head;
    while(currentNode) {
      if(currentNode.value === element) {
        return true
      }
      currentNode = currentNode.next
    }
    return false
  }

  remove(element: T): void {
    if(this.head.value === element) {
      this.shift()
    } else if (this.tail.value === element) {
      this.pop()
    } else {
      let currentNode = this.head;
      let prevNode = currentNode
      while(currentNode) {
        if(currentNode.value === element) {
          prevNode.next = currentNode.next
          this.size-=1
          break
        }
        prevNode = currentNode
        currentNode = currentNode.next
      }
    }
  }

  get Size(): number {
    return this.size;
  }

  private isEmpty(): boolean {
    return this.head === null
  }

}

const linkedList: LinkedList<number> = new LinkedList<number>()
linkedList.append(10)
linkedList.append(20)
linkedList.append(30)
linkedList.append(40)
linkedList.append(50)
linkedList.append(60)
linkedList.print()
const response = linkedList.find(40)
if(response) {
  console.log(`The element was found it`)
} else {
  console.log('The element was not found it')
}
linkedList.remove(30)
linkedList.print()
