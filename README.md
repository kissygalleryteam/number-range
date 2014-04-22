## number-range

* 版本：1.0
* 作者：圆影
* 教程：[http://gallery.kissyui.com/number-range/1.0/guide/index.html](http://gallery.kissyui.com/number-range/1.0/guide/index.html)
* demo：[http://gallery.kissyui.com/number-range/1.0/demo/index.html](http://gallery.kissyui.com/number-range/1.0/demo/index.html)

## 使用示例

    S.use('gallery/number-range/1.0/index', function (S, NumberRange) {
        var $ = S.all;
        var range = new NumberRange({
            tipType: 'tip',
            fixed: 2,
            offset: [10,10],
            points: ['cr','cl'],
            min: 5,
            max: 20,
            minTip: '可输入的最小数量为{value}',
            maxTip: '可输入的最大数量为{value}',
            success: null,
            error: null
        });

        // 示例1
        range.bind($('.demo1'));

        // 示例2
        range.bind('.demo1');

        // 示例3
        range.bind('.demo1',{
            fixed: 2
        });
    })


## changelog

### V1.0

    [!] 支持HTML标签定义数字取值范围 <input type="text" data-min=1 data-max=99 />
    [!] 支持初始化配置时定义数字取值范围 new NumberRange({min:1,max:99})
    [!] 支持绑定事件时定义数字取值范围 var range = new NumberRange({}); range.bind('.demo',{min:1,max:99})
    [!] 支持校验时时定义数字取值范围 var range = new NumberRange({}); range.verify('.demo',{min:1,max:99})
    [!] 支持小数点，并可以选择保留位数 new NumberRange({fixed:3})
    [!] 支持数字校验方式可选“强制”或“提示” new NumberRange({tipType:'tip'}) //  tip || force
    [!] 支持自定义提示内容 new NumberRange({minTip:'',maxTip:''})
    [!] 支持自定义提示位置 new NumberRange({offset:'',points:''}) 取值参见 overlay 组件
    [!] 支持自定义校验成功失败回调 new NumberRange({success:function(){},error:function(){}})