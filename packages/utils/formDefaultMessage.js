const setDefaultMessage = (rules, msg) => {
    for (let i = 0; i < rules.length; i++) {
        rules[i].message = rules[i].message || msg;
    }
};

export const setFormMsg = (form, msg) => {
    if (!form.rules) {
        return
    }
    Object.keys(form.rules).forEach(key => {
        setDefaultMessage(form.rules[key], msg);
    })
}

export const setFormItemsMsg = (formItems, msg) => {
    for (let i = 0; i < formItems.length; i++) {
        if (formItems[i].rules) {
            setDefaultMessage(formItems[i].rules, msg);
        }
    }
}