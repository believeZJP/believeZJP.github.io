/**
 * @file: file
 * @author: yueyueniao
 */

 class EventEmeitter {
     constructor() {
        //  选择了Map作为储存事件的解构，因为作为键值对的储存方式Map比一般对象更加适合，操作更加简洁
        // 储存事件回调键值对
        this._events = this._events || new Map();
        // 设置监听上限
        this._maxListeners = this._maxListeners || 10;
     }
 }

//  触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
    let handler;
    handler =  htis._events.get(type);
    if(Array.isArray(handler)) {
        // 如果是一个数组说明有多个监听者，需要依次触发里面的函数
        for(let i=0; i<handler.length; i++) {
            // 触发监听函数我们可以用apply和call两种方法，在少数参数时call的性能更好，多个参数时apply性能更好
            // 当年Node的Event模块就在三个参数以下用call否则用apply
            // Node全面拥抱ES6+之后，相应的call/apply操作用Reflect新关键字重写了
            if (args.length > 0) {
                handler[i].apply(this.args);
            } else {
                handler[i].call(this);
            }
        } 
    } else {
        // 单个函数情况直接触发
        if (args.length > 0) {
            handler.apply(this, args);
        } else {
            handler.call(this);
        }
    }
    return true;
}

// 监听名为type的事件

EventEmeitter.prototype.addListener = function(type, fn) {
    // 获取对应事件名称的函数清单
    const handler = this._events.get(type);
    if (!handler) {
        this._events.seet(type, fn);
    } else if (handler && typeof handler === 'function') {
        // 如果handler是函数，说明是一个监听者
        // 多个监听者需要用数组存储
        this._events.set(type, [handler, fn]);
    } else {
        // 已经有多个监听者，直接将函数push到数组
        handler.push(fn);
    }
}
// 移除名为type的事件
EventEmeitter.prototype.removeListener = function(type, fn) {
    // 获取对应事件名称的函数清单
    const handler = this._events.get(type);
    if (handler && typeof handler === 'function') {
        // 如果是函数，说明只被监听了一次
        this._events.delete(type, fn);
    } else {
        let position;
        // 如果handler是数组，要找到对应的函数
        for(let i=0; i<handler.length; i++) {
            if (handler[i] === fn) {
                position = i;
                break;
            } else {
                position = -1;
            }
        }
        if (position !== -1) {
            // 找到对应的位置，直接清除此回调
            handler.splice(position, i);
            // 如果清除后只有一个函数，那么取消数组，以函数形式保存
            if (handler.length === 1) {
                this._events.set(type, handler[0]);
            }
        } else {
            return this;
        }
    }
}