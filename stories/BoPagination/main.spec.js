import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoPagination from '../../packages/BoPagination/src/main.vue'


describe('BoPagination', () => {

    it('computed.currentPage', async () => {
        const wrapper = shallowMount(BoPagination, {
            propsData: {
                total: 0,
                page: 1,
                limit: 20,
                disabled: false
            },
        })
        expect(wrapper.vm.currentPage).toBe(1)
        wrapper.vm.currentPage = 20
        expect(wrapper.emitted('update:page')[0]).toEqual([20])
    })

    it('computed.pageSize', async () => {
        const wrapper = shallowMount(BoPagination, {
            propsData: {
                total: 0,
                page: 1,
                limit: 20,
                disabled: false
            },
        })
        expect(wrapper.vm.pageSize).toBe(20)
        wrapper.vm.pageSize = 10
        expect(wrapper.emitted('update:limit')[0]).toEqual([10])
    })

    it('methods.handleSizeChange', async () => {
        const wrapper = shallowMount(BoPagination, {
            propsData: {
                total: 0,
                page: 1,
                limit: 20,
                disabled: false
            },
        })
        wrapper.vm.handleSizeChange()
        expect(wrapper.emitted('pagination')).toBeTruthy()
    })

    it('methods.handleCurrentChange', async () => {
        const wrapper = shallowMount(BoPagination, {
            propsData: {
                total: 0,
                page: 1,
                limit: 20,
                disabled: false
            },
        })
        wrapper.vm.handleCurrentChange()
        expect(wrapper.emitted('pagination')).toBeTruthy()
    })



})