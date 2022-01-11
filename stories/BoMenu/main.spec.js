import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoMenu from '../../packages/BoMenu/src/main.vue'


describe('BoMenu', () => {
    let mocksData = {
        $route: {
            query: {}
        },
        $router: {
            replace: () => ({})
        },
    }

    it('created', async () => {
        const setTabFromUrl = jest.spyOn(BoMenu.methods, 'setTabFromUrl')
        let wrapper = shallowMount(BoMenu, {
            propsData: {
                menus: [{
                    index: '0',
                    label: ''
                }]
            },
            mocks: mocksData
        })
        expect(wrapper.vm.activeIndex).toBe('0')
        expect(setTabFromUrl).toHaveBeenCalled();

        wrapper = shallowMount(BoMenu, {
            propsData: {
                menus: [{
                    index: '0',
                    label: ''
                }, {
                    index: '1',
                    label: '',
                    default: true
                }]
            },
            mocks: mocksData
        })
        expect(wrapper.vm.activeIndex).toBe('1')
    })

    it('methods.handleSelect', async () => {
        const addTabToUri = jest.spyOn(BoMenu.methods, 'addTabToUri')
        const wrapper = shallowMount(BoMenu, {
            propsData: {
                menus: [{
                    index: '0',
                    label: ''
                }, {
                    index: '1',
                    label: '',
                }]
            },
            mocks: mocksData
        })
        wrapper.vm.handleSelect('0')
        expect(addTabToUri).toHaveBeenCalledTimes(2)
        wrapper.vm.handleSelect('1')
        expect(addTabToUri).toHaveBeenCalledTimes(3)
    })

    it('methods.setTabFromUrl', async () => {
        const wrapper = shallowMount(BoMenu, {
            propsData: {
                menus: [{
                    index: '0',
                    label: ''
                }, {
                    index: '1',
                    label: '',
                }]
            },
            mocks: {
                $route: {
                    query: {
                        tab: '1'
                    }
                },
                $router: {
                    replace: () => ({})
                },
            }

        })
        expect(wrapper.vm.activeIndex).toBe('1')
    })

    it('methods.addTabToUri', async () => {
        const replace = jest.fn()
        const wrapper = shallowMount(BoMenu, {
            propsData: {
                menus: [{
                    index: '0',
                    label: ''
                }]
            },
            mocks: {
                $route: {
                    query: {}
                },
                $router: {
                    replace
                },
            }

        })
        wrapper.vm.addTabToUri()
        const result = {
            query: {
                tab: '0'
            }
        }
        expect(replace).toHaveBeenCalledWith(result)
    })


})