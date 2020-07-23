import { BenchStatus } from './enums';

type RuleContext = {
  time: number;
  args: any[];
  status: BenchStatus;
  fname: string;
  ruleOptions: any;
};

export default RuleContext;
