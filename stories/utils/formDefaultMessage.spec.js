import {
    setFormMsg,
    setFormItemsMsg
} from '../../packages/utils/formDefaultMessage'

describe('formDefaultMessage', () => {
    it('setFormMsg ', () => {
        const form = {
            rules: {
                name: [{
                        required: true,
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        trigger: 'blur'
                    }
                ],
                region: [{
                    required: true,
                    trigger: 'change'
                }],
                date1: [{
                    type: 'date',
                    required: true,
                    message: 'Please pick a date',
                    trigger: 'change'
                }],
                date2: [{
                    type: 'date',
                    required: true,
                    message: 'Please pick a time',
                    trigger: 'change'
                }],
                type: [{
                    type: 'array',
                    required: true,
                    message: 'Please select at least one activity type',
                    trigger: 'change'
                }],
                resource: [{
                    required: true,
                    message: 'Please select activity resource',
                    trigger: 'change'
                }],
                desc: [{
                    required: true,
                    message: 'Please input activity form',
                    trigger: 'blur'
                }]
            }

        }
        setFormMsg(form, 'msg')
        const result = {
            "date1": [{
                "message": "Please pick a date",
                "required": true,
                "trigger": "change",
                "type": "date"
            }],
            "date2": [{
                "message": "Please pick a time",
                "required": true,
                "trigger": "change",
                "type": "date"
            }],
            "desc": [{
                "message": "Please input activity form",
                "required": true,
                "trigger": "blur"
            }],
            "name": [{
                "message": "msg",
                "required": true,
                "trigger": "blur"
            }, {
                "max": 5,
                "message": "msg",
                "min": 3,
                "trigger": "blur"
            }],
            "region": [{
                "message": "msg",
                "required": true,
                "trigger": "change"
            }],
            "resource": [{
                "message": "Please select activity resource",
                "required": true,
                "trigger": "change"
            }],
            "type": [{
                "message": "Please select at least one activity type",
                "required": true,
                "trigger": "change",
                "type": "array"
            }]
        }
        expect(form.rules).toEqual(result)
    });

    it('setFormItemsMsg ', () => {
        const formItems = [{
                prop: 'name',
                rules: [{
                        required: true,
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        trigger: 'blur'
                    }
                ],
            },
            {
                prop: 'region',
                rules: [{
                    required: true,
                    trigger: 'change'
                }],
            },
            {
                prop: 'date1',
                rules: [{
                    type: 'date',
                    required: true,
                    message: 'Please pick a date',
                    trigger: 'change'
                }],
            },
            {
                prop: 'date2',
                rules: [{
                    type: 'date',
                    required: true,
                    message: 'Please pick a time',
                    trigger: 'change'
                }],
            },
            {
                prop: 'type',
                rules: [{
                    type: 'array',
                    required: true,
                    message: 'Please select at least one activity type',
                    trigger: 'change'
                }],
            },
            {
                prop: 'resource',
                rules: [{
                    required: true,
                    message: 'Please select activity resource',
                    trigger: 'change'
                }],
            },
            {
                prop: 'desc',
                rules: [{
                    required: true,
                    message: 'Please input activity form',
                    trigger: 'blur'
                }]
            },
        ]
        setFormItemsMsg(formItems)
        const result = [{
            "prop": "name",
            "rules": [{
                "message": undefined,
                "required": true,
                "trigger": "blur"
            }, {
                "max": 5,
                "message": undefined,
                "min": 3,
                "trigger": "blur"
            }]
        }, {
            "prop": "region",
            "rules": [{
                "message": undefined,
                "required": true,
                "trigger": "change"
            }]
        }, {
            "prop": "date1",
            "rules": [{
                "message": "Please pick a date",
                "required": true,
                "trigger": "change",
                "type": "date"
            }]
        }, {
            "prop": "date2",
            "rules": [{
                "message": "Please pick a time",
                "required": true,
                "trigger": "change",
                "type": "date"
            }]
        }, {
            "prop": "type",
            "rules": [{
                "message": "Please select at least one activity type",
                "required": true,
                "trigger": "change",
                "type": "array"
            }]
        }, {
            "prop": "resource",
            "rules": [{
                "message": "Please select activity resource",
                "required": true,
                "trigger": "change"
            }]
        }, {
            "prop": "desc",
            "rules": [{
                "message": "Please input activity form",
                "required": true,
                "trigger": "blur"
            }]
        }]
        expect(formItems).toEqual(result)
    });
});