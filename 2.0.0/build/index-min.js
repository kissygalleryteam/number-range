/*!build time : 2014-05-05 9:31:58 AM*/
KISSY.add("kg/number-range/2.0.0/index",function(a,b,c,d){function e(){this._init.apply(this,arguments)}var f=b.all,g={tipType:"force",fixed:null,cls:"",tpl:"{tipText}",offset:[0,0],points:["cr","cl"],min:0,max:1e10,minTipText:"\u53ef\u8f93\u5165\u7684\u6700\u5c0f\u6570\u91cf\u4e3a{value}",maxTipText:"\u53ef\u8f93\u5165\u7684\u6700\u5927\u6570\u91cf\u4e3a{value}",success:null,error:null};return a.augment(e,a.EventTarget,{_init:function(b){this.cfg=a.merge(g,b)},_isNumber:function(a){return/^\d+(\.\d*)?$/g.test(a)},_removeNotNumber:function(b){var c=a.trim(b.val()),d=c.replace(/[^\d.]/g,""),e=d.split(".");e.length>2&&(d=e.shift()+"."+e.join("")),0==d.indexOf(".")&&(d=0+d),b.val(d)},_fixedNumber:function(b){var c=a.trim(b.val()),d=void 0!=b[0].fixed?b[0].fixed:this.cfg.fixed,e=c.indexOf(".");if("number"==typeof d&&-1!=e&&(0==d||c.split(".")[1].length>d)){var f=0==d?e:e+d+1;c=c.substring(0,f),b.val(c)}return c},_forceFillin:function(a,b){b&&b.value&&a.val(b.value)},_showTip:function(b,c){if(c){var d=this,e=c.type+"TipText",f=a.substitute(b[0][e]||this.cfg[e],c),g=a.substitute(b[0].tpl||this.cfg.tpl,{tipText:f}),h=this.getLayer();h.set("content",g),h.set("align",{points:b[0].points||d.cfg.points,offset:b[0].offset||d.cfg.offset,node:b}),h.show()}},_hidePopup:function(){this.getLayer().hide()},_checkNumber:function(a){var b,c=this._toNumber(a.attr("data-min"))||this._toNumber(a[0].min)||this.cfg.min,d=this._toNumber(a.attr("data-max"))||this._toNumber(a[0].max)||this.cfg.max,e=this._fixedNumber(a);if(c>e?b={type:"min",value:c}:e>d&&(b={type:"max",value:d}),b){var f=a[0].error||this.cfg.error;if(f)f(a,b);else{var g=a[0].tipType||this.cfg.tipType,h="force"==g?"_forceFillin":"_showTip";this[h](a,b)}}else{var i=a[0].success||this.cfg.success;i?i(a):this._hidePopup()}},_checkEL:function(a){var b=a.val();""!==b&&(this._isNumber(b)?this._checkNumber(a):(this._removeNotNumber(a),this._hidePopup()))},_setEL:function(b,c,d){if(b){var e=a.merge(this.cfg,c||{}),g="string"==typeof b?f(b):b;return g.each(function(b){a.each(e,function(a,c){b[0][c]=a}),d&&d(b)}),g}},_toNumber:function(a){return 1*a},verify:function(a,b){var c=this;this._setEL(a,b,function(a){c._checkEL(a)})},bind:function(a,b){var c=this;this._setEL(a,b,function(a){a.on("valuechange",function(){c._checkEL(a)}),a.on("blur",function(){c._hidePopup()})})},getRange:function(b,c){var d=a.merge(this.cfg,c),e=this._toNumber(b.attr("data-min"))||d.min,f=this._toNumber(b.attr("data-max"))||d.max;return{max:f,min:e}},getLayer:function(){var a=this,b=this._layer;return b||(b=this._layer=new d.Popup({elCls:a.cfg.cls}),b.render()),b}}),e},{requires:["node","event","overlay"]});