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
  it('renders the class', () => {
    expect(ptYear.find('.calendar-pick')).toBeDefined()
  })
  it('renders the button', () => {
    expect(ptYear.find('button')).toBeDefined()
  })
  it('renders the button text correctly', () => {
    expect(ptYear.find('button').text()).toBe('◄')
  })
  it('renders the button text correctly', () => {
    expect(ptYear.find('tbody button').text()).toBe("2016")
  })

})