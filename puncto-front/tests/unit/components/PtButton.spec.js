import { shallowMount } from '@vue/test-utils'
import PtButton from '@/components/input/PtButton.vue'

describe('PtButton', () => {
  const help = 'Help text under button'
  const label = 'Test Button'
  let ptButton
  let loading = false

  beforeEach(() => {
    loading = false
    ptButton = shallowMount(PtButton, {
      propsData: {
        help,
        loading,
      },
      slots: {
        default: label,
      },
    })
  })

  it('renders a button', () => {
    expect(ptButton.find('button')).toBeDefined()
  })

  it('renders a label inside the button', () => {
    expect(ptButton.find('button').text()).toBe(label)
  })

  it('renders loading if loading is true', () => {
    loading = true
    expect(ptButton.find('.pt-button-loading')).toBeDefined()
  })

  it('renders a help text if provided', () => {
    expect(ptButton.find('.pt-button-help').text()).toBe(help)
  })

  it('emits a click event on click', () => {
    const button = ptButton.find('button')
    button.trigger('click')
    expect(ptButton.emitted().click?.length).toBe(1)
  })
})
