# Binary Search Tree

JavaScript implementation of a Binary Search Tree with balancing, traversal methods, and standard BST operations.

## Installation

```javascript
import { Tree } from "./tree.js";
```

## Usage

### Creating a Tree

```javascript
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint();
```

The constructor automatically removes duplicates, sorts the array, and builds a balanced tree.

### Basic Operations

**Insert a value:**

```javascript
tree.insert(10);
```

**Delete a value:**

```javascript
tree.deleteitem(23);
```

**Check if value exists:**

```javascript
tree.includes(8); // returns true or undefined
```

### Traversal Methods

All traversal methods require a callback function:

**Level-order (breadth-first):**

```javascript
tree.levelOrderForEach((node) => console.log(node.getData()));
```

**In-order (left → root → right):**

```javascript
tree.inOrderForEach((node) => console.log(node.getData()));
```

**Pre-order (root → left → right):**

```javascript
tree.preOrderForEach((node) => console.log(node.getData()));
```

**Post-order (left → right → root):**

```javascript
tree.postOrderForEach((node) => console.log(node.getData()));
```

### Tree Properties

**Get height of a node** (edges in longest path to leaf):

```javascript
tree.height(23); // returns height or undefined if value doesn't exist
```

**Get depth of a node** (edges from root):

```javascript
tree.depth(8); // returns depth or -1 if value doesn't exist
```

**Check if tree is balanced:**

```javascript
tree.isBalanced(); // returns height if balanced, -1 if unbalanced
```

**Rebalance the tree:**

```javascript
tree.rebalance();
```

## API Reference

### Tree Methods

| Method                        | Parameters | Returns           | Description                                                   |
| ----------------------------- | ---------- | ----------------- | ------------------------------------------------------------- |
| `insert(value)`               | number     | void              | Adds value to tree. Throws error if value exists.             |
| `deleteitem(value)`           | number     | void              | Removes value from tree. Throws error if value doesn't exist. |
| `includes(value)`             | number     | boolean/undefined | Checks if value exists in tree.                               |
| `levelOrderForEach(callback)` | function   | void              | Breadth-first traversal.                                      |
| `inOrderForEach(callback)`    | function   | void              | In-order depth-first traversal.                               |
| `preOrderForEach(callback)`   | function   | void              | Pre-order depth-first traversal.                              |
| `postOrderForEach(callback)`  | function   | void              | Post-order depth-first traversal.                             |
| `height(value)`               | number     | number/undefined  | Returns height of node with given value.                      |
| `depth(value)`                | number     | number            | Returns depth of node with given value (-1 if not found).     |
| `isBalanced()`                | none       | number            | Returns tree height if balanced, -1 if unbalanced.            |
| `rebalance()`                 | none       | void              | Rebuilds tree to be balanced.                                 |
| `prettyPrint()`               | none       | void              | Prints tree structure to console.                             |

### Node Methods

| Method               | Returns   | Description                |
| -------------------- | --------- | -------------------------- |
| `getData()`          | number    | Returns node's data value. |
| `getLeftNode()`      | Node/null | Returns left child node.   |
| `getRightNode()`     | Node/null | Returns right child node.  |
| `setData(value)`     | void      | Sets node's data value.    |
| `setLeftNode(node)`  | void      | Sets left child node.      |
| `setRightNode(node)` | void      | Sets right child node.     |

## Implementation Notes

- Tree is built as a balanced BST from the initial array
- Duplicate values are automatically removed during construction
- Insert/delete operations do not automatically rebalance
- Height of a leaf node is 1, not 0
- Depth of root is 0

## Example

```javascript
import { Tree } from "./tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log("Initial tree:");
tree.prettyPrint();

console.log("\nIs balanced:", tree.isBalanced() !== -1);

tree.insert(10);
tree.insert(11);
tree.insert(12);

console.log("\nAfter insertions:");
tree.prettyPrint();
console.log("Is balanced:", tree.isBalanced() !== -1);

tree.rebalance();
console.log("\nAfter rebalancing:");
tree.prettyPrint();
console.log("Is balanced:", tree.isBalanced() !== -1);
```
