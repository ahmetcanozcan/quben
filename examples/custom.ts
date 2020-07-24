import quben, { rules } from 'quben';

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
