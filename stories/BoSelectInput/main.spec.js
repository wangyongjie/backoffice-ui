import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoSelectInput from '../../packages/BoSelectInput/src/main.vue'


describe('BoSelectInput', () => {
    it('watch.form', async () => {
        const mockMethod = jest.spyOn(BoSelectInput.methods, 'resetSelectInputParams')
        const wrapper = shallowMount(BoSelectInput, {
            propsData: {
                value: {},
                form: {},
            },
        })
        expect(mockMethod).toBeCalled()
    })

    it('watch.params', async () => {
        const wrapper = shallowMount(BoSelectInput, {
            propsData: {
                value: {},
                form: {},
            },
        })
        wrapper.setData({
            params: {
                model: 'test'
            }
        })
        expect(wrapper.emitted('input')).toEqual()
    })

    it('methods.resetSelectInputParams', async () => {
        const wrapper = shallowMount(BoSelectInput, {
            propsData: {
                value: {},
                form: {
                    prop: 'prop',
                    selectName: 'selectName'
                },
            },
        })
        wrapper.vm.resetSelectInputParams()
        expect(wrapper.vm.params).toEqual({
            "selectName": "prop"
        })
    })

    it('methods.onEnter', async () => {
        const wrapper = shallowMount(BoSelectInput, {
            propsData: {
                value: {},
                form: {},
            },
        })
        wrapper.vm.onEnter()
        expect(wrapper.emitted('onEnter')).toBeTruthy()
    })

})