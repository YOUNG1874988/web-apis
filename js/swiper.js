// 页面全部加载完成之后在执行js代码
window.addEventListener('load', function() {

    // 一.鼠标经过轮播图时显示左右切换按钮，离开时隐藏
    var focus = document.querySelector('.focus')
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
        // 鼠标经过focus时显示2个箭头
    focus.addEventListener('mouseover', function() {
            arrow_l.style.display = 'block'
            arrow_r.style.display = 'block'
                // 鼠标经过停止定时器自动轮播
            clearInterval(timer)
                // 清除定时器变量
            timer = null
        })
        // 鼠标离开focus时隐藏2个箭头
    focus.addEventListener('mouseout', function() {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
            // 鼠标离开开启定时器自动轮播
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click()
        }, 1000)
    })



    //二. 动态生成小圆圈，有多少张图片就生成多少个小圆圈；点击pot触发相关事件
    var ul = document.querySelector('ul')
    var lis = ul.querySelectorAll('li')
    var ol = document.querySelector('ol')
        // this.console.log(lis)
        // 1.根据图片的个数创建多少个小圆圈
        // 由于在轮播图的最后一张并不是真正意义上的第一张，故图片多了一张，，用来增加无缝视觉效果，
        // 而pot数是由图片数量得来的，故要减去1
    for (let i = 0; i < lis.length - 1; i++) {
        var circle = document.createElement('li')
            // 2.为pot添加属性index，该值与图片的索引值对应
        circle.setAttribute('index', i)
            // 3.将pot添加到正确的位置
        ol.appendChild(circle)


        //4. 点击pot触发2个事件：当前pot样式变为current;图片移动到对应索引值到位置
        circle.addEventListener('click', function() {
            // 4.1把所有小li清除current样式
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = ''
            }
            //4.2 把当前小li样式设置为current
            this.className = 'current'
                //5.点击跳转轮播图
            var index = this.getAttribute('index')
                // console.log(index)
                // console.log(focus.offsetWidth)
                // 一张图片的移动距离为730，这里的730为图片的宽度
            circlewidth = -index * 730
            animation(ul, circlewidth)
                // 6.点击某个小圆圈时，把其对应当索引值给num和littlecircle，用来进行准确的右按钮跳转和小圆圈样式切换
                // 即每一次点击pot的时候，右翻和pot样式切换都会得到正确的索引值
            num = index;
            littlecircle = index;
        })
    }


    // 三.设置第一个小圆圈为当前样式
    ol.children[0].className = 'current'



    // 四.右切换按钮的完成以及对应pot的变化
    // 1.点击右切换按钮切换到右下一张轮播图
    var num = 0
    var littlecircle = 0
    arrow_r.addEventListener('click', function() {
            // 当走到最后一张图片，即不是真正意义上当第一张时，将ul的left值设为0，
            // 就可以重新开始移动轮播图的位置了
            if (num == 4) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animation(ul, -num * 730)
                // 2.点击右翻按钮时让小圆圈一起的样式一起跟着变化
            littlecircle++
            // 当littlecircle为0时处于第一个圆圈，点击意味着要改变第二个圆圈，所以在点击方法开始时给其自加1
            if (littlecircle == 4) {
                littlecircle = 0
            }
            // 3.调用pot当前样式跟随函数
            circleChange()

        })
        // 点击做切换按钮切换到做下一张轮播图
        // arrow_l.addEventListener('click', function() {
        //     num++;
        //     animation(ul, num * 730)
        // })


    // 五.左切换按钮的实现
    arrow_l.addEventListener('click', function() {
        // 当轮播图窗口处于第一张图片时，此时向左点击，ul的位置应该跳到真正最后一张的位置，即所有图片的长度减1的那张图片
        // 这个位置ul是处于负数状态的
        if (num == 0) {
            num = ul.children.length - 1
            ul.style.left = -num * 730 + 'px';
        }
        num--;
        animation(ul, -num * 730)
            // 2.点击左翻按钮时让小圆圈一起的样式一起跟着变化
        littlecircle--
        // 当littlecircle小于0时处于第一个圆圈，点击意味着要跳到第4个圆圈，共5张图片故
        if (littlecircle < 0) {
            littlecircle = ol.children.length - 1
        }
        // 3.调用pot当前样式跟随函数
        circleChange()
    })

    // 六.改变当前pot样式函数
    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[littlecircle].className = 'current'
    }
    // 七.自动轮播定时器
    var timer = this.setInterval(function() {
        // 手动调用点击事件
        arrow_r.click()
    }, 1000)
})