import { shallowMount } from '@vue/test-utils'
import PtMonth from '../../../src/common/calendar/PtMonth.vue'

describe('PtMonth', () => {
    const date = new Date(Date.now())
    let ptMonth

    beforeEach(() => {
        ptMonth = shallowMount(PtMonth, {
                propsData: {
                    date
                }
            })
        })

    it('renders month', () => {
        expect(ptMonth.find('month')).toBeDefined()
    })

   
})
