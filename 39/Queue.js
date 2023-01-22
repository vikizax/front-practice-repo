class Node {
  next;
  value;
  constructor(value = null) {
    this.next = null;
    this.value = value;
  }
}
export default class Queue {
  #head;
  #tail;
  length;

  constructor() {
    this.#head = this.#tail = null;
    this.length = 0;
  }

  peek() {
    return this.#head !== null ? this.#head.value : null;
  }

  enqueue(value) {
    this.length++;
    if (this.#tail === null) {
      this.#head = this.#tail = new Node(value);
      return;
    }
    const newNode = new Node(value);
    this.#tail.next = newNode;
    this.#tail = newNode;
  }

  dequeue() {
    if (this.#head === null) return null;
    this.length--;

    const oldHead = this.#head;
    this.#head = this.#head.next;
    oldHead.next = null;

    if (this.length === 0) this.#tail = null;

    return oldHead.value;
  }
}
