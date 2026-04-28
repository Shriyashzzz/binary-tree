class Node {
  constructor(data, leftNode = null, rightNode = null) {
    this.data = data;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }

  getRightNode() {
    return this.rightNode;
  }

  getLeftNode() {
    return this.leftNode;
  }

  setLeftNode(leftNode) {
    this.leftNode = leftNode;
  }

  setRightNode(rightNode) {
    this.rightNode = rightNode;
  }

  getData() {
    return this.data;
  }
  setData(givenData) {
    this.data = givenData;
  }
}

class Queue {
  constructor() {
    this.queue = [];
  }

  Enqueue(value) {
    this.queue[this.queue.length] = value;
  }

  Dequeue() {
    let firstElement = this.queue.shift();
    return firstElement;
  }

  getQueue() {
    return this.queue;
  }

  isEmpty() {
    if (this.queue.length == 0) {
      return true;
    }
    return false;
  }
}

export class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);
    let start = 0;
    let end = arr.length - 1;

    const recursivehelper = (arr, start, end) => {
      if (start > end) return null;
      let mid = Math.floor((start + end) / 2);
      let root = new Node(arr[mid]);
      root.setLeftNode(recursivehelper(arr, start, mid - 1));
      root.setRightNode(recursivehelper(arr, mid + 1, end));

      return root;
    };
    return recursivehelper(arr, start, end);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(
      node.rightNode,
      `${prefix}${isLeft ? "│   " : "    "}`,
      false,
    );
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    this.prettyPrint(
      node.leftNode,
      `${prefix}${isLeft ? "    " : "│   "}`,
      true,
    );
  }

  includes(value) {
    const recurValueChecker = (node, value) => {
      if (node == null) {
        return;
      }
      if (node.getData() == value) {
        return true;
      } else if (value > node.getData()) {
        return recurValueChecker(node.rightNode, value);
      } else {
        return recurValueChecker(node.leftNode, value);
      }
    };

    return recurValueChecker(this.root, value);
  }

  insert(value) {
    if (this.includes(value)) {
      throw new Error("value already exists in the Binary Search Tree");
    }
    const recurValueInserter = (node, value, prevNode = null) => {
      if (node == null && this.root == null) {
        this.root = new Node(value);
      } else if (node == null) {
        if (prevNode.getData() > value) {
          prevNode.leftNode = new Node(value);
          return;
        } else {
          prevNode.rightNode = new Node(value);
          return;
        }
      }

      if (value > node.getData()) {
        let prevNode = node;
        return recurValueInserter(node.rightNode, value, prevNode);
      } else {
        let prevNode = node;
        return recurValueInserter(node.leftNode, value, prevNode);
      }
    };
    recurValueInserter(this.root, value);
  }

  deleteitem(value) {
    if (!this.includes(value)) {
      throw new Error("The given value doe not exist in the Binary Tree!");
    }

    const recurValueDeleter = (node, value, prevNode = null) => {
      /// base condition
      if (node.getData() == value) {
        // deletion logic if the node is a leaf node
        if (node.leftNode == null && node.rightNode == null) {
          if (prevNode.leftNode.getData() == value) {
            prevNode.leftNode = null;
          } else if (prevNode.rightNode.getData() == value) {
            prevNode.rightNode = null;
          }
          return;
        }
        // if the node has one child
        if (prevNode.leftNode == node) {
          if (node.leftNode != null && node.rightNode == null) {
            prevNode.leftNode = node.leftNode;
            return;
          } else if (node.leftNode == null && node.rightNode != null) {
            prevNode.leftNode = node.rightNode;
            return;
          }
        } else {
          if (node.leftNode != null && node.rightNode == null) {
            prevNode.rightNode = node.leftNode;
            return;
          } else if (node.leftNode == null && node.rightNode != null) {
            prevNode.rightNode = node.rightNode;
            return;
          }
        }

        // incase of two or more nodes in the value node

        const findAndDeleteMin = (node, parent = null) => {
          if (node.leftNode == null) {
            parent.leftNode = node.rightNode;
            return node.getData();
          } else {
            return findAndDeleteMin(node.leftNode, node);
          }
        };

        node.data = findAndDeleteMin(node.rightNode, node);
        return;
      }
      // recursive condition
      prevNode = node;
      if (value < node.getData()) {
        return recurValueDeleter(node.leftNode, value, prevNode);
      } else {
        return recurValueDeleter(node.rightNode, value, prevNode);
      }
    };

    recurValueDeleter(this.root, value);
  }

  levelOrderForEach(callback) {
    if (callback == undefined) {
      throw new Error("Call Back is not provided");
    }

    const nodeQueue = new Queue();
    nodeQueue.Enqueue(this.root);
    const levelTraverse = () => {
      if (nodeQueue.isEmpty()) {
        return;
      } else {
        let currentNode = nodeQueue.Dequeue();
        callback(currentNode);
        if (currentNode.leftNode != null) {
          nodeQueue.Enqueue(currentNode.leftNode);
        }
        if (currentNode.rightNode != null) {
          nodeQueue.Enqueue(currentNode.rightNode);
        }
        levelTraverse();
      }
    };

    levelTraverse();
  }

  inOrderForEach(callback) {
    if (callback == undefined) {
      throw new Error("Call Back Function not provided");
    }
    const inOrderTraversal = (node) => {
      if (node == null) {
        return;
      } else {
        inOrderTraversal(node.leftNode);
        callback(node);
        inOrderTraversal(node.rightNode);
      }
    };

    inOrderTraversal(this.root);
  }
  preOrderForEach(callback) {
    if (callback == undefined) {
      throw new Error("Call Back Function not provided");
    }
    const preOrderTraversal = (node) => {
      if (node == null) {
        return;
      } else {
        callback(node);
        preOrderTraversal(node.leftNode);
        preOrderTraversal(node.rightNode);
      }
    };

    preOrderTraversal(this.root);
  }

  postOrderForEach(callback) {
    if (callback == undefined) {
      throw new Error("Call Back Function not provided");
    }
    const postOrderTraversal = (node) => {
      if (node == null) {
        return;
      } else {
        postOrderTraversal(node.leftNode);
        postOrderTraversal(node.rightNode);
        callback(node);
      }
    };

    postOrderTraversal(this.root);
  }

  height(value) {
    // gernral function that finds the height of the binary tree

    if (!this.includes(value)) {
      return undefined;
    }
    const findHeight = (root) => {
      if (root == null) {
        return 0;
      }

      let leftHeight = findHeight(root.leftNode);
      let rightHeight = findHeight(root.rightNode);
      return Math.max(leftHeight, rightHeight) + 1;
    };
    // actual height fucntion proxy
    let nodeHeight = undefined;
    this.inOrderForEach((node) => {
      if (node.getData() == value) {
        nodeHeight = findHeight(node);
      }
    });
    return nodeHeight;
  }

  depth(value) {
    const findDepth = (node, value, count = 0) => {
      if (node == null) {
        return -1;
      }

      if (node.getData() == value) {
        return count;
      }

      if (value > node.getData()) {
        return findDepth(node.rightNode, value, count + 1);
      } else {
        return findDepth(node.leftNode, value, count + 1);
      }
    };

    let calculatedDepth = findDepth(this.root, value);
    return calculatedDepth;
  }

  isBalanced() {
    const heightChecker = (node) => {
      if (node == null) {
        return 0;
      }
      let leftHeight = heightChecker(node.leftNode);
      if (leftHeight == -1) {
        return -1;
      }
      let rightHeight = heightChecker(node.rightNode);
      if (rightHeight == -1) {
        return -1;
      }
      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return heightChecker(this.root);
  }

  rebalance() {
    let newArr = [];
    const getNodeData = (node) => {
      newArr.push(node.getData());
    };

    this.inOrderForEach(getNodeData);
    this.root = this.#buildTree(newArr);
  }
}
