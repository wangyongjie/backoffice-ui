<template>
  <div>
    <el-select
      style="width:100px;margin-right:5px;"
      v-model="periodType"
      @change="setValue"
    >
      <el-option
        v-for="per in periodRange"
        :key="per"
        :value="per"
        :label="per.slice(0,1).toUpperCase() + per.slice(1)"
      ></el-option>
    </el-select>
    <el-date-picker
      v-if="periodType === 'week'"
      style="width: 160px"
      v-model="dateValue"
      type="week"
      :format="t('bo.selectData.weekFormat') || 'Week WW of yyyy'"
      value-format="yyyyMMdd"
      :clearable="false">
    </el-date-picker>
    <el-date-picker
      v-else-if="periodType === 'month'"
      style="width: 160px"
      v-model="dateValue"
      type="month"
      value-format="yyyyMMdd"
      :clearable="false">
    </el-date-picker>
    <el-date-picker
      v-else-if="periodType === 'year'"
      style="width: 160px"
      v-model="dateValue"
      type="year"
      value-format="yyyyMMdd"
      :clearable="false">
    </el-date-picker>
    <el-date-picker
      v-else
      style="width: 160px"
      v-model="dateValue"
      type="date"
      value-format="yyyyMMdd"
      :clearable="false">
    </el-date-picker>
  </div>
</template>

<script>
import locale from "../../BoLocale/mixins/locale";
import { parseTime } from '../../utils/index'

export default {
  name: "BoSelectDate",
  mixins: [locale],
  props: {
    /**
     * 用来传入时间默认值
     */
    value: {
      type: [String, Number],
      default: parseTime(new Date(), '{y}{m}{d}')
    },
    /**
     * 时间类型
     */
    period: {
      type: String,
      default: 'daily'
    },
    /**
     * 时间类型范围
     * 不允许自定义label
     */
    periodRange: {
      type: Array,
      default: () => (['daily', 'week', 'month', 'year'])
    },
  },
  data() {
    return {
      dateValue: this.value + ''  //可能为数字，要转为字符串
    }
  },
  computed: {
    periodType: {
      get() {
        return this.period;
      },
      set(val) {
        this.$emit("update:period", val);
      },
    },
  },
  watch: {
    dateValue: function(newValue) {
      this.setValue(this.periodType, newValue);
    }
  },
  created() {
    // 初始化传入的时间和period
    this.setValue();
    this.$emit("update:period", this.period);
  },
  methods: {
    setValue(periodType = this.periodType, newValue = this.dateValue) {
      // 转换时间，转成用户想要的时间格式
      newValue = this.transforDate(periodType, newValue);
      this.$emit("update:value", newValue);
    },
    transforDate(period, date) {
      // 把时间转成带-格式的
      let tranDate = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
      // 定义各个period返回的格式
      const obj = {
        'week': '{y}{m}{d}',
        'month': '{y}{m}',
        'year': '{y}'
      };
      // daily则不处理
      if(period === 'daily') {
        return date;
      }
      // week则日期转为星期天
      if(period === 'week') {
        tranDate = (new Date(tranDate)).getTime() - (new Date(tranDate)).getDay() * 86400000;
      }
      let res = parseTime(tranDate, obj[period]);
      return res
    }
  }
};
</script>
