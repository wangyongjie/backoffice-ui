import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoPage from '../../packages/BoPage/src/main.vue'


describe('BoPage', () => {
    let mocksData = {
        $route: {
            query: {}
        },
        $router: {
            replace: () => ({})
        },
    }

    it('methods.searchHandler', async () => {
        const wrapper = shallowMount(BoPage, {
            propsData: {
                formOptions: {
                    forms: []
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
        })
        wrapper.vm.searchHandler()
        expect(wrapper.emitted('update:loading')[0]).toEqual([true])
        const result = [{
            "limit": 20,
            "skip": 0
        }]
        expect(wrapper.emitted('search')[0]).toEqual(result)
    })

    it('methods.excelHandler', async () => {
        const wrapper = shallowMount(BoPage, {
            propsData: {
                formOptions: {
                    forms: []
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
        })
        wrapper.vm.excelHandler()
        const result = [{
            "limit": 10000,
            "skip": 0
        }]
        expect(wrapper.emitted('excel')[0]).toEqual(result)
    })

    it('methods.autoHeight', async () => {
        const wrapper = mount(BoPage, {
            propsData: {
                formOptions: {
                    forms: []
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
            mocks: mocksData
        })
        let windowSpy = jest.spyOn(window, "window", "get");
        windowSpy.mockImplementation(() => ({
            innerHeight: 500
        }));
        wrapper.vm.autoHeight()
        expect(wrapper.vm.height).toBe('730px')
    })

    it('methods.autoSearch', async () => {
        const searchFormStub = {
            render: () => ({}),
            methods: {
                searchHandler: () => ({})
            }
        }
        const wrapper = mount(BoPage, {
            propsData: {
                formOptions: {
                    forms: []
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
            mocks: mocksData,
            stubs: {
                'searchForm': searchFormStub
            }
        })
        wrapper.vm.$refs.searchForm.searchHandler = jest.fn()
        wrapper.vm.autoSearch()
        expect(wrapper.vm.$refs.searchForm.searchHandler).toHaveBeenCalled()
    })

    it('methods.sortChange', async () => {
        const wrapper = mount(BoPage, {
            propsData: {
                formOptions: {
                    forms: []
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
            mocks: mocksData,
        })
        wrapper.vm.searchHandler = jest.fn()
        const result = {
            order: 'order',
            prop: 'prop'
        }
        wrapper.vm.sortChange(result)
        expect(wrapper.vm.sort).toEqual(result)
        expect(wrapper.vm.searchHandler).toHaveBeenCalled()
    })

    it('methods.setChartOptions', async () => {
        const wrapper = shallowMount(BoPage, {
            propsData: {
                formOptions: {
                    forms: []
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
        })
        wrapper.vm.setChartOptions()
        const result = {
            "type": "",
            "chartData": null,
            "visible": false
        }
        expect(wrapper.vm.chartOptions).toEqual(result)
    })

    it('methods.toggleChart', async () => {
        const wrapper = shallowMount(BoPage, {
            propsData: {
                formOptions: {
                    forms: []
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
        })
        wrapper.vm.toggleChart()
        expect(wrapper.vm.chartOptions.visible).toBe(true)
    })

    it('mounted', async () => {
        const mockMethod1 = jest.spyOn(BoPage.methods, 'autoHeight')
        const mockMethod2 = jest.spyOn(BoPage.methods, 'setChartOptions')
        const wrapper = shallowMount(BoPage, {
            propsData: {
                formOptions: {
                    forms: [],
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
        })
        wrapper.vm.$nextTick(() => {
            expect(mockMethod1).toHaveBeenCalled()
            expect(mockMethod2).toHaveBeenCalled()
        });
    })

    it('watch.tableOptions', async () => {
        const wrapper = shallowMount(BoPage, {
            propsData: {
                formOptions: {
                    forms: [],
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
        })
        wrapper.setProps({
            tableOptions: {}
        })
        wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted('update:loading')[0]).toEqual([false])
        })
    })

    it('watch.tabs', async () => {
        const wrapper = shallowMount(BoPage, {
            propsData: {
                formOptions: {
                    forms: [],
                },
                tips: [],
                columns: [],
                tableOptions: {}
            },
        })
        wrapper.setProps({
            tabs: []
        })
        wrapper.vm.$nextTick(() => {
            expect(wrapper.emitted('update:loading')[0]).toEqual([false])
        })
    })

})