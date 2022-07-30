var VueBootstrapDatetimePicker = {
    template: "<div class='input-group'>"+
                    "<slot name='left'/>"+
                    "<input type='text' :placeholder='placeholder' :disabled='disabled' class='form-control' ref='time'/>"+
                    "<slot name='right'/>"+
                "</div>",
    props: {
        config: {
            type: [Object],
            default :function() {
                return {}
            }
        },
        value: [String, Number]
    },
    mounted() {
        var configItem = {};
        // ...this.initConfig, ...this.config, defaultDate: this.value
        for (var key in this.initConfig) {
            configItem[key] = this.initConfig[key];
        }
        for (var key1 in this.config) {
            if (key1 === 'disabled') {
                this.disabled = this.config[key1];
            }
            else if(key1 === 'placeholder'){
                this.placeholder = this.config[key1];
            }
            else {
                configItem[key1] = this.config[key1];
            }
        }
        configItem.defaultDate = this.value;
        $(this.$refs.time).datetimepicker(configItem).on('dp.change', function (value) {
            this.$emit('input', this.$refs.time.value)
        }.bind(this))
    },
    watch: {
        value: function (newval) {
            console.log(newval);
            this.$refs.time.value = newval;
            if(!newval){
                $(this.$refs.time).data('DateTimePicker').clear();
            }
        }
    },
    data:function() {
        return {
            initConfig: {
                format: 'YYYY-MM-DD HH:mm:ss', //日期格式
                dayViewHeaderFormat: 'YYYY MMMM', //默认值'MMMM YYYY'     选择天时，顶部标签栏展示样式
                icons: { //更改选择器功能的默认图标
                    time: 'fa fa-clock-o',
                    date: 'fa fa-calendar',
                    up: 'fa fa-chevron-up',
                    down: 'fa fa-chevron-down',
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-arrows ',
                    clear: 'fa fa-trash',
                    close: 'fa fa-times'
                },
                showTodayButton: true, //默认false     在图标工具栏中显示“今天”按钮
                showClear: true, //默认false     在图标工具栏中显示“清除”按钮
                keepOpen: false, //失去焦点时才会关闭弹窗
                allowInputToggle: true, //如果为true，则在按钮组中使用时，选择器将显示在文本框焦点上，并单击图标
            },
            disabled: false,
            placeholder:''
        }
    },
}

// var config = {
//     format: 'YYYY-MM-DD HH:mm:ss',//日期格式
//     dayViewHeaderFormat: 'YYYY MMMM',//默认值'MMMM YYYY'     选择天时，顶部标签栏展示样式
//     extraFormats: ['YY-MM-DD'],//默认值false   手动输入时间时，支持解析的格式 
//     // stepping: 1,//分钟数，向上/向下箭头将移动时间选择器中的分钟值
//     // maxDate: '2020-06-17',//默认值false       可选择可输入的最大日期
//     // minDate: '2020-06-12',//默认值false       可选择可输入的最小日期
//     useCurrent: false,//默认值true    第一次获取焦点时展示当前日期
//     // collapse: false,//默认值true    是否折叠时间选择器
//     locale: 'zh-cn',  //语言环境   必须引入moment的语言环境包
//     // defaultDate: '2020-06-12',//设置选择器的默认日期/时间。覆写useCurrent
//     disabledDates: [], //设置禁用日期
//     enabledDates: [], //设置启用日期
//     icons: {//更改选择器功能的默认图标
//         time: 'glyphicon glyphicon-time',
//         date: 'glyphicon glyphicon-calendar',
//         up: 'glyphicon glyphicon-chevron-up',
//         down: 'glyphicon glyphicon-chevron-down',
//         previous: 'glyphicon glyphicon-chevron-left',
//         next: 'glyphicon glyphicon-chevron-right',
//         today: 'glyphicon glyphicon-screenshot',
//         clear: 'glyphicon glyphicon-trash',
//         close: 'glyphicon glyphicon-remove'
//     },
//     // useStrict:true,//严格的日期解析模式
//     // sideBySide:true, //一起使用时间和日期时，并排显示选择器
//     daysOfWeekDisabled: [0],//0-6 禁用周几
//     // calendarWeeks: true, //默认值false   在一周的第一天左侧显示是一年中的第几周。
//     // viewMode: 'days',//显示选择器时显示的默认视图
//     // toolbarPlacement: 'top',//默认值default 工具栏位置
//     showTodayButton: true,//默认false     在图标工具栏中显示“今天”按钮
//     showClear: true,//默认false     在图标工具栏中显示“清除”按钮
//     // showClose: false,//默认false     在图标工具栏中显示“关闭”按钮
//     // widgetPositioning: {//弹窗位置
//     //     horizontal: 'auto',
//     //     vertical: 'auto'
//     // },
//     // inline: false,//内联显示选择器
//     // keepInvalid:true,//默认值false     不还原，不覆盖无效的日期
//     keepOpen: false,//失去焦点时才会关闭弹窗
//     // debug:true,//blur事件发生后，日期选择器将保持打开状态。
//     allowInputToggle: true,//如果为true，则在按钮组中使用时，选择器将显示在文本框焦点上，并单击图标
//     // focusOnShow: false,//如果为false，则在显示选择器时将不会为文本框提供焦点
//     // disabledHours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24],//禁用小时
//     // enabledHours: [9, 10, 11, 12, 13, 14, 15, 16],//启用小时
// }

/* <span class="input-group-addon" >
<i class="fa fa-clock-o bigger-110"></i>
</span> */
/*  <span class="input-group-addon" slot='right'>
                                                <span class="glyphicon glyphicon-calendar"></span>
                                            </span>*/