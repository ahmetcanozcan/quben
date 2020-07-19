import { isNode } from "./constants";
import { BenchStatus } from "./enums";
import Rule from "./Rule";
import RuleContext from "./RuleContext";

export default class Benchmarker {
  private rules: Array<Rule>;

  constructor() {
    this.rules = [];
  }

  public add(rule: Rule): Benchmarker {
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

  public eval(func: Function): Function {
    const self = this;
    return function (...args: any[]) {
      const startTime: number | [number, number] = isNode
        ? process.hrtime()
        : Date.now();
      self.executeRules(0, {
        fname: func.name,
        time: 0,
        status: BenchStatus.START,
        args,
      });
      const res = func(...args);
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
      });

      return res;
    };
  }
}
