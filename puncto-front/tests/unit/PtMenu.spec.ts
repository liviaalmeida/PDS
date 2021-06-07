import { shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import MenuItem from '@/components/menu/MenuItem.vue'
import PtIcon from '@/components/PtIcon.vue'
import PtMenu from '@/components/menu/PtMenu.vue'
import Vuex from 'vuex'

describe('PtMenu', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  const getters = {
    cnpj: () => '1221929121',
    fullname : () => 'Company Name',
  }
  const store = new Vuex.Store({
    getters
  })

  let ptMenu: Wrapper<PtMenu>

  beforeEach(() => {
    ptMenu = shallowMount(PtMenu, {
      components: {
        MenuItem,
        PtIcon,
      },
      localVue,
      store,
    })
  })

  it('renders the menu element', () => {
    expect(ptMenu.find('.menu')).toBeDefined()
  })

  it('renders the menu closed', () => {
    expect(ptMenu.find('.double-chevron-right')).toBeDefined()
  })

  it('opens the menu on button click', () => {
    const button = ptMenu.find('button')
    button.trigger('click')
    expect(ptMenu.find('.double-chevron-left')).toBeDefined()
  })
})
