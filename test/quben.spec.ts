import quben from "../src";
import Benchmarker from "../src/Benchmarker";
import { BenchStatus } from "../src/enums";

const testVal = "test";

describe("Quben tests", () => {
  it("Quben evaluate funnction", () => {
    const f = quben(() => testVal);
    expect(typeof f).toBe("function");
    expect(f()).toBe(testVal);
  });

  it("Quben can use custom bm", () => {
    let flag: boolean = false;
    const bm = new Benchmarker().add((ctx, next) => {
      if (ctx.status == BenchStatus.END) {
        flag = true;
      }
    });
    quben.use(bm);
    const f = quben(() => testVal);
    expect(f()).toBe(testVal);
    expect(flag).toBe(true);
  });
});
