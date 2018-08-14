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

# 多级对象setState

# 一个组件是modal，打开是查询一次，在哪执行
    componentDidMount不会触发

    lodash.has 