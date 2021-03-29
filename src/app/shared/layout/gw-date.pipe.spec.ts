import { GwDatePipe } from './gw-date.pipe';

describe('GwDatePipe', () => {
  it('create an instance', () => {
    const pipe = new GwDatePipe(null);
    expect(pipe).toBeTruthy();
  });
});
