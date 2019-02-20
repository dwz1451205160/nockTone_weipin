var shopCar = (function(){
    var $shopCarBox = document.querySelector('.mainpart_bottom');
    this.$insertBox = document.querySelector('.insert_box');
    return{
        init() {
            this.getData();
            this.event();
        },
        event() {
            var _this = this;
            //减
            $shopCarBox.addEventListener('click',function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className == 'minus') {
                    console.log('jian');
                    var index = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('index');
                    console.log(index);
                    _this.data[index].count--;
                    if( _this.data[index].count <= 1){
                        _this.data[index].count = 1;
                        console.log(target);
                        this.disabled = true;
                       
                        target.style = 'cursor:not-allowed';
                        target.style.background = '#f9f8f8';
                    }
                    _this.setData();
                    _this.insertData(_this.data);
                }
            }) 
            //加
            $shopCarBox.addEventListener('click',function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className == 'plus') {
                    console.log('plus');
                    var index = target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('index');
                    console.log(index);
                    _this.data[index].count++;
                    if( _this.data[index].count < 1){
                        _this.data[index].count = 1;
                    //     target.disabled = true;
                        // target.style = "cursor:not-allowed";
                        target.setAttribute("style","cursor:not-allowed");
                    //     target.style.background = '#f9f8f8';
                    }
                    _this.setData();
                    _this.insertData(_this.data);
                }
            }) 
            //删除
            $shopCarBox.addEventListener('click',function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.className =='delete'){
                    console.log('shanchu');
                    var index = target.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('index');
                    console.log(index);
                    _this.data.splice(index,1);
                    _this.setData();
                    // 通过数据重新渲染dom
                    _this.insertData(_this.data);
                    

                }
            })
            
        },
        //获取数据
        getData() {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(localStorage.shopList);
            this.insertData(shopList);

        },
        //渲染数据
        insertData(data){
            this.data = data;
            console.log(data)
            $insertBox.innerHTML = '';
            var $arr = [];
            
            for(var i = 0;i < data.length;i++){
                // var $div = document.createElement('div');
                // $div.setAttribute('index','1');
                var item = data[i];
                var str = `
                <div index=${i}>
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
                    <div class="shopcar_table">
                        <table cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th>精选特卖</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th>小计</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="trade_box">
                                            <div class="trade_img">
                                                <a href="shop_list.html"></a>
                                            </div>
                                            <div class="trade_name">
                                                <span>自营</span> | 
                                                <a href="shop_list.html">${item.tradename}</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    ￥${item.price}
                                    </td>
                                    <td>
                                        <div class="button_box">
                                            <button class="minus">-</button>
                                            <span>${item.count}</span>
                                            <button class="plus",style="cursor: pointer">+</button>
                                        </div>
                                    </td>
                                    <td id="price">￥ ${item.count * item.price}</td>
                                    <td class="delete">删除</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="freight">

                    </div>
                </div>
                
            `
             $arr.push(str);
            }
            
           
            // $div.innerHTML = $arr.join('');
            $insertBox.innerHTML = $arr.join('');
            $shopCarBox.appendChild($insertBox);
        },
        //设置数据
        setData() {
            localStorage.shopList = JSON.stringify(this.data);
        }
    }
}());
// shopCar.init();