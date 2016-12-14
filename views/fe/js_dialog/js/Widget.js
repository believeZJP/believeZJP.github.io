/**
 * Created by zjp on 2016/12/14.
 */

//定义Widget抽象类
/*

defined(function () {
    function  Widget() {
        this.handlers = {};
    }
    Widget.prototype = {
        on: function(type, handler){
            
            
        },
        fire: function (type, data) {
            
        }
    };

    return {
        Widget: Widget
    };
});
*/

/*

(function () {
    function  Widget() {
        this.handlers = {};
    }
    Widget.prototype = {
        on: function(type, handler){
            if(typeof this.handlers[type] == 'undefined'){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;

        },
        fire: function (type, data) {
            if(this.handlers[type] instanceof  Array){
                var handlers = this.handlers[type];
                for(var i=0,il=handlers.length; i<il;i++){
                    handlers[i](data);
                }
            }
        }
    };

    // return {
        window.Widget = Widget;
    // };
})();

*/

//为widget类添加统一生命周期
/*defined(['jquery'],function ($) {
    
})*/
(function () {
    function  Widget() {
        // this.handlers = {};//移除
        this.boundingBox = null;    //属性，最外层容器

    }
    Widget.prototype = {
        on: function(type, handler){
            if(typeof this.handlers[type] == 'undefined'){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;

        },
        fire: function (type, data) {
            if(this.handlers[type] instanceof  Array){
                var handlers = this.handlers[type];
                for(var i=0,il=handlers.length; i<il;i++){
                    handlers[i](data);
                }
            }
        },
        renderUI: function () { //接口： 添加dom节点
            
        },
        bindUI: function () {   //接口： 添加监听事件
            
        },
        syncUI: function () {   //接口： 初始化组件属性
            
        },
        render: function (container) {  //方法： 渲染组件
            this.renderUI();
            this.handlers = {}; //如果继承自widget,弹框取消掉时，handler没有从内存中清除，仍放在prototype的原型中，
            //那些事件还是存在的，所以需要在bindUI以前需要将事件清除，将handlers清空成一个空对象，
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
            
        },
        destructor: function(){     //接口： 销毁前的处理函数

        },
        destory: function(){        //方法： 销毁组件
            this.destructor();
            this.boundingBox().off();
            this.boundingBox.remove();
        }
    };

    // return {
    window.Widget = Widget;
    // };
})($);
