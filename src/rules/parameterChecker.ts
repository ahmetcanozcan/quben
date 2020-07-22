import { BenchStatus } from "../enums";
import Rule from "../Rule";

const getTypeString = (v: any): string => {
  if (typeof v === "function") {
    return (v as Function).name.toLowerCase();
  }
  return (v.constructor.name as string).toLowerCase();
};
const checkTypeMatch = (arg: any, target: any): boolean => {
  const argType: any = getTypeString(arg);
  const targetType: string = getTypeString(target);
  if (targetType !== argType) {
    return false;
  } else if (argType === "object") {
    for (let key in target) {
      if (!(key in arg && checkTypeMatch(arg[key], target[key]))) {
        return false;
      }
    }
  }
  return true;
};

const parameterChecker: Rule = (ctx, next) => {
  if (ctx.status !== BenchStatus.START) {
    return next();
  }

  const parameterRules: any[] = ctx.ruleOptions.params || [];
  if (parameterRules.length !== ctx.args.length)
    return next(
      `Èxpected ${parameterRules.length} parameters but found ${ctx.args.length}`
    );

  for (let i = 0; i < ctx.args.length; i++) {
    if (!checkTypeMatch(ctx.args[i], parameterRules[i]))
      return next(`Invalid type of ${i}. argument`);
  }
  next();
};

export default parameterChecker;
