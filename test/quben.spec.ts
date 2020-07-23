import quben from '../src';
import Benchmarker from '../src/Benchmarker';
import { BenchStatus } from '../src/enums';

const testVal = 'test';

describe('Quben tests', () => {
  it('Quben evaluate funnction', () => {
    const f = quben(() => testVal);
    expect(typeof f).toBe('function');
    expect(f()).toBe(testVal);
  });

  it('Quben evaluate async function', async () => {
    const timeout = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
    let executionTime = 0;
    quben.use(new Benchmarker());
    quben.addEndRule((ctx, next) => {
      executionTime = ctx.time;
      next();
    });
    const af = async function () {
      const start = Date.now();
      await timeout(300);
      executionTime = Date.now() - start;
    };
    const f = quben(af);
    await f();
    expect(executionTime).toBeGreaterThanOrEqual(300);
  });

  it('Quben can use custom bm', () => {
    let flag: boolean = false;
    const bm = new Benchmarker().add((ctx, next) => {
      if (ctx.status == BenchStatus.END) {
        flag = true;
      }
    });
    quben.use(bm);
    const f = quben(() => testVal);
    expect(f()).toBe(testVal);
    expect(flag).toBe(true);
  });
});
