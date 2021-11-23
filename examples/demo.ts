// 函数泛型
function dog<T, V>(age: T, color: V): [T, V] {
  return [age, color];
}

//  接口泛型
interface Indentities<T, U = string> {
  //默认string
  value: T;
  message: U;
}

function indentity<T, U>(value: T, msg: U): Indentities<T, U> {
  let indentities: Indentities<T, U> = {
    value,
    message: msg,
  };
  return indentities;
}

console.log(indentity<number, string>(12, "hello"));

// 泛型类
// 在类中使用泛型
interface GenrateInterface<T> {
  value: T;
  getIndentity: () => T;
}
class IndentityCalss<U> implements GenrateInterface<U> {
  value: U;
  constructor(parma: U) {
    this.value = parma;
  }
  getIndentity(): U {
    return this.value;
  }
}

const numberInsatance = new IndentityCalss<number>(12);
console.log(numberInsatance.getIndentity()); // 12

const stringInstance = new IndentityCalss("hello");
console.log(stringInstance.getIndentity()); //hello

// 泛型约束
interface Length {
  length: number;
}
function identityLength<T extends Length>(params: T): T {
  // 约束，防止当传入不含有length的参数时会报错，如传入Number
  console.log(params.length);
  return params;
}

// keyof 操作符， 可以用于获取某种类型的所有键，其返回类型是联合类型
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  // 保证key 一定是对象含有的键
  return obj[key];
}
