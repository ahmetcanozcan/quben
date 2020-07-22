const $ = require("quben").default;
const rules = require("quben").rules;

$.addRule(rules.parameterChecker);

const sum = $((a, b) => a + b, { params: [Number, Number] });

console.log(sum(5, 4));

try {
  console.log(sum(3, "A"));
} catch (error) {
  console.log(error);
}
