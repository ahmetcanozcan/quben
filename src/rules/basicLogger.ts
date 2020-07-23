import Rule from '../Rule';
import { BenchStatus } from '../enums';

const basicLogger: Rule = (ctx, next) => {
  if (ctx.status !== BenchStatus.END) return next();
  console.log(
    `${ctx.fname}( ${ctx.args.join(', ')} ) executed in ${ctx.time}ms`
  );
  next();
};

export default basicLogger;
