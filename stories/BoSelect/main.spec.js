import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoSelect from '../../packages/BoSelect/src/main.vue'


describe('BoSelect', () => {
    it('computed.formatList', async () => {
        const wrapper = shallowMount(BoSelect, {
            propsData: {
                model: '',
                value: [],
                list: [
                    'string',
                    {
                        value: 0,
                        label: "Male"
                    },
                ],
                collapseTags: true,
                disabled: false,
                showBtn: true,
                showType: 1,
            },
        })
        const result = [{"label": "string", "value": "string"}, {"label": "Male", "value": 0}]
        expect(wrapper.vm.formatList).toEqual(result);
    })

    it('computed.ppValue', async () => {
        const wrapper = shallowMount(BoSelect, {
            propsData: {
                model: '',
                value: [],
                list: [],
                collapseTags: true,
                disabled: false,
                showBtn: true,
                showType: 1,
            },
        })
        const result = ["_all_"]
        expect(wrapper.vm.ppValue).toEqual(result);
    })

    it('methods.handleChange', async () => {
        const wrapper = shallowMount(BoSelect, {
            propsData: {
                model: '',
                value: [],
                list: [],
                collapseTags: true,
                disabled: false,
                showBtn: true,
                showType: 1,
            },
        })
        wrapper.vm.handleChange(['select1'])
        let result = ["select1"]
        expect(wrapper.emitted('input')[0]).toEqual([result]);

        wrapper.vm.handleChange([])
        result = ["_all_"]
        expect(wrapper.emitted('input')[1]).toEqual([result]);
    })

    it('methods.reverseAll', async () => {
        const handleChange = jest.spyOn(BoSelect.methods, 'handleChange')
        const wrapper = shallowMount(BoSelect, {
            propsData: {
                model: '',
                value: ['value1'],
                list: ['value1', 'value2'],
                collapseTags: true,
                disabled: false,
                showBtn: true,
                showType: 1,
            },
        })
        wrapper.vm.reverseAll()
        const result = ["value2"]
        expect(handleChange).toHaveBeenCalledWith(result);
    })

    it('methods.handleSelectAll', async () => {
        const handleChange = jest.spyOn(BoSelect.methods, 'handleChange')
        const wrapper = shallowMount(BoSelect, {
            propsData: {
                model: '',
                value: ['value1'],
                list: ['value1', 'value2'],
                collapseTags: true,
                disabled: false,
                showBtn: true,
                showType: 1,
            },
        })
        wrapper.vm.handleSelectAll('value2')
        const result = ['value1', "value2"]
        expect(handleChange).toHaveBeenCalledWith(result);
    })

})