const isNumeric = (num) => num && !isNaN(num)

const numberFormat = (value) => {
    // - 支持货币和千分位的联合转换
    // 123456 转换成 1,234.56 ，如没有，默认为0

    if (isNumeric(value)) {
        value = value.toString();
        return value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    } else {
        return 0;
    }
}

const currencyFormat = (value) => {
    const isNumeric = (num) => num && !isNaN(num)
    // ex: 123124 转换成 1231.24， 如没有，默认为0
    if (isNumeric(value)) {
        return +value / 100;
    } else {
        return 0;
    }
}

const dateFormat = (value) => {
    if (typeof value === 'number') {
        value += ''
    }
    if ((typeof value === 'string' || value instanceof String)) {
        // ex: 20211221 转换成 2021/12/21
        if (value.length === 8) {
            return `${value.substr(0, 4)}/${value.substr(4, 2)}/${value.substr(6, 2)}`
        } else if (value.length === 10) {
            // ex: 1635218799 转换成 2021/10/26 11:26:39
            const date = new Date(value * 1000);
            return new Intl.DateTimeFormat('zh', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(date)
        } else if (value.indexOf('-') > -1) {
            // ex: 2022-03-08 18:08:35 转换成 2022/03/08 18:08:35
            return value.replace(/-/g, '/')
        } else {
            return '-';
        }
    } else {
        return '-';
    }
}

// value support number, Array<number>
const cardFormat = (value) => {
    const cardsString = (c) => {
        const suitIndex = Math.floor(c / 256)
        // Suit: c / 256
        const suitMap = {
            1: "♦",
            2: "♣",
            3: "♥",
            4: "♠",
        }
        const seqIndex = (c % 256) - 2
        // Point: c % 256, Index: Point-2 
        const seq = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        return `${suitMap[suitIndex]}${seq[seqIndex]}`
    }

    if (Array.isArray(value)) {
        return value.map(x => cardsString(x)).join(' ')
    } else if (isNumeric(value)) {
        return cardsString(value)
    } else {
        return '-';
    }
}


export const BoFilter = (value, format) => {
    const formatter = (format, value) => {
        switch (format) {
            case 'number':
                return numberFormat(value)
            case 'currency':
                return currencyFormat(value)
            case 'date':
                return dateFormat(value)
            case 'card':
                return cardFormat(value)
            default:
                return value
        }
    }
    const multipleFormatters = format.split('|').map(x => x.trim())

    if (multipleFormatters.length > 1) {
        return multipleFormatters.reduce((pre, cur) => {
            pre = formatter(cur, pre)
            return pre
        }, value)

    } else {
        return formatter(format, value)
    }

}