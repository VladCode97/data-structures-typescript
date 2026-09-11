/**
 * Type
 */ 
export type TPerson = {
  name: string,
  shift: number,
}

/**
 * 
 * Queue stack
 * 
 */ 
class Queue<T extends TPerson> {

  private data: T[]

  constructor() {
    this.data = []
  }

  enqueue(element: T): void {
    this.data.push(element)
  }

  dequeue(): void {
    if(this.isEmpty()) {
      return undefined
    }
    const firstElement = this.peek()
    if(firstElement) {
      if(firstElement.shift === 1) {
         this.data.shift()
       }
       if(firstElement.shift > 1) {
          firstElement.shift-=1;
          this.data.shift()
          this.enqueue(firstElement)
       }
    }
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

}

function main() {
  const queue = new Queue();
  queue.enqueue({
    name: 'Luis',
    shift: 3
  })
  queue.enqueue({
    name: 'Andres',
    shift: 2
  })
  queue.enqueue({
    name: 'Judith',
    shift: 1
  })
  queue.enqueue({
    name: 'Celmira',
    shift: 1
  })
  queue.enqueue({
    name: 'Andrea',
    shift: 2
  });
  while(!queue.isEmpty()) {
    console.log('-------')
    queue.print()
    queue.dequeue()
    console.log('\n')
  }
}


main()
