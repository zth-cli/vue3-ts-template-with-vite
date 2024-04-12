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

/**
 * @description 计算数组中每个元素出现的次数
 * @param array
 * @returns {Object}
 * @example nameNum(['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']) => {"Alice": 2, "Bob": 1, "Tiff": 1, "Bruce": 1}
 */
export const nameNum = (array: any[]): Record<any, number> => {
  return array.reduce((pre: { [x: string]: number }, cur: string) => {
    if (cur in pre) {
      pre[cur]++
    } else {
      pre[cur] = 1
    }
    return pre
  }, {})
}

/**
 * @description 将类数组转换为数组
 * @param {*} likeArray
 * @returns {Array}
 * @example toArray({0: 'a', 'length': 1}) => ["a"]
 */
export function toArray(likeArray: any): Array<any> {
  return Array.isArray(likeArray) ? likeArray : [likeArray]
}

/**
 * @description 数字科学计数 10000 => 10k 数字格式化
 * @param num
 * @returns {String}
 * @example numberFormatter(10000) => 10k
 */
export function numberFormatter(num: number, digits: number): string {
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

/**
 * @description 数字科学计数 10000 => "10,000"数字格式化
 * @param num
 * @returns {String}
 * @example toThousandFilter(10000) => "10,000"
 */
export function toThousandFilter(num: string | number): string {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * @description 首字母大写
 * @param string
 * @returns {String}
 * @example uppercaseFirst('hello') => 'Hello'
 */
export function uppercaseFirst(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * @description 首字母小写
 * @param str
 * @returns {String}
 * @example uppercaseFirst('Hello') => 'hello'
 */
export const lowercaseFirst = (str: string): string => `${str.charAt(0).toLowerCase()}${str.slice(1)}`

/**
 * @description 随机IP地址
 * @returns {String}
 * @example randomIp() => '192.168.1.1'
 */
export const randomIp = (): string =>
  Array(4)
    .fill(0)
    .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
    .join('.')

/**
 * @description 下划线转驼峰
 * @param {String} str
 * @returns {String}
 * @example toHump('user_name') => 'userName'
 */
export const toHump = (str: string): string =>
  str.replace(/_(\w)/g, (_all: any, letter: string) => letter.toUpperCase())

/**
 * @description 驼峰转下划线
 * @param {String} str
 * @returns {String}
 * @example toLine('userName') => 'user_name'
 */
export const toLine = (str: string): string => str.replace(/([A-Z])/g, '_$1').toLowerCase()

/**
 * @description 计算两个日期之间相差的天数
 * @param {Date | string} date
 * @param {Date | string} otherDate
 * @returns {number}
 * @example diffDays(new Date(), new Date(2020, 0, 1)) => 365
 */
export const diffDays = (date: number, otherDate: number): number =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24))

/**
 * @description 判断日期是否合法
 * @param {Date | string} val
 * @returns {Boolean}
 * @example isDateValid(new Date()) => true
 */
export const isDateValid = (val: Date | string): boolean => !Number.isNaN(new Date(val).valueOf())

/**
 * @description 并发执行任务，控制同时执行任务的数量
 * @param {Promise<any>[]} tasks
 * @param {number} paralleCount
 * @returns {Promise<void>}
 * @example paralleTask([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)], 2) => Promise<void>
 */
export const paralleTask = (tasks: Promise<any>[], paralleCount: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (tasks.length === 0) {
      resolve()
    }
    let nextIndex = 0
    let finishCount = 0
    const _run = () => {
      const task = tasks[nextIndex]
      nextIndex++
      task &&
        task.then(() => {
          finishCount++
          if (tasks.length > nextIndex) {
            _run()
          } else if (finishCount === tasks.length) {
            // 任务完成
            resolve()
          }
        })
    }
    for (let index = 0; index < paralleCount && index < tasks.length; index++) {
      _run()
    }
  })
}
