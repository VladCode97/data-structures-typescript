type TPair<K, V> = {
  key: K,
  value: V
}


class Node<T> {
  value: T
  next: Node<T> | null 
  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

class LinkedList<T> {

  private head: Node<T> | null
  private tail: Node<T> | null

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public append(element: T) {
    const newNode = new Node<T>(element)
    if(this.isEmpty()) {
        this.head = newNode
        this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
  }

  public set(element: T): T | undefined {
    const elementFounded = this.find(element.key);
    if(elementFounded !== undefined) {
      elementFounded.value = element.value
      return elementFounded
    } else {
      return undefined
    }
  }

  public remove(element: T): boolean {
    if(this.head.value.key === element) {
      this.shift()
      return true
    } else if (this.tail.value.key === element) {
      this.pop()
      return true
    } else {
      let currentNode = this.head;
      let prevNode = currentNode
      while(currentNode) {
        if(currentNode.value.key === element) {
          prevNode.next = currentNode.next
          return true
        }
        prevNode = currentNode
        currentNode = currentNode.next
      }
      return false
    } 
  }

  public find(element: T): T | undefined  {
    let currentNode = this.head
    if(this.isEmpty()) {
      return undefined
    } else {
      while(currentNode) {
          if(currentNode.value.key === element ) {
            return currentNode.value
          } 
          currentNode = currentNode.next
      }
    }
    return undefined
  }

    private pop(): void {
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

  private shift(): void {
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

  isEmpty(): boolean {
    return this.head === null
  }

}

function isString<T>(input: T): input is string {
  return typeof input === 'string'
}

function isNumber<T>(input: T): input is number {
  return typeof input === 'number'
}

/****
 *
 * T => Key
 * K => Value 
 * 
 */
class HashMap<K, V> {
    
    private bucket: Array<LinkedList<TPair<K, V>>>
    private elementCount: number;

    public constructor(lengthBucket: number) {
        this.bucket = new Array<LinkedList<TPair<K, V>>>(lengthBucket)
        this.elementCount = 0
    }

    public set(key: K, value: V) {
      const hashIndex = this.indexation(this.hash(key))
      if(this.bucket[hashIndex]) {
        this.bucket[hashIndex].set({key, value})
      }
    }

    public remove(key: K) {
      const hashIndex = this.indexation(this.hash(key))
      console.log(hashIndex)
      if(this.bucket[hashIndex]) {
        if( this.bucket[hashIndex].remove(key)) {
           this.elementCount-=1
          if(this.bucket[hashIndex].isEmpty()) {
            this.bucket[hashIndex] = undefined
          }
        } 
      }
    }

    public add(key: K, value: V) {
      const hashIndex = this.indexation(this.hash(key))
      if(!this.bucket[hashIndex]) {
        const linkedList = new LinkedList<TPair<K, V>>()
        linkedList.append({ key, value })
        this.bucket[hashIndex] = linkedList;
        this.elementCount+=1
      } else {
        this.bucket[hashIndex].append({ key, value })
        this.elementCount+=1
      }
    }


    public size(): number {
      return this.elementCount
    }


    public get(key: K): TPair<K, V> | undefined {
      const hashIndex = this.indexation(this.hash(key))
      if(!this.bucket[hashIndex]) {
        return undefined
      } else {
        return this.bucket[hashIndex].find(key)
      }
    }

    private hash(key: K): number {
      if(isString(key)) {
        return [...key].map((e) => e.charCodeAt(0)).reduce((x, y) => x + y)
      } else if(isNumber(key)) {
        return key
      } else {
        throw new Error('ERROR: invalid type')
      }
    } 

    private indexation(input: number): number {
      return input % this.bucket.length
    }

}

const hashMap: HashMap<string, number> = new HashMap<string, number>(5)
hashMap.add('Luis', 30)
hashMap.add('Judith', 65)
hashMap.add('Celmira', 83)
hashMap.add('Luis Bonilla', 60)
hashMap.set('Luis', 85)
console.log(hashMap.get('Luis'))
console.log(hashMap.remove('Luis'))
console.log(hashMap.get('Luis'))
