import Benchmarker from "./Benchmarker";
import Rule from "./Rule";

let benchmarker = new Benchmarker();

function qubenFunction(func: Function) {
  return benchmarker.eval(func);
}

qubenFunction.use = function (b: Benchmarker) {
  benchmarker = b;
};

qubenFunction.add = function (rule: Rule) {
  benchmarker.add(rule);
};

qubenFunction.Benchmarker = Benchmarker;

export default qubenFunction;
