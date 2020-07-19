import { BenchStatus } from "./enums";
import Rule from "./Rule";

export const executionLogger: Rule = (ctx, next) => {
  if (ctx.status !== BenchStatus.END) return next();
  console.log(
    `${ctx.fname}( ${ctx.args.join(", ")} ) executed in ${ctx.time}ms`
  );
  next();
};
