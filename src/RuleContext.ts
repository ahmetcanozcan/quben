import { BenchStatus } from "./enums";

type RuleContext = {
  time: number;
  args: any[];
  status: BenchStatus;
  fname: string;
};

export default RuleContext;
