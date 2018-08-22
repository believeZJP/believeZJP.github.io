# 记录踩过的坑


数组必须要key的解决办法

由于有些数据没有唯一key值。需要自行添加
```javascript
var localCounter = 1;
this.data.forEach(el=>{
    el.id = localCounter++;
});


//向数组中动态添加元素时，
function createUser(user) {
    return {
        ...user,
        id: localCounter++
    }
}
```

## 动态路由，传参获取参数
定义路由
```javascript
'/coupons/relateProducts/:couponBatchId': {
            component: dynamicWrapper(app, ['coupons'], () => import('../routes/Coupons/RelateProducts'))
        },
```

在组件中获取
```

this.props.match.params.couponBatchId
```

# 路由跳转


# 多级对象setState
可以单独取出来，修改后再整体放进去


# 一个组件是modal，打开就查询一次，在哪执行查询
    在componentWillReceiveProps里
    componentWillReceiveProps(nextProps){
        // 这里的nextProps为修改后的状态值

        用this.props可以获取到修改之前的props

        通过this.props和nextProps两者对比可以看是否需要更新和操作
    }

    componentwillreceiveprops会自动接收参数，导致页面不断渲染
    需要配合this.props使用
    componentDidMount不会触发

    lodash.has 


# select 用setFieldsValue赋值，类型要一样，数字就是数字，字符串就是字符串，才能正常显示。

# form表单重置按钮
```javascript
handleReset = () => {
    this.props.form.resetFields();
}
```