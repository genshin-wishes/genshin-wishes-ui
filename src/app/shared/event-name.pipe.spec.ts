import { EventNamePipe } from './event-name.pipe';

describe('EventNamePipe', () => {
  it('create an instance', () => {
    const pipe = new EventNamePipe();
    expect(pipe).toBeTruthy();
  });
});
