// ref: https://andyyou.github.io/2015/04/07/get-an-element-s-position-by-js/
export const getPosition = (element) => {
    let x = 0;
    let y = 0;
    // 搭配上面的示意圖可比較輕鬆理解為何要這麼計算
    while (element) {
        x += element.offsetLeft - element.scrollLeft + element.clientLeft;
        y += element.offsetTop - element.scrollLeft + element.clientTop;
        // 這邊有個重點，當父元素被下了 position 屬性之後他就會變成 offsetParent，所以這邊我們用迴圈不斷往上累加。
        element = element.offsetParent;
    }
    return {
        x: x,
        y: y
    };
};