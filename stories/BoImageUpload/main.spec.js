import {
    shallowMount,
    mount
} from '@vue/test-utils'
import BoImageUpload from '../../packages/BoImageUpload/src/main.vue'


describe('BoImageUpload', () => {
    it('computed.image', async () => {
        let wrapper = shallowMount(BoImageUpload, {
            propsData: {
                value: {
                    src: 'src',
                    file: null
                }
            },
        })
        let result = {
            "src": "src",
            "file": null,
        }
        expect(wrapper.vm.image).toEqual(result)
    })

    it('methods.resetImage', async () => {
        let wrapper = shallowMount(BoImageUpload, {
            propsData: {
                value: {
                    src: 'src',
                    file: null
                }
            },
        })
        wrapper.vm.resetImage()
        let result = {
            "src": "",
            "file": null,
        }
        expect(wrapper.emitted('input')[0]).toEqual([result])
    })

    it('methods.uploadImage', async () => {
        let wrapper = shallowMount(BoImageUpload, {
            propsData: {
                value: {
                    src: 'src',
                    file: null
                }
            },
        })
        global.URL.createObjectURL = jest.fn((data)=> data);
        wrapper.vm.uploadImage({
            raw: null
        }, [null])
        let result = {
            "src": null,
            "file": null,
        }
        expect(wrapper.emitted('input')[0]).toEqual([result])
    })
})