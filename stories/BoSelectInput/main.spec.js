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
                params: {},
                form: {},
            },
        })
        expect(mockMethod).toBeCalled()
    })

    it('methods.resetSelectInputParams', async () => {
        const wrapper = shallowMount(BoSelectInput, {
            propsData: {
                params: {},
                form: {
                    prop: 'prop',
                    selectName: 'selectName'
                },
            },
        })
        wrapper.vm.resetSelectInputParams()
        expect(wrapper.vm.params).toEqual({"selectName": "prop"})
    })

    it('methods.onEnter', async () => {
        const wrapper = shallowMount(BoSelectInput, {
            propsData: {
                params: {},
                form: {},
            },
        })
        wrapper.vm.onEnter()
        expect(wrapper.emitted('onEnter')).toBeTruthy()
    })

})