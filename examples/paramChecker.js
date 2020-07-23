const quben = require('quben').default;
const rules = require('quben').rules;

quben.addRule(rules.parameterChecker);

const sum = quben((a, b) => a + b, { params: [Number, Number] });

console.log(sum(5, 4));

try {
  console.log(sum(3, 'A'));
} catch (error) {
  console.log(error);
}
