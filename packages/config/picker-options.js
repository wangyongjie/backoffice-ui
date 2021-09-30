import { parseTime } from '../utils/index'

export const pickerOptionsData = (formItems) => {
    let params = {};
    let pickerOptions = {
        shortcuts: [{
                text: "Today",
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
    formItems.forEach((v) => {
        if (v.itemType === "daterange") {
            // 设置了默认值
            if(v.dayRange) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * (v.dayRange - 1));
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
                        pickerOptions.shortcuts.push({
                            text: "All Time",
                            onClick(picker) {
                                picker.$emit("pick", ['', '']);
                            },
                        })
                    }
                    if(typeof v.pickerOptions.shortcuts === 'object') {
                        pickerOptions.shortcuts = v.pickerOptions.shortcuts
                    }
                }
            }

            pickerOptions = { ...v.pickerOptions, ...pickerOptions }
        } else if (v.itemType === "selectDate") {
            params[v.prop] = v.value; // 设置默认值
            v.periodName = v.periodName || (v.prop + '_period');
            // 判断名称是否已经被使用
            if(formItems.some(i => i.prop === v.periodName)) {
                throw('该名称：' + v.periodName + ' 已被使用, 请检查配置');
            }else {
                params[v.periodName] = v.periodValue;
            }
        }else if (v.itemType === "multSelect") {
            params[v.prop] = v.value || ["_all_"];
        } else {
            params[v.prop] = v.value || "";
        }
    });

    return {
        params,
        pickerOptions
    }
}