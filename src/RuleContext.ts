import BenchStatus from './benchStatus';

type RuleContext = {
  time: number;
  args: any[];
  status: BenchStatus;
  fname: string;
  ruleOptions: any;
};

export default RuleContext;
