/**
 * Created by zjp on 2016/12/14.
 */
//自定义一个TabView类
defined(['Widget','jquery', 'jqueryUI'], function (widget, $, $UI) {

    function  TabView() {
        
    }

    TabView.prototype = $.extend({}, new widget.Widget(), function () {
        someMethod: function () {

        }
    })
});
