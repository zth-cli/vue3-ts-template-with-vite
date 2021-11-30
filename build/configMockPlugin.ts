import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(command: string) {
  return viteMockServe({
    // default
    mockPath: 'mock',
    localEnabled: command === 'serve',
    prodEnabled: command !== 'serve',
    watchFiles: true
  })
}
