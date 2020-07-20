import quben, { rules } from "quben";

quben.addRule(rules.basicLogger);

// plain recursive function;
const fraction = quben(function recursive(num: number): number {
  if (num <= 1) return 1;
  return num * recursive(--num);
});

console.log(fraction(5));
