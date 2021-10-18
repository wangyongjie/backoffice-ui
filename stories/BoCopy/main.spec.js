import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoCopy from '../../packages/BoCopy/src/main.vue'


describe('BoCopy', () => {
    it('methods.copy', async () => {
        const wrapper = shallowMount(BoCopy, {
            slots: {
                default: 'copy text'
            },
        })
        document.execCommand = jest.fn();
        wrapper.vm.copy()
        expect(document.execCommand).toHaveBeenCalledWith("copy");
    });
});