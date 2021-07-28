import { mount, createLocalVue } from '@vue/test-utils'
import PtIcon from '@/common/PtIcon.vue'
import PtInput from '@/common/input/PtInput.vue'
import VueMask from 'v-mask'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(VueMask)

describe('PtInput', () => {
  const label = 'Test Input'
  const type = 'number'
  let ptInput, input

  beforeEach(() => {
    ptInput = mount(PtInput, {
      localVue,
      propsData: {
        label,
        type,
        value: 'kkkkkk'
      },
      model: {
        prop: 'value',
      },
      components: {
        PtIcon,
      },
    })
    input = ptInput.find('input')
  })

  it('renders a input', () => {
    expect(input.exists()).toBeDefined()
  })

  it('renders the input with type', () => {
    const inputType = input.attributes('type')
    expect(inputType).toBe(type)
  })

  it('renders the input label with text', () => {
    const labelWrapper = ptInput.find('label')
    expect(labelWrapper.text()).toBe(label)
  })

  it('emits an input event on input input', () => {
    input.trigger('input')
    expect(ptInput.emitted().input?.length).toBe(1)
  })

  it('disables input on disabled property', async () => {
    ptInput.setProps({ disabled: true })
    await Vue.nextTick()
    expect(input.attributes('disabled')).toBe('disabled')
  })
})
