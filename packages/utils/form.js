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