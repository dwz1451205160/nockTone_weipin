var shopCoupon = (function () {
    var $favourableBtn = document.querySelector('#favourable');
    var $foldBox = document.querySelector('.discount_box_zhedie');
    var $xBox = document.querySelector('.discount_box_zhedie_content');
    // var timer = null;
    var flag = false;
    return {
        init() {
            this.event();
        },
        event() {
            var _this = this;
            $favourableBtn.onclick = function () {
                console.log("000")
                
                
               if(flag){
                    $foldBox.style.height = '0px';
                    $foldBox.style.borderTopColor = '#fff';
                    $foldBox.style.borderBottomColor = '#fff';
                    $xBox.style.opacity = '0';
                    flag = false;
               }else{
                    _this.move($foldBox,{
                        height:250
                    },time = 300);
                    $foldBox.style.borderTopColor = '#cccbcb';
                    $foldBox.style.borderBottomColor = '#ecebeb';
                    _this.move($xBox,{
                        opacity:1
                    },time = 400);
                    flag = true;
               }
                // $xBox.style. = 'block';
                
            }
        },
        getStyle(obj, attr) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(obj, false)[attr]
            }
            return obj.currentStyle[attr]
        },
        //运动
        move(ele, targetObj, time = 1000, callback) {
            var obj = ele;
            if (typeof ele == 'string') {
                obj = document.querySelector(ele);
            }
            clearInterval(obj.timer);
            //获取初始值
            var initObj = {};
            for (var attr in targetObj) {
                initObj[attr] = parseInt(this.getStyle(obj, attr));
                if (attr == 'opacity') {
                    initObj[attr] = parseInt(this.getStyle(obj, attr)) * 100;
                    targetObj[attr] = targetObj[attr] * 100;
                }

            }
            console.log(initObj)
            //求得速度
            var speedObj = {};
            for (var attr in targetObj) {
                speedObj[attr] = (targetObj[attr] - initObj[attr]) / (time / 10);
            }
            //创建定时器
            obj.timer = setInterval(() => {
                //立一个flag
                var flag = true;
                for (var attr in targetObj) {
                    initObj[attr] += speedObj[attr];
                    if ((speedObj[attr] > 0 && initObj[attr] >= targetObj[attr]) || (speedObj[attr] < 0 && initObj[attr] <= targetObj[attr])) {
                        initObj[attr] = targetObj[attr];
                    } else {
                        //只为组织不让清除定时器
                        flag = false;
                    }
                    if (attr == 'opacity') {
                        obj.style[attr] = initObj[attr] / 100;
                    } else {
                        obj.style[attr] = initObj[attr] + 'px';
                        console.log(initObj[attr])
                    }
                }
                //如果flag为true，就说明循环完毕
                if (flag) {
                    clearInterval(obj.timer);
                    //终止条件
                    if (typeof callback == 'function') {
                        callback(obj);
                    }
                }



            }, 10);
        }
    }
}())
