import Node from "./node.js";
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  toString() {
    let string = "";
    let current = this.head;
    while (current !== null) {
      string += `(key: ${current.key}, value: ${current.value}) -> `;
      current = current.nextNode;
    }
    string += "null";
    console.log(string);
  }

  append(key, value) {
    if (this.head == null) {
      this.head = new Node(key, value);
    } else {
      let temp = this.head;
      while (temp.nextNode !== null) {
        temp = temp.nextNode;
      }
      temp.nextNode = new Node(key, value);
    }
  }

  prepend(key, value) {
    if (this.head == null) {
      this.head = new Node(key, value);
    } else {
      let temp = new Node(key, value);
      temp.nextNode = this.head;
      this.head = temp;
    }
  }

  size() {
    let size = 0;
    let current = this.head;
    while (current !== null) {
      size++;
      current = current.nextNode;
    }
    return size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    if (this.head == null) return "null";
    let current = this.head;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    if (this.head == null || index >= this.size()) {
      return null;
    } else if (index < 0) {
      return console.error("Negative index provided");
    } else if (index == 0) {
      return this.getHead();
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.nextNode;
      }
      return current;
    }
  }

  pop() {
    if (this.size() == 0) return "The list is empty";
    if (this.size() == 1) this.head = null;
    else {
      let lastSecondNodeIndex = this.size() - 2;
      let lastSecondNode = this.at(lastSecondNodeIndex);
      lastSecondNode.nextNode = null;
    }
  }

  contains(key) {
    if (this.head == null) return false;
    let current = this.head;
    while(current !== null) {
      if (current.key == key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  find(key) {
    if (this.head == null) return null;
    let current = this.head;
    let i = 0;
    while(current !== null) {
      if (current.key == key) {
        return i;
      }
      i++;
      current = current.nextNode;
    }
    return null;
  }

  insertAt(index, key, value) {
    let oldNode, prevNode, newNode;

    if (index == 0) {
      oldNode = this.head;
      this.head = new Node(key, value);
      this.head.nextNode = oldNode;
      return;
    }

    newNode = new Node(key, value);
    if (index >= this.size()) {
      prevNode = this.getTail();
    } else {
      prevNode = this.at(index - 1);
      oldNode = this.at(index);
      newNode.nextNode = oldNode;
    }
    prevNode.nextNode = newNode;
  }

  removeAt(index) {
    if (index == 0) {
        let secondNode = this.at(1);
        this.head = secondNode ? secondNode : null;
    } else if(index >= this.size()-1) { // remove the last element even if the index passed is greater than the list size
        this.pop();
        return;
    } else {
        let prevNode = this.at(index-1);
        let nextNode = this.at(index+1);
        prevNode.nextNode = nextNode;
    }
  }
}

export default LinkedList;
