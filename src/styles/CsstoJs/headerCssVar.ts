export type TcssVar = {
  backgroundColor: string
  activeTextColor: string
  textColor: string
}
export const LOCAL_NAME = '_headerThemeNum_'
export const headerCssVars: TcssVar[] = [
  {
    backgroundColor: '#001529',
    activeTextColor: '#fff',
    textColor: '#fff',
  },
  {
    backgroundColor: '#0fa59b',
    activeTextColor: '#fff',
    textColor: '#fff',
  },
  {
    backgroundColor: '#fff',
    activeTextColor: '',
    textColor: '',
  },
]

export const initHeaderTheme = () => {
  const init = Number(localStorage.getItem(LOCAL_NAME))
  return init ? headerCssVars[init] : headerCssVars[0]
}
export const updataHeaderTheme = (index: number) => {
  localStorage.setItem(LOCAL_NAME, index.toString())
}
