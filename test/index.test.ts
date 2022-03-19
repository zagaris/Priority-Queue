import { PriorityQueue } from '../src';

describe('Check if the items are sorted', () => {
  it('works', () => {
    const q = new PriorityQueue({
      comparatorFn: (a,b) => a - b,
      intialValues: [35, 4, 48, 12, 1]
    });
    expect(q.heapsort()).toEqual([1, 4, 12, 35, 48]);
  });
});
