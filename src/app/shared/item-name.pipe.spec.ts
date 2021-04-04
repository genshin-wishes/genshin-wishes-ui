import { ItemNamePipe } from './item-name.pipe';

describe('ItemNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ItemNamePipe(null);
    expect(pipe).toBeTruthy();
  });
});
