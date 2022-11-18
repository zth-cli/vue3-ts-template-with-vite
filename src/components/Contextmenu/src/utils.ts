export const itemProvide = Symbol()

export type Command = number | string | object

export type Tprovide = {
  itemClickHnadle: (arg0: Command) => void
}
