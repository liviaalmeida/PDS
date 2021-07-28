import { shallowMount } from '@vue/test-utils'
import PtIcon from '@/common/PtIcon.vue'
import PtInput from '@/common/input/PtInput.vue'

describe('PtInput', () => {
  const label = 'Test Input'
  let ptInput

  beforeEach(() => {
    ptInput = shallowMount(PtInput, {
      propsData: {
        label,
      },
      components: {
        PtIcon,
      },
    })
  })

  it('renders a input', () => {
    expect(ptInput.find('input')).toBeDefined()
  })
})
