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

}


const queue: Queue<string> = new Queue<string>()

/***
 * 
 * 
 */ 
function processTasks(tasks: string[]): string[] {
    let taskQueue: string[] = []
    tasks.forEach((task) => {
      queue.enqueue(task)
    })
    while(!queue.isEmpty()) {
        const element = queue.dequeue()
        taskQueue.push(element)
    }
    return taskQueue
}

const tasks: string[] = ["task-A", "task-B", "task-C"]
const response = processTasks(tasks)
console.log(response)
