const quben = require("quben").default;
const rules = require("quben").rules;

quben.addRule(rules.basicLogger);

const f = quben(() => {
  console.log("Hello");
});

f();
