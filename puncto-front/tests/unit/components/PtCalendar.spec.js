import { shallowMount } from '@vue/test-utils'
import PtCalendar from '../../../src/common/calendar/PtCalendar.vue'
import PtMonth from '../../../src/common/calendar/PtMonth.vue'
import PtMonths from '../../../src/common/calendar/PtMonths.vue'
import PtYears from '../../../src/common/calendar/PtYears.vue'

describe('PtCalendar', () => {
  const date = new Date(Date.now())
  let ptCalendar

  beforeEach(() => {
    ptCalendar = shallowMount(PtCalendar, {
        propsData: {
            date
        },
        components: {
            PtMonth,
            PtMonths,
            PtYears,
        }
    })
  })

  it('renders a Calendar', () => {
    expect(ptCalendar.find('calendar')).toBeDefined()
  })
  it('renders the Css', () => {
    expect(ptCalendar.find('.calendar')).toBeDefined()
  })
  it('renders the Css', () => {
    expect(ptCalendar.find('.calendar-header')).toBeDefined()
  })
  it('renders the button correct', () => {
    expect(ptCalendar.find('button').text()).toBe("◄")
  })
  it('renders the button correct', () => {
    expect(ptCalendar.find('.to-test button').text()).toBe("Julho")
  })

})