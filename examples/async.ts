import quben, { rules } from 'quben';

quben.addRule(rules.logger());

// Basic timout function implementation.
const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const f = quben(async () => {
  await timeout(320);
});
f();
