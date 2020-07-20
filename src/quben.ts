import Benchmarker from "./Benchmarker";
import { BenchStatus } from "./enums";
import Rule from "./Rule";

let benchmarker = new Benchmarker();

function qubenFunction(func: Function) {
  return benchmarker.eval(func);
}

qubenFunction.use = function (b: Benchmarker) {
  benchmarker = b;
};

qubenFunction.addRule = function (rule: Rule) {
  benchmarker.add(rule);
};

qubenFunction.addEndRule = function (rule: Rule) {
  benchmarker.add((ctx, next) => {
    if (ctx.status !== BenchStatus.END) return next();
    rule(ctx, next);
  });
};

qubenFunction.addStartRule = function (rule: Rule) {
  benchmarker.add((ctx, next) => {
    if (ctx.status !== BenchStatus.START) return next();
    rule(ctx, next);
  });
};

qubenFunction.Benchmarker = Benchmarker;

export default qubenFunction;
