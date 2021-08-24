import { mount, createLocalVue } from '@vue/test-utils'
import PtIcon from '@/common/PtIcon.vue'
import PtInput from '@/common/input/PtInput.vue'
import VueMask from 'v-mask'
import Vue from 'vue'

const localVue = createLocalVue()
localVue.use(VueMask)

describe('PtInput', () => {
  const label = 'Test Input'
  let ptInput, input

  beforeEach(() => {
    ptInput = mount(PtInput, {
      localVue,
      propsData: {
        label,
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

  it('renders the input label with text', () => {
    const labelWrapper = ptInput.find('label')
    expect(labelWrapper.text()).toBe(label)
  })

  it('emits an model event on input input', () => {
    input.trigger('input')
    expect(ptInput.emitted().model?.length).toBe(1)
  })

  it('disables input on disabled property', async () => {
    ptInput.setProps({ disabled: true })
    await Vue.nextTick()
    expect(input.attributes('disabled')).toBe('disabled')
  })
})
