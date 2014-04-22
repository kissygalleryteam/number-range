## 综述

NumberRange是一个数字校验组件，支持以下功能

* 数字范围校验；
* 小数点保留位数校验；
* 支持强制校验和提示校验方式；
* 支持自定义校验回调；
* 支持绑定valuechange事件自动校验和手动校验；
* 支持自定义校验提示层位置和内容；

## 组件信息

* 版本：1.0
* 作者：圆影
* demo：[http://gallery.kissyui.com/number-range/1.0/demo/index.html](http://gallery.kissyui.com/number-range/1.0/demo/index.html)

## 初始化组件
		
    S.use('gallery/number-range/1.0/index', function (S, NumberRange) {
         var range = new NumberRange({
			tipType: "tip"
         });
         range.bind('.demo',{
         	tipType: "force"
         })
    })

## API说明

**tipType** ("force" || "tip")
校验方式，"tip" 提示校验，"force" 强制校验

**fixed** (null || Number)
小数点保留位数

**offset** ([10,10])
提示层偏移量，参见 [overlay](http://docs.kissyui.com/1.4/docs/html/api/component/extension/align.html#component.extension.Align.config.align) 组件

**points** (['cr','cl'])
提示层箭头方向，参见 [overlay](http://docs.kissyui.com/1.4/docs/html/api/component/extension/align.html#component.extension.Align.config.align) 组件

**min** (Number)
最小值

**max** (Number)
最大值

**minTip** (String)
最小值提示

**maxTip** (String)
最大值提示

**success** (function(){})
校验成功回调

**error** (function(){})
校验失败回调