import quben, { rules } from '../../src';
import Benchmarker from '../../src/Benchmarker';

describe('Custom rules works correctly', () => {
  it('Parameter rule checks parameter', () => {
    quben.use(new Benchmarker());
    quben.addRule(rules.parameterChecker);
    const f = quben(
      function testFunc(x: number, y: number): number {
        return x + y;
      },
      {
        params: [Number, Number],
      }
    );
    expect(f(5, 4)).toBe(9);
    let flag = false;
    try {
      f(9);
    } catch {
      flag = true;
    }
    expect(flag).toBe(true);
  });
  it('Parameter rule checks custom types', () => {
    quben.use(new Benchmarker());
    quben.addRule(rules.parameterChecker);
    class Person {
      public name: string;
      public age: number;
      constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
      }
    }

    const f = quben(
      (person: Person) => {
        return person.age;
      },
      {
        params: [Person],
      }
    );

    const person = new Person('John Doe', 17);
    expect(f(person)).toBe(17);
    let flag = false;
    try {
      f(5);
    } catch {
      flag = true;
    }
    expect(flag).toBe(true);
  });

  it('Parameter rule checks object types', () => {
    quben.use(new Benchmarker());
    quben.addRule(rules.parameterChecker);

    const vectorLength = quben((obj: any) => obj.x + obj.y, {
      params: [{ x: Number, y: Number }],
    });
    const testObject = { x: 3, y: 4 };
    expect(vectorLength(testObject)).toBe(7);
    let flag = false;
    try {
      vectorLength({ x: 1 });
    } catch {
      flag = true;
    }
    expect(flag).toBe(true);
  });

  it('Parameter rule checks nested object types', () => {
    quben.use(new Benchmarker());
    quben.addRule(rules.parameterChecker);

    const nestedFunction = quben((obj: any) => obj.vec.x + obj.vec.y, {
      params: [{ vec: { x: Number, y: Number } }],
    });
    const testNestedObject = { vec: { x: 4, y: 5 } };
    expect(nestedFunction(testNestedObject)).toBe(9);
    let flag = false;
    try {
      nestedFunction({ x: 1 });
    } catch {
      flag = true;
    }
    expect(flag).toBe(true);
  });
});
