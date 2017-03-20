/**
 * Created by zjp on 2017/3/20.
 */
var i = 0;
function count() {
  return ++i;
}
exports.count = count;
/***
 * 该模块定义了一个私有变量i,并在exports对象导出了一个共有方法count
 */

