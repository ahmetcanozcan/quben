import { BenchStatus } from './enums';
import RuleContext from './RuleContext';

type NextFunction = (err?: any) => void;

type Rule = (ctx: RuleContext, next: NextFunction) => void;

export default Rule;
