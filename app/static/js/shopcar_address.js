var getAddress = (function () {
    var $shopCarBox = document.querySelector('.mainpart_bottom');
    var $insertBox = document.querySelector('.insert_box');
    return {
        init() {
            this.getData();
        },
        event() {

        },
        //获取数据
        getData() {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            this.insertData(shopList);
        },
        //渲染数据
        insertData(data) {
            this.data = data;
            var $arr = [];
            var str = `
            <div class="peisong_address">
                <span class="peisong">配送至 
                    <em>
                        深圳市 龙华区 民塘新村
                    </em>                      
                </span>
                <span class="fenge">|</span>
                <div class="tips" style="display:inline-block">
                    <p style="display:inline-block">请在倒计时结束前提交订单，下单后你另有 30 分钟的支付时间。</p>
                    <span class="question_icon"></span>
                </div>
            </div>
            `
            $arr.push(str);
            $insertBox.innerHTML = $arr.join('');
           
        }
    }
}())