import { shallowMount, createLocalVue } from '@vue/test-utils'
import PtCalendar from '../../../src/common/calendar/PtCalendar.vue'
import PtMonth from '../../../src/common/calendar/PtMonth.vue'
import PtMonths from '../../../src/common/calendar/PtMonths.vue'
import PtYears from '../../../src/common/calendar/PtYears.vue'
import { directive } from 'v-visible'

const localVue = createLocalVue()
localVue.directive('visible', directive)

const $api = {
  fetch: async (endpoint) => {
    return new Promise(resolve => resolve(endpoint.response))
  },
  punch: {
    month: () => ({
      response: [
        {
          dia: 1,
          aberto: true,
          possuiPonto: true,
        },
        {
          dia: 2,
          aberto: false,
          possuiPonto: true,
        },
        {
          dia: 3,
          aberto: false,
          possuiPonto: false,
        },
      ],
    }),
  },
}

describe('PtCalendar', () => {
  const value = {
    start: new Date(Date.now()),
    end: null,
  }

  let ptCalendar

  beforeEach(() => {
    ptCalendar = shallowMount(PtCalendar, {
      localVue,
      propsData: {
        value,
      },
      components: {
        PtMonth,
        PtMonths,
        PtYears,
      },
      mocks: {
        $api,
      },
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
    expect(ptCalendar.find('button').text()).toBe('◄')
  })
  it('renders the button correct', () => {
    expect(ptCalendar.find('.to-test button').text()).toBe('Agosto')
  })

})
