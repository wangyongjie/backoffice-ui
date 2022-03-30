import { parseTime } from '../utils/index'

export const pickerOptionsData = (formItems) => {
    let params = {};
    let pickerOptions = {
        shortcuts: [{
                text: "Today",
                rangeDays: 1, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 7 Days",
                rangeDays: 7, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 15 Days",
                rangeDays: 15, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 30 Days",
                rangeDays: 30, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 90 Days",
                rangeDays: 90, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            }
        ],
    }
    // 忽略今天的快捷项配置
    let pickerOptions2 = {
        shortcuts: [{
                text: "Yesterday",
                rangeDays: 1, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 7 Days",
                rangeDays: 7, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 15 Days",
                rangeDays: 15, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 30 Days",
                rangeDays: 30, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            },
            {
                text: "Past 90 Days",
                rangeDays: 90, // custom field for 'maxRangeDays' to filter
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [
                        parseTime(start, "{y}{m}{d}"),
                        parseTime(end, "{y}{m}{d}"),
                    ]);
                },
            }
        ],
        disabledDate: function(date) {
            return date.getTime() > (new Date()).getTime() - 3600 * 1000 * 24 * 1
        }
    }
    let timeRangePickerOptions = (defaultTime) => ({
        shortcuts: [{
                text: "Today",
                rangeDays: 1,
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                    picker.$emit("pick", [
                        defaultTime ? (new Date(parseTime(start, "{y}-{m}-{d}") + ' ' + defaultTime[0])).getTime() : start.getTime(),
                        defaultTime ? (new Date(parseTime(end, "{y}-{m}-{d}") + ' ' + defaultTime[1])).getTime() : end.getTime()
                    ]);
                },
            },
            {
                text: "Past 7 Days",
                rangeDays: 7,
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", [
                        defaultTime ? (new Date(parseTime(start, "{y}-{m}-{d}") + ' ' + defaultTime[0])).getTime() : start.getTime(),
                        defaultTime ? (new Date(parseTime(end, "{y}-{m}-{d}") + ' ' + defaultTime[1])).getTime() : end.getTime()
                    ]);
                },
            },
            {
                text: "Past 15 Days",
                rangeDays: 15,
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                    picker.$emit("pick", [
                        defaultTime ? (new Date(parseTime(start, "{y}-{m}-{d}") + ' ' + defaultTime[0])).getTime() : start.getTime(),
                        defaultTime ? (new Date(parseTime(end, "{y}-{m}-{d}") + ' ' + defaultTime[1])).getTime() : end.getTime()
                    ]);
                },
            },
            {
                text: "Past 30 Days",
                rangeDays: 30,
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit("pick", [
                        defaultTime ? (new Date(parseTime(start, "{y}-{m}-{d}") + ' ' + defaultTime[0])).getTime() : start.getTime(),
                        defaultTime ? (new Date(parseTime(end, "{y}-{m}-{d}") + ' ' + defaultTime[1])).getTime() : end.getTime()
                    ]);
                },
            },
            {
                text: "Past 90 Days",
                rangeDays: 90,
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit("pick", [
                        defaultTime ? (new Date(parseTime(start, "{y}-{m}-{d}") + ' ' + defaultTime[0])).getTime() : start.getTime(),
                        defaultTime ? (new Date(parseTime(end, "{y}-{m}-{d}") + ' ' + defaultTime[1])).getTime() : end.getTime()
                    ]);
                },
            },
            {
                text: "All Time",
                rangeDays: 36500,
                onClick(picker) {
                    picker.$emit("pick", '');
                },
            }
        ],
    })
    let monthPickerOptions = {
        shortcuts: [{
            text: 'This Month',
            onClick(picker) {
                picker.$emit('pick', [
                    parseTime(new Date(), "{y}{m}"),
                    parseTime(new Date(), "{y}{m}"),
                ]);
            }
            }, {
            text: 'This Year',
            onClick(picker) {
                const end = new Date();
                const start = new Date(new Date().getFullYear(), 0);
                picker.$emit('pick', [
                    parseTime(start, "{y}{m}"),
                    parseTime(end, "{y}{m}"),
                ]);
            }
            }, {
            text: 'Past 6 Months',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - 5);
                picker.$emit('pick', [
                    parseTime(start, "{y}{m}"),
                    parseTime(end, "{y}{m}"),
                ]);
            }
            }, {
            text: 'All Time',
            onClick(picker) {
                picker.$emit("pick", "");
            },
        }]
    }
    formItems.forEach((v) => {
        if (v.itemType === "daterange") {
            // 设置了默认值
            if(v.dayRange) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * (v.dayRange - 1));

                if(v.ignoreToday) {
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
                }
                params[v.prop] = [
                    parseTime(start, "{y}{m}{d}"),
                    parseTime(end, "{y}{m}{d}"),
                ];
            }
            if(v.value) {
                params[v.prop] = v.value
            }

            //表示展示了默认选项
            if(v.pickerOptions) {
                if(v.pickerOptions.shortcuts) {
                    if((typeof v.pickerOptions.shortcuts === 'string') && v.pickerOptions.shortcuts === 'all') {
                        v.pickerOptions.shortcuts = [ ...(v.ignoreToday ? pickerOptions2.shortcuts : pickerOptions.shortcuts) ]
                        v.pickerOptions.shortcuts.push({
                            text: "All Time",
                            onClick(picker) {
                                picker.$emit("pick", ['', '']);
                            },
                        })
                    }
                }
            }else {
                v.pickerOptions = v.ignoreToday ? pickerOptions2 : pickerOptions
            }

            // filter by maxRangeDays
            if (v.maxRangeDays) {
                v.pickerOptions.shortcuts = v.pickerOptions.shortcuts.filter(x => {
                    return x.rangeDays <= v.maxRangeDays
                })
            }
        } else if (v.itemType === "datetimerange") {
            
            params[v.prop] = v.value || '';

            // 设置了默认值
            if(v.dayRange) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * (v.dayRange));
                params[v.prop] = [
                    start.getTime(),
                    end.getTime(),
                ];

                if(v.defaultTime) {
                    params[v.prop] = [
                        (new Date(parseTime(start, "{y}-{m}-{d}") + ' ' + v.defaultTime[0])).getTime(),
                        (new Date(parseTime(end, "{y}-{m}-{d}") + ' ' + v.defaultTime[1])).getTime()
                    ];
                }
                if(!v.pickerOptions) {
                    v.pickerOptions = timeRangePickerOptions(v.defaultTime)
                    // filter by maxRangeDays
                    if (v.maxRangeDays) {
                        v.pickerOptions.shortcuts = v.pickerOptions.shortcuts.filter(x => {
                            return x.rangeDays <= v.maxRangeDays
                        })
                    }
                }
            }
            if(v.value) {
                params[v.prop] = v.value
            }
        } else if (v.itemType === "monthrange") {
            // 设置了默认值
            if (v.range !== undefined) {
                const end = new Date();
                const start = new Date();
                start.setMonth(start.getMonth() - v.range + 1);
                params[v.prop] = [
                    parseTime(start, "{y}{m}"),
                    parseTime(end, "{y}{m}"),
                ];
            } else {
                params[v.prop] = v.value || "";
            }
        } else if (v.itemType === "selectDate") {
            params[v.prop] = v.value; // 设置默认值
            v.periodName = v.periodName || (v.prop + '_period');
            // 判断名称是否已经被使用
            if(formItems.some(i => i.prop === v.periodName)) {
                throw('该名称：' + v.periodName + ' 已被使用, 请检查配置');
            }else {
                params[v.periodName] = v.periodValue;
            }
        } else if (v.itemType === "multSelect") {
            params[v.prop] = v.value || (v.isEmpty ? [] : ["_all_"]);
        } else if (v.itemType === "datetime") {
            
            params[v.prop] = v.value || "";

            // 设置了默认值
            if(v.offset) {
                params[v.prop] = parseTime(Date.now() + parseInt(v.offset) * 1000, v.cFormat);
            }
        } else if (v.itemType === "date") {
            
            params[v.prop] = v.value || "";

            // 设置了默认值
            if(v.offset !== undefined) {
                params[v.prop] = parseTime(Date.now() + parseInt(v.offset) * 86400000, v.cFormat || '{y}{m}{d}');
            }
        } else {
            params[v.prop] = (v.value !== undefined && v.value !== null) ? v.value : "";
        }
    });

    return {
        params,
        pickerOptions,
        monthPickerOptions
    }
}