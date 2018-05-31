# call 和 apply 区别

```
obj1.method.call(obj2, arg1, arg2)

```
call的作用是把obj1的方法放到obj2上使用,后面的作为参数传入. 
让obj2对象来执行obj1对象的方法，

javascript动态变换运行时上下文特性, 这种特性主要体现在 apply 和 call 两个方法的运用上.

区分 call 和 apply 就一行代码

```
foo.call(this, arg1, arg2, arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3)
```

call, apply 都属于 Function.prototype的一个方法, 是在javaScript引擎内实现的。每个Function对象实例, 都有 call, apply 属性. 


## 相同点: 两个方法产生的作用完全一样
## 不同点: 方法传递参数不一样


eg: foo.call(this, arg1, arg2, arg3)

foo是一个方法, this是方法执行时上下文相关对象, arg1, arg2, arg3 是传给 foo 方法的参数. 这里所谓的方法执行时上下文相关对象, 就是在类实例化后对象中的this.

在JavaScript中, 代码总有一个上下文对象, 上下文对象是通过this变量来体现的。这个this永远指向当前代码所处的对象中.


```
function A(){
    this.message = '';
    getMessage = function(){
        return this.message;
    }
}

function B(){
    this.message = '';
    setMessage = function(msg){
        this.message = msg;
    }
}
```

A, B 类都有一个message属性, A有获取消息的getMessage方法, B有设置消息的setMessage方法。

```
// 创建一个B类实例对象
var b = new B();

// 给对象a动态指派b的setMessage方法, 注意a本身是没有这方法的。
b.setMessage.call(a, 'a的消息');

// 获取 'a的消息'
alert(a.getMessage());
```

这就是动态语言JavaScript call 的威力所在.

简直是无中生有, 对象的方法可以任意指派, 而对象本身是没有这个方法的, 注意是指派, 即借给另一个对象的调用去完成任务,原理上时方法执行时上下文对象改变了。

所以b.setMessage.call(a, 'a的消息')就等于用a作执行时上下文对象调用b对象的setMessage方法, 而这过程中与b一点关系都没有, 作用等效于a.setMessage('a的消息')

## 作用： 借用别人的方法来调用, 就像调用自己的一样
用call可以实现多重继承

eg:
```
function print(a, b, c, d){
    alert(a + b + c + d);
}
function example(a, b, c, d){
    // 用call借用print, 参数显式打散传递
    print.call(this, a, b, c, d)

    // 用apply方式借用print, 参数作为一个数组传递, 这里直接用JavaScript方法内本身有的arguments数组
    print.apply(this, auguments);

    // 或者封装成数组
    print.apply(this, [a, b, c, d]);
    
}

// 调用
example('来', '个', '对', '象')
```

## 区别：call的第二个参数是将传参用逗号隔开, apply直接将参数放到一个数组中.

## 应用场景：参数明确时，可用call, 参数不明确时可用apply结合arguments.

```
print.call(window, 1, 2, 3, 4)

// 多个参数
function foo(){
    print.apply(window, arguments);
}
```
