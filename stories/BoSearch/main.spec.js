import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoSearch from '../../packages/BoSearch/src/main.vue'


describe('BoSearch', () => {
    let mocksData = {
        $route: {
            query: {}
        },
        $router: {
            replace: () => ({})
        },
    }

    it('methods.searchHandler', async () => {
        const addParamsToUri = jest.spyOn(BoSearch.methods, 'addParamsToUri')
        const wrapper = mount(BoSearch, {
            propsData: {
                labelWidth: '100px',
                itemWidth: '100px',
                loading: false,
                submitBtnText: "Search",
                forms: [],
            },
            mocks: mocksData
        })
        wrapper.vm.searchHandler()
        // expect(addParamsToUri).toHaveBeenCalled();
        expect(wrapper.emitted('search')[0]).toEqual([{}])
    })

    it('methods.excelHandler', async () => {
        const wrapper = mount(BoSearch, {
            propsData: {
                labelWidth: '100px',
                itemWidth: '100px',
                loading: false,
                submitBtnText: "Search",
                forms: [],
            },
            mocks: mocksData
        })
        wrapper.vm.excelHandler()
        expect(wrapper.emitted('excel')[0]).toEqual([{}])
    })

    it('methods.validateDateRange', async () => {
        const wrapper = mount(BoSearch, {
            propsData: {
                labelWidth: '100px',
                itemWidth: '100px',
                loading: false,
                submitBtnText: "Search",
                forms: [{
                    prop: "daterange",
                    label: "Daterange:",
                    itemType: "daterange",
                    maxRangeDays: 31,
                    pastDays: 1,
                }]
            },
            mocks: mocksData
        })
        expect(wrapper.vm.validateDateRange()).toBe(true)
        wrapper.setData({
            params: {
                daterange: ['20210101', '20210301']
            }
        })
        expect(wrapper.vm.validateDateRange()).toBe(false)

    })

    it('methods.getParamsFromUrl', async () => {
        const wrapper = mount(BoSearch, {
            propsData: {
                labelWidth: '100px',
                itemWidth: '100px',
                loading: false,
                submitBtnText: "Search",
                forms: [{
                        prop: 'arr1',
                        itemType: 'multSelect'
                    }, {
                        prop: 'arr2',
                        itemType: 'multSelect'
                    },
                    {
                        "itemType": "selectInput",
                        "selectName": "selectType",
                        "prop": "uids",
                        "options": [{
                                "value": "uids",
                                "label": "UID"
                            },
                            {
                                "value": "names",
                                "label": "Names"
                            }
                        ],
                        "urlSync": true
                    },
                ],
            },
            mocks: {
                ...mocksData,
                $route: {
                    query: {
                        arr1: '1',
                        arr2: ['2', '3'],
                        number3: '4',
                        selectType: 'names',
                        names: '1234'
                    }
                },
            }
        })
        wrapper.vm.getParamsFromUrl()
        const result = {
            "arr1": [1],
            "arr2": [2, 3],
            "number3": 4,
            "names": "1234",
            "selectType": "names",
            "uids": "",
        }
        expect(wrapper.vm.params).toEqual(result)
    })


    it('methods.addParamsToUri', async () => {
        const replace = jest.fn()
        const wrapper = mount(BoSearch, {
            propsData: {
                labelWidth: '100px',
                itemWidth: '100px',
                loading: false,
                submitBtnText: "Search",
                forms: [{
                    prop: 'value1',
                    urlSync: true
                }, {
                    prop: 'value2',
                    urlSync: true
                }],
            },
            mocks: {
                ...mocksData,
                $router: {
                    replace
                },
            }
        })
        const params = {
            value1: 'value1',
            value2: null
        }
        wrapper.vm.addParamsToUri(params)
        const result = {
            "query": {
                "value1": "value1"
            }
        }
        expect(replace).toHaveBeenCalledWith(result)
    })

    it('created', async () => {
        const mockMethod = jest.spyOn(BoSearch.methods, 'getParamsFromUrl')
        const wrapper = mount(BoSearch, {
            propsData: {
                labelWidth: '100px',
                itemWidth: '100px',
                loading: false,
                submitBtnText: "Search",
                forms: [],
            },
            mocks: mocksData
        })

        expect(mockMethod).toHaveBeenCalled()
    })

})