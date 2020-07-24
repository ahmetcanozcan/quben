import Evaluater from './evaluater';
import BenchStatus from './benchStatus';
import Rule from './rule';

type AddRuleFunction = (rule: Rule) => void;

type QubenFunction = ((func: Function, ruleOptions?: any) => Function) & {
  use: (e: Evaluater) => void;
  Evaluater: new () => Evaluater;
  addRule: AddRuleFunction;
  addBeforeRule: AddRuleFunction;
  addAfterRule: AddRuleFunction;
  fork: () => QubenFunction;
  new: () => QubenFunction;
};

function initialize(): QubenFunction {
  let evaluater = new Evaluater();

  const qubenFunction = function (func: Function, ruleOptions: any = {}) {
    return evaluater.eval(func, ruleOptions);
  };

  qubenFunction.use = function (e: Evaluater) {
    evaluater = e;
  };

  qubenFunction.addRule = function (rule: Rule) {
    evaluater.add(rule);
  };

  qubenFunction.addAfterRule = function (rule: Rule) {
    evaluater.add((ctx, next) => {
      if (ctx.status !== BenchStatus.END) return next();
      rule(ctx, next);
    });
  };

  qubenFunction.addBeforeRule = function (rule: Rule) {
    evaluater.add((ctx, next) => {
      if (ctx.status !== BenchStatus.START) return next();
      rule(ctx, next);
    });
  };

  qubenFunction.fork = function () {
    const quben = initialize();
    quben.use(evaluater.fork());
    return quben;
  };

  qubenFunction.new = initialize;

  qubenFunction.Evaluater = Evaluater;

  return qubenFunction;
}

export default initialize();
