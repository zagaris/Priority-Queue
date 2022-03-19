export type ComparatorFn<T> = (a: T, b: T) => number;

export type PriorityQueueParams<T> = {
  comparatorFn: ComparatorFn<T>,
  intialValues?: Array<T>
}

type Optional<T> = T | null;

export class PriorityQueue<T> {
  values: Array<T> = [];
  comparatorFn: ComparatorFn<T>;
  length: number = 0;

  constructor(params: PriorityQueueParams<T>) {
    this.comparatorFn = params.comparatorFn;

    if(params.intialValues) {
      params.intialValues.forEach((value) => {
        this.insert(value);
      });
    }
  }

  insert(value: T): void {
    if(this.values.length <= this.length) {
      this.values.length = Math.max(1, this.values.length * 2);
    }
    this.values[this.length] = value;
    this.length++;

    this.swim();
  }

  remove(): Optional<T> {
    if(this.length === 0)
      return null;
    
    const node = this.values[0];

    // Only one element in the array
    if(this.length === 1) {
      this.values[0] = null as any;
      this.length = 0;
      return node;
    }

    this.values[0] = this.values[this.length - 1];
    this.values[this.length - 1] = null as any;
    this.length--;

    this.sink();

    return node;
  }

  heapsort() {
    return Array.from({ length: this.length }, () => this.remove());
  }

  swim(): void {

    let index = this.length - 1;

    while(true) {
      const parentIndex = this.getParentIndex(index);


      if(parentIndex !== null && this.comparatorFn(this.values[index], this.values[parentIndex]) < 0) {
        const temp = this.values[index];
        this.values[index] = this.values[parentIndex];
        this.values[parentIndex] = temp;
        index = parentIndex;
        continue;
      }
      return;
    }
  }

  sink(): void {
    let index = 0;

    while(true) {
      const leftChild = this.getLeftChild(index);
      const rightChild = this.getRightChild(index);

      let current = index;

      if(leftChild !== null && this.comparatorFn(this.values[current], this.values[leftChild]) > 0)
        current = leftChild;

      if(rightChild !== null && this.comparatorFn(this.values[current], this.values[rightChild]) > 0)
        current = rightChild;

      if (current !== index) {
        const temp = this.values[index];
        this.values[index] = this.values[current];
        this.values[current] = temp;
        index = current;
        continue;
      }
      return;
    }
  }

  getParentIndex(nodeIndex: number): number | null {
    if(nodeIndex === 0)
      return null;
    return (nodeIndex - 1) >>> 1;
  }

  getLeftChild(nodeIndex: number): number | null {
    const leftChild = (nodeIndex * 2) + 1;
    if(leftChild >= this.length)
      return null;
    return leftChild;  
  }

  getRightChild(nodeIndex: number): number | null {
    const rightChild = (nodeIndex * 2) + 2;
    if(rightChild >= this.length)
      return null;
    return rightChild;  
  }

}
