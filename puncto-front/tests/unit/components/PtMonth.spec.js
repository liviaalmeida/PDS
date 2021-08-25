import { shallowMount } from '@vue/test-utils'
import PtMonth from '../../../src/common/calendar/PtMonth.vue'

describe('PtMonth', () => {
  const date = new Date(Date.now())
  const value = {
    start: new Date(Date.now()),
    end: null,
  }
  let ptMonth

  beforeEach(() => {
    ptMonth = shallowMount(PtMonth, {
      propsData: {
        date,
        fullfilled: [],
        pending: [],
        value,
      },
    })
  })

  it('renders month', () => {
    expect(ptMonth.find('month')).toBeDefined()
  })
})
