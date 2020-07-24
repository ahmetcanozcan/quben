import Rule from '../rule';
import BenchStatus from '../benchStatus';

type LoggerOptions = {};

const logger: Rule = (options?: LoggerOptions): Rule => (ctx, next) => {
  if (ctx.status !== BenchStatus.END) return next();
  console.log(
    `${ctx.fname}( ${ctx.args.join(', ')} ) executed in ${ctx.time}ms`
  );
  next();
};

export default logger;
