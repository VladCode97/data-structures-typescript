type TTrieNode = {
  children: Map<string, TTrieNode>,
  isWord: boolean
}


class Trie {
  private root: TTrieNode;
  
  constructor() {
    this.root = {
      children: new Map(),
      isWord: false
    }
  }

  public insert(input: string): void {
    input = input.toLowerCase().split('')
    let currentNode = this.root
    for(let i: number = 0; i < input.length ;i++) {
      let existNode = currentNode.children.get(input[i])
      if(existNode) {
        currentNode = existNode
      } else {
        const node: TTrieNode = {
          children: new Map(),
          isWord: false
        }
        currentNode.children.set(input[i], node)
        currentNode = node
      }
    }
    currentNode.isWord = true
  }

  public remove(input: string) {
    input = input.toLowerCase().split('')
    let currentNode = this.root
    const history = []
    for (let i = 0; i < input.length; i++) {
      const existNode = currentNode.children.get(input[i])
      if (existNode) {
        history.push({
          parent: currentNode,
          key: input[i]
        })
        currentNode = existNode
      } else {
        return false
      }
    }
    if (!currentNode.isWord) {
      return false
    }
    currentNode.isWord = false
    while (history.length > 0) {
      const last = history.pop()
      if (!last) {
        break
      }
      const parentNode = last.parent
      const key = last.key
      const childNode = parentNode.children.get(key)
      if (
        !childNode ||
        childNode.children.size > 0 ||
        childNode.isWord
      ) {
        break
      }
      parentNode.children.delete(key)
    }
    return true
  }

  public search(input: string): boolean {
    input = input.toLowerCase().split('')
    let currentNode = this.root
    for(let i = 0; i < input.length; i++) {
      const existNode = currentNode.children.get(input[i])
      if(existNode) {
        currentNode = existNode
      } else {
        return false
      }
    }
    return currentNode.isWord
  }

  public startsWith(input: string): boolean {
      input = input.toLowerCase().split('')
      let currentNode = this.root
      for(let i = 0; i < input.length; i++) {
        const existNode = currentNode.children.get(input[i])
        if(existNode) {
          currentNode = existNode
        } else {
          return false
        }
      }
      return true
  }

  private printNode(
      node: TTrieNode,
      x: number,
      y: number,
      canvas: string[][],
      spacing: number
    ): void {
      const children = [...node.children.entries()]
      for (let i = 0; i < children.length; i++) {
        const [char, child] = children[i]
        const childX =
          x + (i - (children.length - 1) / 2) * spacing
        const childY = y + 2
        const branchX = Math.round((x + childX) / 2)
        const branch = childX < x ? '/' : '\\'
        canvas[y + 1][branchX] = branch
        canvas[childY][Math.round(childX)] = char
        this.printNode(
          child,
          Math.round(childX),
          childY,
          canvas,
          Math.max(4, spacing / 2)
        )
      }
  }

  public print(): void {
      const canvas: string[][] = Array.from(
        { length: 30 },
        () => Array(80).fill(' ')
      )
      const rootX = 40
      const rootY = 0
      const rootText = 'root'
      for (let i = 0; i < rootText.length; i++) {
        canvas[rootY][rootX + i - 1] = rootText[i]
      }
      this.printNode(
        this.root,
        rootX,
        rootY,
        canvas,
        20
      )
      for (const line of canvas) {
        console.log(line.join('').trimEnd())
      }
  }
}


const trie = new Trie()
trie.insert('car')
trie.insert('cat')
trie.insert('can')
trie.insert('dog')
trie.insert('door')
trie.insert('cart')
trie.print()
console.log(trie.search('door'))
console.log(trie.startsWith('l'))
trie.remove('cart')
trie.print()
