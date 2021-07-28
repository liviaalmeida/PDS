import { shallowMount } from '@vue/test-utils'
import PtIcon from '@/common/PtIcon.vue'
import PtLogo from '@/common/PtLogo.vue'

describe('PtLogo', () => {
  let ptLogo

  beforeEach(() => {
    ptLogo = shallowMount(PtLogo, {
      components: {
        PtIcon,
      },
    })
  })

  it('renders the logo element', () => {
    expect(ptLogo.find('.logo').exists()).toBeDefined()
  })

  it('renders the watch icon', () => {
    expect(ptLogo.find('.watch').exists()).toBeDefined()
  })

  it('renders the h1 tag', () => {
    expect(ptLogo.find('h1').exists()).toBeDefined()
  })

  it('renders the title "puncto" inside h1 tag', () => {
    expect(ptLogo.find('h1').text()).toBe('puncto')
  })
})
