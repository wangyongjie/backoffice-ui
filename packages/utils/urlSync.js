const getParams = () => {
    if (location.hash) {
        const hash = location.hash.replace(/[#/]/g, '')
        return new URLSearchParams(hash)
    } else {
        return new URL(location.href).searchParams;
    }
}

const setParams = (searchParams) => {
    let url = new URL(location.href);
    if (location.hash) {
        url.hash = String(searchParams);
        history.replaceState(null, null, url.href);
        window.dispatchEvent(new Event("popstate"));
    } else {
        url.search = String(searchParams);
        history.pushState(null, null, url.href);
        window.dispatchEvent(new Event("popstate"));
    }
}

const isNumeric = (num) => {
    return !isNaN(num)
}

export const urlSync = {
    getParamsFromUrl: () => {
        const params = getParams();
        const result = {}
        for (const [key, value] of params) {
            let decoded = value
            try {
                decoded = JSON.parse(decodeURIComponent(decoded))
            } catch (error) {
                console.error('urlSync error ', error)
            }
            result[key] = isNumeric(decoded) ? +decoded : decoded
        }
        return result
    },
    addParamsToUrl: (params, resetAll) => {
        const searchParams = resetAll ? new URLSearchParams() : getParams();
        params.forEach(([key, value]) => {
            if (!value) {
                return
            }
            const encoded = encodeURIComponent( JSON.stringify(value) )
            searchParams.set(key, encoded)
        });
        setParams(searchParams)
    },
}