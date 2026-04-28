import { Tree } from "./BST.js";

(function () {
  // parent function setup

  const giveRadnomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(giveRadnomNumber(0, 100));
  }

  let traversedData = "";
  const printNodeValue = (node) => {
    traversedData += `${node.getData()}, `;
  };

  const clearTraversedData = () => {
    traversedData = "";
  };

  // creating the tree class & using it's methods
  const randomNumTree = new Tree(arr);
  const checkIfBalanced = () => {
    let isBalanced = randomNumTree.isBalanced();
    if (isBalanced == -1) {
      console.log("The Tree is not balanced");
    } else {
      console.log(`The Tree is balanced with the height ${isBalanced}`);
    }
  };
  checkIfBalanced();

  // traverses through the tree
  const traverseTree = () => {
    //preOrder
    console.log();
    randomNumTree.preOrderForEach(printNodeValue);
    console.log(
      `The Data has been traversed in in preOrder format, i.e <root> <leftNode> <rigthNode>`,
    );
    console.log(`${traversedData}\n`);
    clearTraversedData();
    //inorder
    randomNumTree.inOrderForEach(printNodeValue);
    console.log(
      `The Data has been traversed in in inOrder format, i.e  <leftNode> <root> <rigthNode>`,
    );
    console.log(`${traversedData}\n`);
    clearTraversedData();
    randomNumTree.postOrderForEach(printNodeValue);
    //postOrder
    console.log(
      `The Data has been traversed in in postOrder format, i.e <leftNode> <rigthNode> <root>`,
    );
    console.log(`${traversedData}\n`);
    clearTraversedData();
  };
  traverseTree();
  //unbalancing the tree by adding enw items
  for (let i = 0; i < 15; i++) {
    randomNumTree.insert(giveRadnomNumber(100, 800));
  }
  console.log(`New random value that will inabalnce the tree has been added`);
  randomNumTree.prettyPrint();

  checkIfBalanced();
  // calling the rebalnce method
  console.log(`we will be rebalacning the tree using .rebalance method`);
  randomNumTree.rebalance();
  randomNumTree.prettyPrint();
  checkIfBalanced();
  traverseTree();
})();
