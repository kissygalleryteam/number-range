/*
combined files : 

gallery/number-range/1.0/mini

*/
/**
 * @fileoverview 
 * @author 圆影<yuanying.xh@alibaba-inc.com>
 * @module number-range
 **/
KISSY.add('gallery/number-range/1.0/mini',function (S, Node, Lang) {
    var $ = Node.all,
        EventTarget = S.Event.Target;
    /**
     *
     * @class NumberRange
     * @constructor
     */
    function NumberRange(config) {

    }

    S.augment(NumberRange, EventTarget, /** @lends NumberRange.prototype*/{

    });

    return NumberRange;

}, {requires:['node', 'lang']});




