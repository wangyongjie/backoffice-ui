import {
    shallowMount
} from '@vue/test-utils'
import BoTable from '../../packages/BoTable/src/main.vue'


const testProps = {
    columns: [{
        prop: "id",
        label: "Id",
    }, {
        prop: "a",
        label: "A",
    }, {
        prop: "b",
        label: "B",
    }, {
        prop: "c",
        label: "C",
    }, ],
    data: [{
            id: 1,
            a: 10,
            b: 'text',
            c: 15
        },
        {
            id: 2,
            a: 15,
            b: 'text',
            c: 5
        },
        {
            id: 3,
            a: 30,
            b: 'text',
            c: 10
        },
    ],
}

describe('BoTable', () => {

    it('watch.data without summary', async () => {
        const wrapper = shallowMount(BoTable, {
            propsData: testProps
        })
        const result = [...testProps.data]
        expect(wrapper.vm.extraData).toStrictEqual(result)
    })

    it('watch.data with summary', async () => {
        const wrapper = shallowMount(BoTable, {
            propsData: {
                ...testProps,
                summary: 'sum',
            }
        })
        const summary = {
            "a": 55,
            "b": "-",
            "c": 30,
            "id": "Sum",
        }
        const result = [summary, ...testProps.data]

        expect(wrapper.vm.extraData).toStrictEqual(result)
    })


    it('$emit sort-change', async () => {
        const wrapper = shallowMount(BoTable)
        wrapper.vm.$emit('sort-change')
        wrapper.vm.$emit('sort-change', 123)

        await wrapper.vm.$nextTick()
        expect(wrapper.emitted('sort-change')).toBeTruthy()
        expect(wrapper.emitted('sort-change').length).toBe(2)
    })

    describe('methods.getSummaries', () => {
        it('avg precision default', async () => {
            const wrapper = shallowMount(BoTable, {
                propsData: {
                    ...testProps,
                    summary: 'avg',
                }
            })
            const summary = {
                "a": '18',
                "b": "-",
                "c": '10',
                "id": "Avg",
            }
            const result = [summary, ...testProps.data]
    
            expect(wrapper.vm.extraData).toStrictEqual(result)
        })

        it('avg precision 2', async () => {
            const wrapper = shallowMount(BoTable, {
                propsData: {
                    ...testProps,
                    summary: {
                        type: 'avg',
                        precision: 2
                    },
                }
            })
            const summary = {
                "a": '18.33',
                "b": "-",
                "c": '10.00',
                "id": "Avg",
            }
            const result = [summary, ...testProps.data]
    
            expect(wrapper.vm.extraData).toStrictEqual(result)
        })

        it('avg excludeProps', async () => {
            const wrapper = shallowMount(BoTable, {
                propsData: {
                    ...testProps,
                    summary: {
                        type: 'avg',
                        precision: 2,
                        excludeProps: ['c']
                    },
                }
            })
            const summary = {
                "a": '18.33',
                "b": "-",
                "c": '-',
                "id": "Avg",
            }
            const result = [summary, ...testProps.data]
    
            expect(wrapper.vm.extraData).toStrictEqual(result)
        })
    })


})