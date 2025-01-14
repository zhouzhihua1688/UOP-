var vueSelect = Vue.extend({
    template: `
    <div :style='boxCss'>
         <label>
            <input :disabled='disabled' type='text' :style='inputCss' @input='search'  @focus='focus' @blur='blur' :value='match'>
            <span :style='spanCss' ref='opintSpan'></span>
         </label>
        <ul :style='[ulCss,ulScroll]' @mousedown='set_module' v-show='start_select' @mousemove='move' >
        <template v-for='(item,index) in showList' >
            <li :style='[index===float?enterLi:"",index===pitchOn?activeLi:"",{padding:"10px 0"}]' :key='index' v-for='(val,key) in item'  :data-value='key' :data-index='index'>{{val}}</li>
        </template>
        </ul>
    </div>`,
    props: {
        value: [String, Number],
        label: {
            type: [String, Array],
            required: true
        },
        options: {
            type: [Array, Object],
            default: () => []
        },
        model: {
            type: String,
            required: true
        },
        maxlist: {
            type: [Number, String],
            default: 10
        },
        height: {
            type: [Number, String],
            default: 30
        },
        width: {
            type: [Number, String],
            default: 170
        },
        disabled: [Boolean, Number, String, Object, Array],
    },
    data: function () {
        return {
            match: '',
            Options: [],
            showList: [],
            boxCss: {
                'textAlign': 'left',
                'verticalAlign': 'middle',
                'textIndent': '5px',
                'border': '1px solid #D5D5D5',
                'cursor': 'pointer',
                'padding': 0,
                'margin': 0,
                'color': '#858585',
                'position': 'relative',
                'minHeight': this.height + 'px',
                'width': this.width + 'px',
                'height': this.height + 'px',
                'display': 'inline-block',
                'backgroundColor': '#FFF'
            },
            inputCss: {
                'position': 'absolute',
                'left': 0,
                'top': 0,
                'border': 0,
                'outline': 'none',
                'color': '##858585',
                'lineHeight': this.height + 'px',
                'textIndent': '5px',
                'width': this.width - 20 + 'px',
                'height': this.height - 2 + 'px',
            },
            spanCss: {
                'display': 'inline-block',
                'position': 'absolute',
                'top': this.height / 2 - 3 + 'px',
                'right': '8px',
                'width': '0',
                'heigth': '0',
                'borderTop': '5px solid #888',
                'borderLeft': '3px solid transparent',
                'borderRight': '3px solid transparent',
            },
            ulCss: {
                'position': 'absolute',
                'listStyle': 'none',
                'padding': 0,
                'margin': 0,
                'top': this.height - 2 + 'px',
                'left': '-1px',
                'color': '#858585',
                'fontSize': '12px',
                // 'lineHeight': this.height + 'px',
                'min-width': this.width + 'px',
                // 'max-width': '400px',
                // 'white-space': 'nowrap',
                'backgroundColor': 'white',
                'border': '1px solid #D5D5D5',
                'zIndex': 999,

            },
            ulScroll: {
                'maxHeight': this.maxlist * this.height + 2 + 'px',
                'overflowY': 'scroll',
            },
            enterLi: {
                'background-color': '#1E90FF',
                'color': '#fff',
            },
            activeLi: {
                'background-color': '#1E90FF',
                'color': '#fff',
            },
            float: null,
            pitchOn: null,
            start_select: false
        }
    },
    computed: {
    },
    // created: function () {
    //     this.init()
    // },
    watch: {
        value: function (newval) {
            this.upadte_value_ofWatch(newval)
        },
        // Options: {
        //     handler: function (newval) {
        //         newval.some(function (item, index) {
        //             if (this.value == item[this.model]) {
        //                 this.pitchOn = index
        //                 return true;
        //             }
        //         }, this)
        //     },
        //     immediate: true
        // },
        options: {
            handler: function (newval) {
                this.Options = newval.map((item) => {
                    return {
                        [String(item[this.model])]: Array.isArray(this.label) ? this.label.reduce((first, next) => first + item[next], '') : item[this.label]
                    }
                })
                // this.showList = [...this.Options]
                for (var key in this.Options) {
                    this.showList[key] = this.Options[key];
                }
                this.upadte_value_ofWatch(this.value)
            },
            immediate: true
        }
    },
    methods: {
        upadte_value_ofWatch: function (newval) {
            var flag = this.Options.some((item) => {
                for (const key in item) {
                    if (String(newval) === String(key)) {
                        this.match = item[key]
                        return true;
                    }
                }
            })
            if (!flag) {//如果没有对应的数据，则显示为空
                this.match = ''
            }
        },
        // init: function () {
        //     if (this.pitchOn != null) {
        //         this.match = this.Options[this.pitchOn][this.label]
        //     } else {
        //         this.match = ''
        //     }
        // },
        search: function (ele) {
            this.match = ele.target.value;
            this.showList = this.Options.map((item) => {
                for (const key in item) {
                    if (item[key].indexOf(this.match) !== -1) {
                        return {
                            [key]: item[key]
                        }
                    }
                }
            })
        },
        set_module: function (ele) {
            if (ele.target.tagName !== 'LI') return;
            var value = ele.target.dataset.value;
            var index = ele.target.dataset.index;
            this.$emit('input', value)
            this.pitchOn = Number(index);
        },
        blur: function () {
            // this.showList = [...this.Options]
            for (var key in this.Options) {
                this.showList[key] = this.Options[key];
            }
            this.start_select = false;
            this.upadte_value_ofWatch(this.value)
            this.float = null;
            this.$refs.opintSpan.style.transform = 'rotateX(0)';

        },
        focus: function () {
            this.start_select = true;
            this.$refs.opintSpan.style.transform = 'rotateX(180deg)';
        },
        move: function (ele) {
            if (ele.target.tagName !== 'LI') return;
            this.float = Number(ele.target.dataset.index);
        }
    },

})

/*
    option     数组包对象  (必须)
    v-model 绑定vue实例data (必须)
    lable   展示数据 【】   (必须)
    model   传输数据    (必须)
    width   宽          默认170
    height  高          默认30
    maxlist 最大展示量   默认10条
*/