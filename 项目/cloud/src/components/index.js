import container from './container'

const components = [
  container
]

const install = Vue => {
  if (install.installed) return false

  for (let i = 0, len = components.length; i < len; i++) {
    const component = components[i]
    Vue.component(component.name, component)
  }

  install.installed = true
}

export default install
