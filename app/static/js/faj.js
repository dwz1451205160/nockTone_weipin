var fdj = (function(){
    //小图片
    var $smallAll = document.querySelectorAll('li img');
    //小图片的盒子
    var $smallBox = document.querySelector('.img-box'); 
    //中图盒子
    var $showBox = document.querySelector('.show_img'); 
    //中图片
    var $bigImg = document.querySelector('.show_img img');
    //大图盒子
    var $largestBox = document.querySelector('.largest_img');
    //大图片
    var $largestImg = document.querySelector('.largest_img img');
    //遮罩
    var $filter = document.querySelector('.filter');

    
    var index = 0;
    for(var i = 0;i < $smallAll.length;i++){
        $smallAll[i].index = i;
    }
    return {
        init() {
            
            this.event();
            this.showImg();
        },
        event() {
            var _this = this;
            //划过小图标
            $smallBox.onmouseover = function(e) {
                e = e || window.event;
                
                var target = e.target || e.srcElement;
                if(target.nodeName == 'IMG'){
                    console.log(999)
                    index = target.index;
                    _this.showImg();
                }
            }
            $showBox.onmouseenter = function() {
                $bigImg.style.opacity = 0;
                // var x = this.offsetLeft,
                // y = this.offsetTop;
                $showBox.onmousemove = function(e) {
                    e = e || window.event;
                    var left = e.pageX - this.offsetLeft - $filter.offsetWidth/2,
                    top = e.pageY - this.offsetTop - $filter.offsetHeight/2;
                    //获取最大值
                    var maxLeft = this.clientWidth - $filter.offsetWidth;
                    var maxTop = this.clientHeight - $filter.offsetHeight;
                    // var largestImgLeft = -2.857*left;
                    // var largestImgTop = -2.857*top;
                    if(left <= 0){
                        left = 0;

                    }else if(left >= maxLeft){
                        left = maxLeft;
                    };
                    if(top <= 0){
                        top = 0;
                    }else if(top >= maxTop){
                        top = maxTop;
                    };
                    $filter.style.left = left + 'px';
                    $filter.style.top = top + 'px';
                    $largestImg.style.left = -2.857*left + 'px';
                    $largestImg.style.top = -2.857*top + 'px';

                   
                    
                   
                }
                
                
            }
            
            $showBox.onmouseleave = function() {
                $bigImg.style.opacity = 1;
            }

        },
        showImg() {
            for(var i = 0;i < $smallAll.length;i++){
                $smallAll[i].parentNode.classList.remove('active');                
            }
            $smallAll[index].parentNode.classList.add('active');
            $bigImg.src = `images/${index}_big.jpg`;
            $largestImg.src = `images/${index}_largest.jpg`;
            
        }
    }
}())
fdj.init();