import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoSelectDate from '../../packages/BoSelectDate/src/main.vue'


describe('BoSelectDate', () => {
    it('computed.periodType', async () => {
        const wrapper = shallowMount(BoSelectDate, {
            propsData: {
                value: '20210701',
                periodName: 'date_period',
                periodRange: ['daily', 'week', 'month', 'year'],
                periodValue: 'daily',
            },
        })
        expect(wrapper.vm.periodType).toBe('daily');
        expect(wrapper.emitted('update:period')[0]).toEqual(['daily'])
    })

    it('watch.dateValue', async () => {
        const mockMethod = jest.spyOn(BoSelectDate.methods, 'setValue')
        const wrapper = shallowMount(BoSelectDate, {
            propsData: {
                value: '20210701',
                periodName: 'date_period',
                periodRange: ['daily', 'week', 'month', 'year'],
                periodValue: 'daily',
            },
        })
        wrapper.vm.dateValue = '202100801'
        wrapper.vm.$nextTick(()=> {
            expect(mockMethod).toBeCalled();
        })
    })

    it('created', async () => {
        const mockMethod = jest.spyOn(BoSelectDate.methods, 'setValue')
        const wrapper = shallowMount(BoSelectDate, {
            propsData: {
                value: '20210701',
                periodName: 'date_period',
                periodRange: ['daily', 'week', 'month', 'year'],
                periodValue: 'daily',
            },
        })
        wrapper.vm.$nextTick(()=> {
            expect(mockMethod).toBeCalled();
            expect(wrapper.emitted('update:period')[0]).toEqual(['daily'])
        })
    })

    it('methods.setValue', async () => {
        const wrapper = shallowMount(BoSelectDate, {
            propsData: {
                value: '20210701',
                periodName: 'date_period',
                periodRange: ['daily', 'week', 'month', 'year'],
                periodValue: 'daily',
            },
        })
        wrapper.vm.setValue()
        expect(wrapper.emitted('update:period')[0]).toEqual(["daily"])
    })


    it('methods.transforDate', async () => {
        const wrapper = shallowMount(BoSelectDate, {
            propsData: {
                value: '20210701',
                periodName: 'date_period',
                periodRange: ['daily', 'week', 'month', 'year'],
                periodValue: 'daily',
            },
        })
        expect(wrapper.vm.transforDate('daily', '20210701')).toEqual('20210701')
        expect(wrapper.vm.transforDate('week', '20210701')).toEqual('20210627')
        expect(wrapper.vm.transforDate('month', '20210701')).toEqual('202107')
        expect(wrapper.vm.transforDate('year', '20210701')).toEqual('2021')
    })
})