import quben from '../src';
import Evaluater from '../src/evaluater';
import BenchStatus from '../src/benchStatus';
import Rule from '../src/rule';

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
    quben.use(new Evaluater());
    quben.addAfterRule((ctx, next) => {
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
    const bm = new Evaluater().add((ctx, next) => {
      if (ctx.status == BenchStatus.END) {
        flag = true;
      }
    });
    quben.use(bm);
    const f = quben(() => testVal);
    expect(f()).toBe(testVal);
    expect(flag).toBe(true);
  });

  it('new  function works properly', () => {
    quben.use(new Evaluater());
    let foo = 0;
    let bar = 0;
    const ruleFoo: Rule = (ctx, next) => {
      foo++;
      next();
    };
    const ruleBar: Rule = (ctx, next) => {
      bar++;
      next();
    };
    quben.addBeforeRule(ruleFoo);
    const newQuben = quben.new();
    newQuben.addBeforeRule(ruleBar);

    const fooFunc = quben(() => {});
    const barFunc = newQuben(() => {});

    fooFunc();
    barFunc();

    expect(foo).toBe(1);
    expect(bar).toBe(1);
  });

  it('fork function works properly', () => {
    quben.use(new Evaluater());
    let foo = 0;
    let bar = 0;
    const ruleFoo: Rule = (ctx, next) => {
      foo++;
      next();
    };
    const ruleBar: Rule = (ctx, next) => {
      bar++;
      next();
    };
    quben.addBeforeRule(ruleFoo);
    const forkQuben = quben.fork();
    forkQuben.addBeforeRule(ruleBar);

    const fooFunc = quben(() => {});
    const barFunc = forkQuben(() => {});

    fooFunc();
    barFunc();

    expect(foo).toBe(2);
    expect(bar).toBe(1);
  });
});
