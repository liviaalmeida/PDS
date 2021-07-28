import { shallowMount } from '@vue/test-utils'
import PtMonths from '../../../src/common/calendar/PtMonths.vue'

describe('PtMonths', () => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let ptMonths

    beforeEach(() => {
        ptMonths = shallowMount(PtMonths, {
                propsData: {
                    months: months
                }
            })
        })

    it('renders months', () => {
        expect(ptMonths.find('months')).toBeDefined()
    })

})