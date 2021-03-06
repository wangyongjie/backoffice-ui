import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoDialog from '../../packages/BoDialog/src/main.vue'

describe('BoDialog', () => {

    it('computed.formTitle ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'add'
                },
                formItems: []
            }
        })
        expect(wrapper.vm.formTitle).toBe('Add Form')

        await wrapper.setProps({
            form: {
                type: 'edit'
            },
        })
        expect(wrapper.vm.formTitle).toBe('Edit Form')

        await wrapper.setProps({
            form: {
                type: 'preview'
            },
        })
        expect(wrapper.vm.formTitle).toBe('Preview Form')

        await wrapper.setProps({
            title: 'title'
        })
        expect(wrapper.vm.formTitle).toBe('title')
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
        const result = {
            balance: 100,
        }
        wrapper.vm.$nextTick(() => {
            wrapper.vm.confirm()
            expect(wrapper.emitted('confirm')[0]).toEqual([result])
        })
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

    it('methods.onChange ', async () => {
        const wrapper = shallowMount(BoDialog, {
            propsData: {
                form: {
                    type: 'edit',
                    model: {
                        text: '123'
                    }
                },
                formItems: [],
                visible: true
            },
        })
        const item = {
            prop: 'text',
            change: jest.fn()
        }
        wrapper.vm.onChange(item)
        expect(item.change).toBeCalledWith('123')
    })

    it('mounted', () => {
        const map = {};
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
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
        wrapper.vm.$nextTick(() => {
            expect(map).toEqual({
                "resize": expect.any(Function)
            })
        })
    });

    it('beforeDestroy', () => {
        const map = {};
        window.removeEventListener = jest.fn((event, cb) => {
            map[event] = cb;
        });
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
        wrapper.destroy()
        expect(map).toEqual({
            "resize": expect.any(Function)
        })
    });
})