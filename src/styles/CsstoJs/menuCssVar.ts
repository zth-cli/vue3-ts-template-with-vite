export type TcssVar = {
  backgroundColor: string
  activeTextColor: string
  textColor: string
}
export const LOCAL_NAME = '_menuThemeNum_'
export const menuCssVars: TcssVar[] = [
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

export const initMenuTheme = () => {
  const init = Number(localStorage.getItem(LOCAL_NAME))
  return init ? menuCssVars[init] : menuCssVars[0]
}
export const updataMenuTheme = (index: number) => {
  localStorage.setItem(LOCAL_NAME, index.toString())
}
