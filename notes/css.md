css 实现页面文字不换行、自动换行、强制换行

[链接](https://www.cnblogs.com/guwufeiyang/p/4253031.html)

要对应 flex 布局的换行布局设置

# CSS3 性能优化

- 尽可能多的利用硬件能力，如使用 3D 变形来开启 GPU 加速
  transform: translate3d(0, 0, 0);


    CSS动画属性会触发整个页面的重排relayout、重绘repaint、重组recomposite

- 尽可能的让动画元素不在文档流中，以减少重排
  position: fixed;
  position: absolute;
- 推荐在 CSS 动画中使用 webkit-transform: translateX(3em)的方案代替使用 left: 3em，因为 left 会额外触发 layout 与 paint，而 webkit-transform 只触发整个页面 composite

- 提升每一帧性能（缩短帧时长，提高帧率）
  > 避免频繁的重排。
  > 避免大面积的重绘。
  > 优化 JS 运行性能。
- 保证帧率平稳（避免跳帧）

  > 不在连续的动画过程中做高耗时的操作（如大面积重绘、重排、复杂 JS 执行），避免发生跳帧。

  > 若高耗时操作无法避免，则尝试化解，比如：
  > 将高耗时操作放在动画开始或结尾处。
  > 将高耗时操作分摊至动画的每一帧中处理。

- 针对硬件加速渲染通道的优化

  > 通过层的变化效果(如 transform)实现位移、缩放等动画，可避免重绘。
  > 合理划分层，动静分离，可避免大面积重绘。
  > 使用分层优化动画时，需要留意内存消耗情况（通过 Safari 调试工具）。

- 低性能设备优先调试
  > Android 设备优先调试：移动设备的硬件配置一般低于桌面设备，而移动端设备中，Android 设备相比于 iOS 设备性能普遍较差，因此在 Andorid 设备下性能问题更加明显，幸运的是 Android 可以借助 Chrome 自带的远程调试工具方便调试动画性能（Android 4.0+），所以优先调试 Android 设备可以更早地发现问题，并能更方便地解决问题。

[参考链接](https://www.cnblogs.com/py11kaka/p/5004733.html)
