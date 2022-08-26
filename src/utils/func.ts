// 扁平数据转树结构
export const buildTree = (list) => {
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
export const newArr = function (arr) {
  return arr.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur), [])
}

// 计算数组中每个元素出现的次数
// let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
export const nameNum = function (names) {
  return names.reduce((pre, cur) => {
    if (cur in pre) {
      pre[cur]++
    } else {
      pre[cur] = 1
    }
    return pre
  }, {})
}

// 转数组
export function toArray(likeArray) {
  return Array.isArray(likeArray) ? likeArray : [likeArray]
}

// 数字科学计数 10000 => 10k
export function numberFormatter(num, digits) {
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
      return (
        (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
        si[i].symbol
      )
    }
  }
  return num.toString()
}

// 数字科学计数
// 10000 => "10,000"数字格式化
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 首字母大写
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 首字母小写
export const lowercaseFirst = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`

// 检测某个元素是否聚焦
export const hasFocus = (el) => el === document.activeElement

//获取某个元素所有的兄弟元素
export const a = (el) => [].slice.call(el.parentNode.children).filter((child) => child !== el)

// 随机IP地址
export const randomIp = () =>
  Array(4)
    .fill(0)
    .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
    .join('.')

// 下划线转驼峰
// eslint-disable-next-line no-useless-escape
export const toHump = (str) => str.replace(/\_(\w)/g, (all, letter) => letter.toUpperCase())

// 驼峰转下划线横线
export const toLine = (str) => str.replace(/([A-Z])/g, '_$1').toLowerCase()

// 两个日期之间相差的天数
export const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24))

//检查日期是否有效
export const isDateValid = (val: Date | string) => !Number.isNaN(new Date(val).valueOf())

// 颜色格式 hex 转 rgba
export const hexToRgba = (bgColor: string, opt = 1) => {
  const color = bgColor.slice(1) // 去掉'#'号
  const rgba = [
    parseInt('0x' + color.slice(0, 2)),
    parseInt('0x' + color.slice(2, 4)),
    parseInt('0x' + color.slice(4, 6)),
    opt,
  ]
  return 'rgba(' + rgba.toString() + ')'
}
