/*
 * @Author: 阮志雄
 * @Date: 2021-10-31 21:58:49
 * @LastEditTime: 2021-10-31 22:03:21
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\examples\interfaces.ts
 */
/*
预先定义的条件类型（Predefined conditional types）
TS提供了几种内置的预定义的条件类型

Exclude<T, U> - 用于从类型T中去除不在U类型中的成员
Extract<T, U> - 用于从类型T中取出可分配给U类型的成员
NonNullable<T> - 用于从类型T中去除undefined和null类型
ReturnType<T> - 获取函数类型的返回类型
InstanceType<T> - 获取构造函数的实例类型
*/
type T09 = Exclude<"a" | "b" | "c" | "d", "c" | "d" | "h">; //"a"|"b"

type T10 = Extract<"a" | "b" | "c" | "d", "c" | "d" | "h">; //"c|"d"
