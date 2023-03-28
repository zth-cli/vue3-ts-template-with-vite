// 扁平数据转树结构
export const buildTree = (list: { [x: string]: any }) => {
  const temp = {}
  const tree = []
  for (const i in list) {
    temp[list[i].id] = list[i]
  }
  for (const i in temp) {
    if (temp[i].parentId) {
      if (!temp[temp[i].parentId].children) {
        temp[temp[i].parentId].children = []
      }
      temp[temp[i].parentId].children.push(temp[i])
    } else {
      tree.push(temp[i])
    }
  }
  return tree
}

// 将多维数组转化为一维
export const newArr = function (arr: any[]): string | any[] {
  return arr.reduce((pre: string | any[], cur: any) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur), [])
}

// 计算数组中每个元素出现的次数
// let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
export const nameNum = function (names: any[]) {
  return names.reduce((pre: { [x: string]: number }, cur: string) => {
    if (cur in pre) {
      pre[cur]++
    } else {
      pre[cur] = 1
    }
    return pre
  }, {})
}

// 转数组
export function toArray(likeArray: any) {
  return Array.isArray(likeArray) ? likeArray : [likeArray]
}

// 数字科学计数 10000 => 10k
export function numberFormatter(num: number, digits: number) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

// 数字科学计数
// 10000 => "10,000"数字格式化
export function toThousandFilter(num: string | number) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 首字母大写
export function uppercaseFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 首字母小写
export const lowercaseFirst = (str: string) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`

// 检测某个元素是否聚焦
export const hasFocus = (el: Element) => el === document.activeElement

//获取某个元素所有的兄弟元素
export const a = (el: { parentNode: { children: any } }) =>
  [].slice.call(el.parentNode.children).filter((child: any) => child !== el)

// 随机IP地址
export const randomIp = () =>
  Array(4)
    .fill(0)
    .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
    .join('.')

// 下划线转驼峰
// eslint-disable-next-line no-useless-escape
export const toHump = (str: string) => str.replace(/_(\w)/g, (all: any, letter: string) => letter.toUpperCase())

// 驼峰转下划线横线
export const toLine = (str: string) => str.replace(/([A-Z])/g, '_$1').toLowerCase()

// 两个日期之间相差的天数
export const diffDays = (date: number, otherDate: number) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24))

//检查日期是否有效
export const isDateValid = (val: Date | string) => !Number.isNaN(new Date(val).valueOf())

// 颜色格式 hex 转 rgba
export const hexToRgba = (bgColor: string, opt = 1) => {
  const color = bgColor.trim().slice(1) // 去掉'#'号
  const rgba = [
    parseInt('0x' + color.slice(0, 2)),
    parseInt('0x' + color.slice(2, 4)),
    parseInt('0x' + color.slice(4, 6)),
    opt,
  ]
  return 'rgba(' + rgba.toString() + ')'
}
//hex颜色转rgb颜色
export function HexToRgb(color: string): void | number[] {
  const r = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
  //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
  if (!r.test(color.trim())) {
    return console.warn('非法hex字符串')
  }
  //replace替换查找的到的字符串
  color = color.trim().slice(1) // 去掉'#'号
  //match得到查询数组
  const hxs = [
    parseInt('0x' + color.slice(0, 2)),
    parseInt('0x' + color.slice(2, 4)),
    parseInt('0x' + color.slice(4, 6)),
  ]
  return hxs
}
//GRB颜色转Hex颜色
export function RgbToHex(a: any, b: any, c: any): string | void {
  const r = /^\d{1,3}$/
  if (!r.test(a) || !r.test(b) || !r.test(c)) {
    return console.warn('输入错误的rgb颜色值')
  }
  const hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1) {
      hexs[i] = '0' + hexs[i]
    }
  }
  return '#' + hexs.join('')
}

//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间, 值越大颜色越深
export function getDarkColor(color: string, level: number): string | void {
  const r = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
  if (!r.test(color.trim())) {
    return console.warn('输入错误的hex颜色值')
  }
  const rgbc = HexToRgb(color) || []
  for (let i = 0; i < 3; i++) {
    rgbc[i] = Math.floor(rgbc[i] * (1 - level))
  }
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}
//得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
export function getLightColor(color: string, level: number): string | void {
  const r = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
  if (!r.test(color.trim())) {
    return console.warn('输入错误的hex颜色值')
  }
  const rgbc = HexToRgb(color) || []
  for (let i = 0; i < 3; i++) {
    rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
  }
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}
