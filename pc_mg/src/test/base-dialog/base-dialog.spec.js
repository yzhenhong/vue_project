/* eslint-disable no-undef */
import BaseDialog from '@/components/base-dialog'
import { createLocalVue, mount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
// import { expect } from 'chai'

let localVue
export function mockVue () {
  if (!localVue) {
    localVue = createLocalVue()
    localVue.use(ElementUI)
    localVue.use(SvgIcon, {
      tagName: 'svgicon'
    })
  }
  return localVue
}

describe('BaseDialog.vue', () => {
  const localVue = mockVue()
  const wrapper = mount(BaseDialog, { propsData: { visible: true }, localVue })
  it('has a div header', () => {
    const header = wrapper.find('.header')
    expect(header.is('div')).toBe(true)
  })
  it('show error icon', () => {
    wrapper.setProps({ error: true, success: false })
    wrapper.vm.$nextTick(() => {
      const svgicon = wrapper.findAllComponents(localVue.options.components.svgicon).at(1)
      expect(svgicon.vm.name).toBe('error')
    })
  })
  it('show success icon', () => {
    wrapper.setProps({ success: true, error: false })
    wrapper.vm.$nextTick(() => {
      const svgicon = wrapper.findAllComponents(localVue.options.components.svgicon).at(1)
      expect(svgicon.vm.name).toBe('success')
    })
  })
  it('show success icon', () => {
    wrapper.setProps({ success: true, error: false })
    wrapper.vm.$nextTick(() => {
      const svgicon = wrapper.findAllComponents(localVue.options.components.svgicon).at(1)
      expect(svgicon.vm.name).toBe('success')
    })
  })
})
