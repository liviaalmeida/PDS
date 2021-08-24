import { shallowMount } from '@vue/test-utils'
import PtIcon from '@/common/PtIcon.vue'

describe('PtIcon', () => {
  const name = 'edit'
  let ptIcon

  beforeEach(() => {
    ptIcon = shallowMount(PtIcon, {
      propsData: {
        name,
      },
      computed: {
        iconLoader() {
          return { template: '<svg />' }
        },
      },
    })
  })

  it('renders an icon', () => {
    expect(ptIcon.find('svg').exists()).toBeDefined()
  })
})
