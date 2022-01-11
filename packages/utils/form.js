export const checkFormPropsDuplicates = (forms) => {
    const propList = forms
        .filter((x) => x.itemType !== "selectInput")
        .map((x) => x.prop);
    const selectInputList = forms.filter((x) => x.itemType === "selectInput");
    selectInputList.forEach((x) => {
        x.options.forEach((y) => {
            propList.push(y.value);
        });
    });
    return new Set(propList).size !== propList.length
};

// reset filed by type
export const resetField = (value) => {
    if (Array.isArray(value)) {
        return [];
    }
    const type = (typeof value).toLowerCase();
    const typeDefault = {
        boolean: false,
        number: 0,
        string: "",
    };
    return typeDefault[type];
};

export const resetForm = (model, params, firstModel) => {
    const clonedModel = JSON.parse(JSON.stringify(firstModel))
    Object.keys(model).forEach((key) => {
        model[key] =  params[key] || (clonedModel[key] ?? resetField(model[key]))
    })
}

export const parseCurrencyModel = (model, formItems) => {
    const currencyPropList = formItems
        .filter((x) => x.itemType === "currency")
        .map((x) => x.prop);
    currencyPropList.forEach((prop) => {
        model[prop] = parseInt(model[prop]);
    });
}

export const resetNotExistModel = (model, formItems) => {
    const notExistPropList = formItems
        .filter((x) => x.isExist !== undefined && !x.isExist)
        .map((x) => x.prop);
    notExistPropList.forEach((prop) => {
        model[prop] = resetField(model[prop]);
    });
}