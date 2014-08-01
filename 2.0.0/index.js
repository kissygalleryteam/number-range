/**
 * @fileoverview 
 * @author 圆影<yuanying.xh@alibaba-inc.com>
 * @module number-range
 **/
KISSY.add(function(S, Node, Event, Overlay) {

    var $ = Node.all;
    var DefaultConfig = {
        tipType: 'force', // force 强制转换为最接近的极限值 tip提示出错
        fixed: null, // 小数点保留位数
        cls: '',
        tpl: '{tipText}',
        offset: [0,0],
        points: ['cr','cl'],
        min: 0,
        max: 10000000000,
        minTipText: '可输入的最小数量为{value}',
        maxTipText: '可输入的最大数量为{value}',
        success: null,
        error: null
    };

    function NumberRange(){
        this._init.apply(this,arguments);
    };

    S.augment(NumberRange,S.EventTarget,{
        _init: function(config){
            this.cfg = S.merge(DefaultConfig, config);
        },
        _isNumber: function(num){
            return /^\d+(\.\d*)?$/g.test(num);
        },
        _removeNotNumber: function(el){
            var currentValue = S.trim(el.val());
            var newValue = currentValue.replace(/[^\d.]/g,'');
            var newValueArray = newValue.split('.');
            if (newValueArray.length > 2) {
                newValue = newValueArray.shift()+'.'+newValueArray.join('');
            };
            if (newValue.indexOf('.')==0) {
                newValue = 0+newValue;
            };
            el.val(newValue);
        },
        _fixedNumber: function(el){
            var currentValue = S.trim(el.val());
            var fixed =  el[0].fixed != undefined ? el[0].fixed:this.cfg.fixed;
            var index = currentValue.indexOf('.');
            if (typeof fixed == 'number' && index != -1) {
                // 仅当不保留小数点或小数点后数字位数大于fixed时执行
                if (fixed == 0 || currentValue.split('.')[1].length>fixed){
                    var end = fixed == 0 ? index:index+fixed+1;
                    currentValue = currentValue.substring(0,end);
                    el.val(currentValue);
                };
            };
            return currentValue;
        },
        _forceFillin: function(el, error){
            if (!error) return;
            error.value && el.val(error.value);
        },
        _showTip: function(el,error){
            if (!error) return;
            var self = this;
            var key = error.type+'TipText';
            var tipText = S.substitute(el[0][key] || this.cfg[key],error);
            var content = S.substitute(el[0].tpl || this.cfg.tpl,{tipText:tipText});
            var layer = this.getLayer();
            layer.set('content',content);
            layer.set('align',{
                points: el[0].points || self.cfg.points,
                offset: el[0].offset || self.cfg.offset,
                node: el
            });
            layer.show();
        },
        _hidePopup: function(){
            this.getLayer().hide();
        },
        _checkNumber: function(el){
            var min = this._toNumber(el.attr('data-min')) || this._toNumber(el[0].min) || this.cfg.min;
            var max = this._toNumber(el.attr('data-max')) || this._toNumber(el[0].max) || this.cfg.max;
            var currentValue = this._fixedNumber(el);
            var error;
            if (currentValue<min) {
                error = {
                    type: 'min',
                    value: min
                };
            } else if(currentValue>max){
                error = {
                    type: 'max',
                    value: max
                };
            }
            if (!error) {
                var successFun = el[0].success || this.cfg.success;
                if (successFun) {
                    successFun(el);
                } else{
                    this._hidePopup();
                };
            } else{
                var errorFun = el[0].error || this.cfg.error;
                if (errorFun) {
                    errorFun(el,error);
                } else{
                    var tipType = el[0].tipType || this.cfg.tipType;
                    var method = tipType == 'force' ? '_forceFillin':'_showTip';
                    this[method](el,error);
                };
            };
        },
        _checkEL: function(el){
            var num = el.val();
            if (num === '') return;
            if (!this._isNumber(num)) {
                this._removeNotNumber(el);
                this._hidePopup();
            }else{
                this._checkNumber(el);
            }
        },
        _setEL: function(el,config,callback){
            if (!el) return;
            var cfg = S.merge(this.cfg,config||{});
            var els = typeof el == 'string' ? $(el):el;
            els.each(function(el,index){
                S.each(cfg,function(value,key,o){
                    el[0][key] = value;
                });
                callback && callback(el);
            });
            return els;
        },
        _toNumber: function(val) {
            return val * 1;
        },
        verify: function(el,config){
            var self = this;
            this._setEL(el,config,function(simpleEL){
                self._checkEL(simpleEL);
            });
        },
        bind: function(el,config){
            var self = this;
            this._setEL(el,config,function(simpleEL){
                simpleEL.on('valuechange',function(){
                    self._checkEL(simpleEL);
                });
                simpleEL.on('blur',function(){
                    self._hidePopup();
                });
            });
        },
        getRange: function(el, config) {
            var cfg = S.merge(this.cfg, config),
                min = this._toNumber(el.attr('data-min')) || cfg.min,
                max = this._toNumber(el.attr('data-max')) || cfg.max;

            return {
                max: max,
                min: min
            };
        },
        getLayer: function() {
            var self = this;
            var layer = this._layer;

            if(!layer) {
                layer = this._layer = new Overlay.Popup({
                    elCls: self.cfg.cls
                });
                layer.render();
            }

            return layer;
        }
    });

    return NumberRange;

}, {
    requires: [
        'node',
        'event',
        'overlay'
    ]
});