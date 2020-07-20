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

## Usage

```typescript
import quben, { rules } from "quben";

quben.addRule(rules.basicLogger);

const factorial = quben(function recursive(num: number): number {
  if (num <= 1) return 1;
  return num * recursive(--num);
});

console.log(factorial(5));
// prints:
// recursive( 5 ) executed in 0.1371ms
// 120
```

For more example, you can check out the `examples` folder

## License

[MIT](https://choosealicense.com/licenses/mit/)
