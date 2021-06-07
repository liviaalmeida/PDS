import { shallowMount, Wrapper } from '@vue/test-utils'
import PtIcon from '@/components/PtIcon.vue'
import PtInput from '@/components/input/PtInput.vue'

describe('PtInput', () => {
	const label = 'Test Input'
	let ptInput: Wrapper<PtInput>

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
