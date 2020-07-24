<h1 align="center">Quben</h1>

<div align="center">
 
</div>
<div align="center">
  <strong>More control on functions</strong>
</div>
<div align="center">
  A <code> JavaScript</code> and <code> TypeScript</code> library for measuring and scaling to functions.
</div>

<br>
<div align="center">
<a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square"
      alt="API stability" />
  </a>

<a href="https://circleci.com/gh/ahmetcanozcan/quben"> 
<img src="https://img.shields.io/circleci/build/gh/ahmetcanozcan/quben?style=flat-square" />
</a>

<a>
<img src="https://img.shields.io/github/license/ahmetcanozcan/quben?style=flat-square" />
</a>
  
<a href="https://circleci.com/gh/ahmetcanozcan/quben"> 
<img src="https://img.shields.io/npm/v/quben?style=flat-square" />
</a>

</div>

<br />

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install quben.

```bash
npm install quben
```

## Getting Started

```typescript
import quben, { rules } from 'quben';

quben.addRule(rules.logger());

const factorial = quben(function recursive(num: number): number {
  if (num <= 1) return 1;
  return num * recursive(--num);
});

console.log(factorial(5));
// prints:
// recursive( 5 ) executed in 0.1371ms
// 120
```

You can add your custom rules

```typescript
import quben from 'quben';

// This rule will be executed before function execution
quben.addBeforeRule((ctx, next) => {
  console.log('Before Function Execution');
  next();
});

// This rule will be executed after function execution
quben.addAfterRule((ctx, next) => {
  console.log('After Function Execution');
  next();
});

// This rule will be executed before and after function execution
quben.addRule((ctx, next) => {
  if (ctx.status == 'start') {
    console.log('before');
  } else if (ctx.status == 'end') {
    console.log('after');
  }
});

const f = quben(() => {
  console.log('Function block');
});

f();
// Before Function Execution
// before
// Function block
//After Function Execution
// after
```

For more example, you can check out the `examples` folder

## License

[MIT](https://choosealicense.com/licenses/mit/)
