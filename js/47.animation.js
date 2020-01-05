function animation(obj, target, callback) {
    // 每一个动画开始之前先清除之前的全部定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(() => {
        // 缓动步长计算,如果步长是整数就取整数并且往大取；如果步长是负数也取整数并往小取
        step = (target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
            // 这里的停止计时的条件要放到计时器里面，这样才能扫描到该条件并结束计时
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
                // 当定时器结束当时候检查是否有回调函数；如果有则执行回调函数
            if (callback) {
                callback()
            }
        }
        // 这里的offsetLeft值是相对于obj最近的相对定位的元素的值
        obj.style.left = obj.offsetLeft + step + 'px'
            // obj.style.top = obj.offsetTop + 5 + 'px'
    }, 15);
}
//动画的主要原理：
// 所有的图片都有一个初始位置，而target就是相对于初始位置的；
// 所以执行一次动画函数就是目标对象相对于初始位置移动target距离

// 动画函数就是间隔一定事件移动指数减小的距离，最后到达目标距离
// 不论目标位置在初始位置左侧还是右侧，该函数都是适用的
// 多个animation函数使用同一个初始原点坐标