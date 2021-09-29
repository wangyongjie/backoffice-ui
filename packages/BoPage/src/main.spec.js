import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoPage from './main.vue'


describe('BoPage', () => {
    let mocksData = {
        $route: {
            query: {}
        },
        $router: {
            replace: () => {}
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
        const result = {"columns": [], "tableOptions": {}, "visible": false}
        expect(wrapper.vm.chartOptions).toEqual(result)
    })

})