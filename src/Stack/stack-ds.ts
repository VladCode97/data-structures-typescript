class Stack<T> {
 
  private data: T[];
  private minValue: T;
  private historyMin: T[]
  
  constructor() {
    this.data= []
    this.historyMin = []
  }

  push(element: T): void {
    if(this.data.length === 0 ) {
      this.minValue = element
      this.historyMin.push(this.minValue)
    }
    if(element <= this.minValue) {
      this.minValue = element
      this.historyMin.push(this.minValue)
    }
    this.data.push(element)
  }

  pop():T | undefined {
    if(this.isEmpty()) {
      return undefined
    }
    const lastElement = this.peek();
    this.data.pop()
    if(lastElement === this.historyMin[this.historyMin.length - 1]) {
      this.historyMin.pop()
      this.minValue = this.historyMin[this.historyMin.length - 1]
    }
    return lastElement;
  }

  peek(): T | undefined{
    if(this.isEmpty()) {
      return undefined
    }
    const length: number = this.data.length;
    return  this.data[length - 1]
  }

  isEmpty(): boolean {
    return (this.data.length === 0)
  }

  print(): void {
    console.log(this.data)
  }

  getMin(): T {
    return this.minValue
  }

}

//Data structure

/***
 * 
 * 
 */
function reverseWithStack(input: string): string {
  const stack: Stack<string> = new Stack<string>()
  input.split('').forEach((e) => stack.push(e))
  const reverse = []
  while(!stack.isEmpty()) {
    reverse.push(stack.pop())
  }
  return reverse.join('')
}

function main() {
  const stack: Stack<number> = new Stack<number>()
  stack.push(5)
  stack.push(3)
  stack.push(3)
  stack.print()
  console.log(stack.getMin())
  stack.pop()
  console.log(stack.getMin())
  stack.print()
}

//const input: string = "hello"
//console.log(response)
main()