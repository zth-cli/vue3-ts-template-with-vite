/**
 * @description 颜色格式 hex 转 rgba
 * @param bgColor
 * @param opt
 * @returns rgba
 * @example hexToRgba('#fff', 0.5) => rgba(255, 255, 255, 0.5)
 */
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
/**
 * @description 颜色格式 rgba 转 hex
 * @param color
 * @returns hex
 * @example rgbaToHex('rgba(255, 255, 255, 0.5)') => #ffffff
 */
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
/**
 * @description rgb颜色转Hex颜色
 * @param a
 * @param b
 * @param c
 * @returns {String}
 * @example rgbToHex(255, 255, 255) => #ffffff
 */
export function RgbToHex(a: any, b: any, c: any): string | void {
  const r = /^\d{1,3}$/
  if (!r.test(a) || !r.test(b) || !r.test(c)) {
    return console.warn('输入错误的颜色值')
  }
  const hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length === 1) {
      hexs[i] = '0' + hexs[i]
    }
  }
  return '#' + hexs.join('')
}

/**
 * @description 根据给定的hex颜色值和调整级别，获取一个更暗的色彩值。
 * @param color string - hex颜色代码，可以是3位或6位的十六进制字符串。
 * @param level number - 调整级别，决定了颜色变暗的程度，范围应在0到1之间。
 * @returns string | void - 如果输入的颜色值正确，并且能够成功转换和调整，则返回对应的暗色hex值；如果输入颜色值不正确，则在控制台输出警告信息，不返回任何内容。
 * @example getDarkColor('#fff', 0.5) => #7f7f7f
 */

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
/**
 * @description 根据给定的hex颜色值和调整级别，获取一个新的更亮的颜色值。
 * @param color string - 待调整的hex颜色值，可以是3或6位的十六进制字符串。
 * @param level number - 调整级别，决定了颜色变亮的程度，范围应在0到1之间。
 * @returns string | void - 返回新的hex颜色字符串，如果输入的颜色值不合法，则打印警告但不返回值。
 * @example getLightColor('#000', 0.5) => #7f7f7f
 */
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
