var shopCar = (function () {
    // var $shopCarBox = document.querySelector('.mainpart_bottom');
    var $shopCarTable = document.querySelector('.shopcar_table');
    var $shopCarTbody = document.querySelector('tbody');
    return {
        init() {
            this.getData();
            this.event();
        },
        event() {
            var _this = this;
            //减
            $shopCarTable.addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.className == 'minus') {
                    console.log('jian');
                    var index = target.parentNode.parentNode.parentNode.getAttribute('index');
                    console.log(index);
                    _this.data[index].count--;
                    if (_this.data[index].count <= 1) {
                        _this.data[index].count = 1;
                        console.log(target);
                        this.disabled = true;

                        target.style.cursor = 'not-allowed';
                        target.style.background = '#f9f8f8';
                    }
                    _this.setData();
                    _this.insertData(_this.data);
                }
            })
            //加
            $shopCarTable.addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.className == 'plus') {
                    console.log('plus');
                    var index = target.parentNode.parentNode.parentNode.getAttribute('index');
                    console.log(index);
                    _this.data[index].count++;
                    if (_this.data[index].count < 1) {
                        _this.data[index].count = 1;
                        //     target.disabled = true;
                        // target.style = "cursor:not-allowed";
                        target.setAttribute("style", "cursor:not-allowed");
                        //     target.style.background = '#f9f8f8';
                    }
                    _this.setData();
                    _this.insertData(_this.data);
                }
            })
            //删除
            $shopCarTable.addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.className == 'delete') {
                    console.log('shanchu');
                    var index = target.parentNode.getAttribute('index');
                    console.log(index);
                    _this.data.splice(index, 1);
                    _this.setData();
                    // 通过数据重新渲染dom                    
                    _this.insertData(_this.data);

                }
            })

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
            console.log(data)
            $shopCarTbody.innerHTML = '';
            if (data.length >= 1) {
                var $arr = [];
                for (var i = 0; i < data.length; i++) {
                    // var $div = document.createElement('div');
                    // $div.setAttribute('index','1');
                    var item = data[i];
                    var str = `
                        <tr index=${i}>
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
            `
                    $arr.push(str);
                }

                console.log($arr)
                // $div.innerHTML = $arr.join('');
                $shopCarTbody.innerHTML = $arr.join('');
            } else {
                shopCarClear.init();
            }

        },
        //设置数据
        setData() {
            localStorage.shopList = JSON.stringify(this.data);
        }
    }
}());
// shopCar.init();



var shopCarClear = (function () {

    var $mainpartBox = document.querySelector('.mainpart')
    return {
        init() {
            this.insertData();
        },
        //购物车清空后的渲染
        insertData() {
            console.log('购物车清空');
            $mainpartBox.innerHTML = '';
            var $arr = [];
            var str = `
            <div class="temai_clock">
                <a href="#">
                    特卖商品
                    <span id="twenty_clock"></span>
                </a>
                <span class="shugang"></span>
                <a href="#">
                    唯品医药
                </a>
            </div>
            <div class="mainpart_top">
                <div class="mainpart_top_left">

                </div>
                <div class="mainpart_top_right">
                    <h3>购物袋空空如也，</h3>
                    <p>快去抢购心仪商品吧~</p>
                    <button class="yijian_btn">
                        <a href="#" style="color:#fff;font-size:16px">立即抢购</a>
                    </button>
                </div>
            </div>
            <div id="footer_wrapper">
                <div class="footer content"></div>
            </div>
            `
            $arr.push(str);
            $mainpartBox.innerHTML = $arr.join('');
        }
    }
}())