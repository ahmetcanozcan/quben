const quben = require('quben').default;
const rules = require('quben').rules;

quben.addRule(rules.logger());

const f = quben(() => {
  console.log('Hello');
});

f();
