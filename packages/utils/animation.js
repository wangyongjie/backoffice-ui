// ref: https://stackoverflow.com/questions/35531629/vuejs-animate-number-changes
export const animationNumber = {
    template: `<span>{{ displayNumber }}</span>`,
    props: {
        'number': {
            default: 0
        }
    },
    data() {
        return {
            displayNumber: 0,
            interval: false
        }
    },
    mounted() {
        this.displayNumber = this.number ? this.number : 0;
    },
    watch: {
        number: {
            immediate: true,
            handler() {
                clearInterval(this.interval);

                if (this.number == this.displayNumber) {
                    return;
                }

                this.interval = window.setInterval(() => {
                    if (this.displayNumber != this.number) {
                        let change = (this.number - this.displayNumber) / 10;
                        change = change >= 0 ? Math.ceil(change) : Math.floor(change);
                        this.displayNumber = this.displayNumber + change;
                    }
                }, 20);
            }
        }
    }
}