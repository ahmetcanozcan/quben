import Evaluater from '../src/evaluater';
import BenchStatus from '../src/benchStatus';

describe('Evaluater tests', () => {
  it('Evaluater evaluate function', () => {
    const bm = new Evaluater();
    let flag: boolean = false;
    const f = bm.eval((v: boolean) => (flag = v), {});
    f(true);
    expect(flag).toBe(true);
  });

  it('Evaluater executes rules', () => {
    const bm = new Evaluater();

    let str: string = '';
    bm.add((ctx, next) => {
      if (ctx.status == BenchStatus.START) {
        str += 'hel';
      } else {
        str += 'wor';
      }
      next();
    });
    bm.add((ctx, next) => {
      if (ctx.status == BenchStatus.START) {
        str += 'lo ';
      } else {
        str += 'ld';
      }
      next();
    });
    const f = bm.eval(() => {}, {});
    f();
    expect(str).toBe('hello world');
  });

  it('Evaluater calculates execution time ', () => {
    const bm = new Evaluater();
    let bmExecutionTime: number = 0;
    bm.add((ctx, next) => {
      if (ctx.status === BenchStatus.END) {
        return next();
      }
      bmExecutionTime = ctx.time;
    });
    let fnExecutionTime: number = 0;
    const f = bm.eval(() => {
      let s = Date.now();
      for (let i = 0; i < 1e7; i++) {}
      fnExecutionTime = Date.now() - s;
    }, {});
    f();
    expect(Math.abs(bmExecutionTime - fnExecutionTime)).toBeLessThanOrEqual(
      100
    );
  });

  test('Evaluated functions returns correctly', () => {
    const bm = new Evaluater();
    const val = 'test';
    const f = bm.eval(() => {
      return val;
    }, {});
    expect(f()).toBe(val);
  });
});
