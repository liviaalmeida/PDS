import { shallowMount } from '@vue/test-utils'
import PtMonth from '../../../src/common/calendar/PtMonth.vue'

describe('PtMonth', () => {
  const date = new Date(Date.now())
  const valuePartial = {
    start: new Date(Date.now()),
  }
  const valueFull = {
    start: new Date(Date.now()),
    end: new Date(Date.now()),
  }
  let ptMonth

  const mountMonth = (value) => shallowMount(PtMonth, {
    propsData: {
      date,
      fullfilled: [],
      pending: [],
      value,
    },
  })

  it('renders month with day', () => {
    ptMonth = mountMonth(valuePartial)
    expect(ptMonth.find('month')).toBeDefined()
  })

  it('renders month with range', () => {
    ptMonth = mountMonth(valueFull)
    expect(ptMonth.find('month')).toBeDefined()
  })

  it('render days', () => {
    ptMonth = mountMonth(valueFull)
    const days = ptMonth.findAll('td')
    days.wrappers.forEach(day => {
      expect(day.find('input[type="checkbox"]').exists()).toBe(true)
      expect(day.find('label').exists()).toBe(true)
    })
  })

  it('selects initial day', () => {
    const start = new Date()
    start.setDate(1)
    const label = `${start.getDate()}-${date.getMonth()}`

    ptMonth = mountMonth({ start })
    const day = ptMonth.find(`input[id="${label}"]`)
    expect(day.element.checked).toBe(true)
  })

  it('selects initial day when end is null', () => {
    const start = new Date()
    start.setDate(1)
    const value = { start, end: null }
    ptMonth = mountMonth(value)

    const day15 = ptMonth.find(`input[id="15-${date.getMonth()}"]`).element
    day15.click()
    expect(ptMonth.props('value').end).toBe(null)
    expect(day15.checked).toBe(true)
  })

  it('selects end day', () => {
    const start = new Date()
    start.setDate(1)
    const value = { start, end: undefined }
    ptMonth = mountMonth(value)

    const day15 = ptMonth.find(`input[id="15-${date.getMonth()}"]`).element
    day15.click()
    expect(day15.checked).toBe(true)
  })
})
