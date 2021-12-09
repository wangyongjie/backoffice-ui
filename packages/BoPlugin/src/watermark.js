export const watermark = (props = {}) => {
    const {
        container = document.body,
            width = '220px',
            height = '110px',
            textAlign = 'center',
            textBaseline = 'middle',
            font = "18px Microsoft Yahei",
            fillStyle = 'rgba(184, 184, 184, 0.2)',
            content,
            rotate = '-25',
            zIndex = 4000
    } = props
    // eslint-disable-next-line no-undef
    const args = arguments[0];
    const canvas = document.createElement('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(content, parseFloat(width) / 4, parseFloat(height) * 0.75);

    const base64Url = canvas.toDataURL();
    const __wm = document.querySelector('.__wm');

    const watermarkDiv = __wm || document.createElement("div");
    const styleStr = `
    position:absolute;
    top:0px;
    left:0;
    width:100%;
    height:100%;
    z-index:${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background-image:url('${base64Url}')`;

    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('__wm');

    if (!__wm) {
        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);
    }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        let mo = new MutationObserver(function () {
            const __wm = document.querySelector('.__wm');
            // The watermark is recalled only when the __wm element changes
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                // Avoid triggering all the time
                mo.disconnect();
                mo = null;
                watermark(JSON.parse(JSON.stringify(args)));
            }
        });

        mo.observe(container, {
            attributes: true,
            subtree: true,
            childList: true
        })
    }

}