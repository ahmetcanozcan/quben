import BenchStatus from './benchStatus';
import RuleContext from './ruleContext';

type NextFunction = (err?: any) => void;

type Rule = (ctx: RuleContext, next: NextFunction) => void;

export default Rule;
