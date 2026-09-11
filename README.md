# Data Structures in TypeScript

Implementations of fundamental data structures built from scratch in TypeScript.

This repository is part of my ongoing study of data structures and algorithms, with a focus on understanding how each structure works internally, its invariants, operations, and complexity.

## Purpose

The goal of this repository is to learn data structures by implementing them from first principles rather than relying only on built-in language abstractions.

The main areas of focus are:

- Internal representation
- Core invariants
- Fundamental operations
- Time and space complexity
- Trade-offs between implementations
- Practical problems and experiments

These implementations are intended for learning and experimentation, not as production-ready replacements for standard libraries.

## Learning Approach

The study follows this progression:

```text
Structure
    ↓
Invariant
    ↓
Operations
    ↓
Complexity
    ↓
Implementation
    ↓
Problems & Experiments
```

The objective is not only to know how a data structure works, but to understand why it works and what happens when its invariants are violated.

## Data Structures

### Linear Data Structures

- [x] Stack
- [x] Queue
- [x] Linked List

### Hash-Based Structures

- [x] Hash Map

### Tree-Based Structures

- [x] Trie
- [x] Binary Tree
- [ ] Binary Search Tree
- [ ] AVL Tree
- [ ] Red-Black Tree
- [ ] Heap

### Graph Structures

- [ ] Graph
- [ ] Weighted Graph
- [ ] Directed Graph

## Implementations

### Stack

A LIFO (Last-In, First-Out) data structure.

Implemented operations:

- `push`
- `pop`
- `peek`
- `isEmpty`
- `getMin`

The implementation also explores maintaining the minimum value using an auxiliary history structure.

A practical example is reversing a string using stack behavior.

### Queue

A FIFO (First-In, First-Out) data structure.

Implemented operations:

- `enqueue`
- `dequeue`
- `peek`
- `isEmpty`

The implementation also includes an experiment with processing elements that can be re-enqueued based on their remaining number of turns.

### Linked List

A singly linked list implementation that maintains references to both the head and tail.

Implemented operations:

- `append`
- `prepend`
- `pop`
- `shift`
- `find`
- `remove`

### Hash Map

A hash map implementation using an array of buckets and linked lists for collision handling.

Concepts explored:

- Hash functions
- Bucket indexing
- Collision handling
- Key/value pairs
- Lookup
- Insertion
- Removal
- Generic types
- Type predicates

### Trie

A Trie (prefix tree) implementation for storing and searching strings.

Implemented operations:

- `insert`
- `search`
- `startsWith`
- `remove`

The implementation also includes an ASCII-based visualization to inspect the internal tree structure.

### Binary Tree

A binary tree implementation where each node can have at most two children.

Current operations:

- Level-order insertion
- Level-order traversal
- Pre-order traversal
- In-order traversal
- Post-order traversal

A queue is used to maintain the order of nodes that still have available child positions.

## Complexity

Complexity analysis is part of the learning process for every structure.

The objective is not only to memorize Big-O notation, but to understand why a particular operation has a given complexity based on the internal organization of the structure.

For example:

```text
Stack
  push / pop / peek
          ↓
         O(1)

Linked List
  sequential search
          ↓
         O(n)
```

Complexity analysis will be refined as each implementation is studied in greater depth.

## TypeScript

The implementations use TypeScript generics to explore type-safe data structures that can work with different types.

The repository also explores concepts such as:

- Generics
- Generic constraints
- Type predicates
- Union types
- Nullable references
- Type aliases
- Access modifiers

## Experiments

The repository includes small experiments designed to connect each data structure with practical problems.

Examples:

- Reversing strings with a Stack
- Processing tasks with a Queue
- Handling hash collisions with a Hash Map
- Prefix search with a Trie
- Visualizing a Trie
- Level-order insertion and traversal in a Binary Tree

## Roadmap

The repository will continue evolving as new data structures and algorithmic concepts are studied.

Planned progression:

```text
Binary Search Tree
        ↓
AVL Tree
        ↓
Red-Black Tree
        ↓
Heap
        ↓
Priority Queue
        ↓
Graph
        ↓
Graph Algorithms
        ↓
Advanced Algorithms
```

Additional structures and algorithms will be added as the study progresses.