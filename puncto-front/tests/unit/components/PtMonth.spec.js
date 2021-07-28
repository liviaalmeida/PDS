import { shallowMount } from '@vue/test-utils'
import PtMonth from '../../../src/common/calendar/PtMonth.vue'

describe('PtMonth', () => {
    const date = new Date()
    let ptMonth

    beforeEach(() => {
        ptMonth = shallowMount(PtMonth, {
                propsData: {
                    date: date
                }
            })
        })

    it('renders a month', () => {
        expect(ptMonth.find('month')).toBeDefined()
    })

})
