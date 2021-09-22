export const pickerOptionsData = (formItems) => {
    let parseTime = function (time, cFormat) {
        if (arguments.length === 0) {
            return null;
        }
        const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
        let date;
        if (typeof time === "object") {
            date = time;
        } else {
            if (typeof time === "string" && /^[0-9]+$/.test(time)) {
                time = parseInt(time);
            }
            if (typeof time === "number" && time.toString().length === 10) {
                time = time * 1000;
            }
            date = new Date(time);
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay(),
        };
        const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
            const value = formatObj[key];
            // Note: getDay() returns 0 on Sunday
            if (key === "a") {
                return ["日", "一", "二", "三", "四", "五", "六"][value];
            }
            return value.toString().padStart(2, "0");
        });
        return time_str;
    };

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
        } else if (v.itemType === "multSelect") {
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