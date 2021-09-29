import {
    shallowMount
} from '@vue/test-utils'
import BoCurrencyInput from './main.vue'


describe('BoCurrencyInput', () => {

    it('computed.displayValue get null', async () => {
        const wrapper = shallowMount(BoCurrencyInput, {
            propsData: {
                value: null
            }
        })
        expect(wrapper.vm.displayValue).toBe(null)
    })

    it('computed.displayValue get 1000', async () => {
        const wrapper = shallowMount(BoCurrencyInput, {
            propsData: {
                value: '1000'
            }
        })
        expect(wrapper.vm.displayValue).toBe('1,000')
    })

    it('computed.displayValue set 1,000', async () => {
        const wrapper = shallowMount(BoCurrencyInput)
        wrapper.vm.displayValue = '1,000'
        expect(wrapper.emitted('input')[0]).toEqual(['1000'])
    })
})