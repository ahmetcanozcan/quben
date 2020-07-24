import { isNode } from './constants';
import BenchStatus from './benchStatus';
import Rule from './rule';
import RuleContext from './ruleContext';

export default class Evaluater {
  private rules: Rule[];

  constructor(rules: Rule[] = []) {
    this.rules = rules;
  }

  public fork(): Evaluater {
    return new Evaluater([...this.rules]);
  }

  public add(rule: Rule): Evaluater {
    this.rules.push(rule);
    return this;
  }
  private executeRules(ind: number, ctx: RuleContext) {
    if (ind >= this.rules.length) return;
    this.rules[ind](ctx, (err: any) => {
      if (err) {
        throw new Error(err);
      }
      this.executeRules(++ind, ctx);
    });
  }

  public eval(func: Function, ruleOptions: any): Function {
    const self = this;
    let startTime: number | [number, number] = 0;
    const start = (...args: any[]) => {
      startTime = isNode ? process.hrtime() : Date.now();
      self.executeRules(0, {
        fname: func.name,
        time: 0,
        status: BenchStatus.START,
        args,
        ruleOptions,
      });
    };
    const end = (...args: any[]) => {
      const executionTime: number | [number, number] = isNode
        ? (() => {
            const e = process.hrtime(startTime as [number, number]);
            return e[1] / 1000000 + e[0] * 1000;
          })()
        : Date.now() - (startTime as number);
      self.executeRules(0, {
        fname: func.name,
        time: executionTime,
        status: BenchStatus.END,
        args,
        ruleOptions,
      });
    };

    return function (...args: any[]) {
      start(...args);
      const s = Date.now();
      let r = func(...args);
      if (r && r.then !== undefined && typeof r.then === 'function') {
        r.then((e: any) => {
          end(...args);
          return e;
        });
      } else {
        end(...args);
      }

      return r;
    };
  }
}
