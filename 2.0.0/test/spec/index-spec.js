KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('number-range', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/number-range/1.0/']});