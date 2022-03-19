import { PriorityQueue } from '../src';

describe('Check if the items are sorted', () => {
  it('works', () => {
    const q = new PriorityQueue({
      comparatorFn: (a,b) => a - b,
      intialValues: [32, 5, 44, 10, 1]
    });
    expect(q.heapsort()).toEqual([1, 5, 10, 32, 44]);
  });
});
