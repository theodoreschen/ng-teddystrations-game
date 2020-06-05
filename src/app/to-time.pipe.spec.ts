import { ToTimePipe } from './to-time.pipe';

describe('ToTimePipe', () => {
  it('should create an instance', () => {
    const pipe = new ToTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should properly format 61 seconds', () => {
    const pipe = new ToTimePipe();
    let fmtTime = pipe.transform(61);
    expect(fmtTime).toEqual('1:01');
  });
});
