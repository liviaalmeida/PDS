import { shallowMount } from '@vue/test-utils'
import PtYears from '../../../src/common/calendar/PtYears.vue'

describe('PtYears', () => {
  const year = 2021
  let ptYear

  beforeEach(() => {
    ptYear = shallowMount(PtYears, {
        propsData: {
            year
        }
    })
  })

  it('renders a year', () => {
    expect(ptYear.find('year')).toBeDefined()
  })

})