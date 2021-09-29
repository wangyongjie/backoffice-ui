import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoDialog from './main.vue'


describe('BoDialog', () => {

    it('computed.title ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'add'
                },
                formItems: []
            }
        })
        expect(wrapper.vm.title).toBe('Add Form')
        await wrapper.setProps({
            form: {
                type: null
            }
        })
        expect(wrapper.vm.title).toBe('Edit Form')
    })

    it('watch.visible ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'add',
                    model: {
                        show: true,
                        balance: 100,
                        name: 'test'
                    }
                },
                formItems: [{
                        prop: 'show',
                        label: 'Show',
                        itemType: 'switch'
                    },
                    {
                        prop: 'balance',
                        label: 'Balance'
                    },
                    {
                        prop: 'name',
                        label: 'Name'
                    },
                ],
                visible: true
            },
        })
        const result = {
            "balance": 0,
            "name": "",
            "show": false
        }
        expect(wrapper.vm.form.model).toEqual(result)
    })

    it('methods.confirm ', async () => {
        const wrapper = mount(BoDialog, {
            propsData: {
                form: {
                    type: 'edit',
                    model: {
                        balance: 100,
                    }
                },
                formItems: [{
                    prop: 'balance',
                    label: 'Balance'
                }],
                visible: true
            },
        })
        const parseCurrencyModel = jest.spyOn(wrapper.vm, 'parseCurrencyModel')
        const result = {
            balance: 100,
        }
        wrapper.vm.$nextTick(() => {
            wrapper.vm.confirm()
            expect(wrapper.emitted('confirm')[0]).toEqual([result])
            expect(parseCurrencyModel).toBeCalled()
        })
    })

    it('methods.parseCurrencyModel ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'edit',
                    model: {
                        currency: '100',
                    }
                },
                formItems: [{
                    prop: 'currency',
                    label: 'Currency',
                    itemType: 'currency'
                }],
                visible: true
            },
        })
        const result = {
            currency: 100,
        }
        wrapper.vm.parseCurrencyModel(wrapper.vm.form.model)
        expect(wrapper.vm.form.model).toEqual(result)
    })

    it('methods.closeDialog ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'edit',
                    model: {
                        currency: '100',
                    }
                },
                formItems: [{
                    prop: 'currency',
                    label: 'Currency',
                    itemType: 'currency'
                }],
                visible: true
            },
        })
        wrapper.vm.closeDialog()
        expect(wrapper.emitted('update:visible')[0]).toEqual([false])
        expect(wrapper.emitted('update:loading')[0]).toEqual([false])
    })

    it('methods.onResize ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'edit',
                    model: {}
                },
                formItems: [],
                visible: true
            },
        })
        let windowSpy = jest.spyOn(window, "window", "get");
        windowSpy.mockImplementation(() => ({
            innerWidth: 500
        }));
        wrapper.vm.onResize()
        expect(wrapper.vm.dialogWidth).toBe("100%")
        expect(wrapper.vm.labelPosition).toBe("top")

        windowSpy.mockImplementation(() => ({
            innerWidth: 700
        }));
        wrapper.vm.onResize()
        expect(wrapper.vm.dialogWidth).toBe("50%")
        expect(wrapper.vm.labelPosition).toBe("left")

        windowSpy.mockRestore();
    })

    it('methods.trimOnBlur ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'edit',
                    model: {
                        text: '    trim    '
                    }
                },
                formItems: [],
                visible: true
            },
        })

        const result = 'trim'
        wrapper.vm.trimOnBlur('text')
        expect(wrapper.vm.form.model['text']).toBe(result)
    })


})