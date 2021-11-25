import day from 'dayjs'
export const useTimeSwitch = (fromData: { [x: string]: any }) => {
  const switchDate = (prop: string, typeObj, typeParamName: string) => {
    var format =
      typeObj.type === 'date'
        ? 'YYYY-MM-DD'
        : typeObj.type === 'month'
        ? 'YYYY-MM'
        : typeObj.type === 'year'
        ? 'YYYY'
        : 'YYYY-MM-DD'
    // 解决日期选择多日后，切换为日和月报错问题
    var date = typeof fromData[prop] === 'string' ? fromData[prop] : fromData[prop][0]
    fromData[prop] = day(date).format(format.toUpperCase())
    if (typeParamName) fromData[typeParamName] = typeObj.typeName
  }
  return { switchDate }
}
