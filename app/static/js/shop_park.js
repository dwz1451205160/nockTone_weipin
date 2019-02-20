var shopPark = (function () {
    var $shopCarBox = document.querySelector('.mainpart_bottom');
    var $insertBox = document.querySelector('.insert_box');
    return {
        init() {
            this.getData();
            this.event();
        },
        event() {

        },
        //获取本地缓存
        getData() {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            this.insertData(shopList);
        },
        //渲染数据
        insertData(data) {
            this.data = data;
            var $arr = [];
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var str = `
                <div index=${i}>
                    <div class="shopcar_table">
                        <table cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th style="width:600px">精选特卖</th>
                                    <th>单价</th>
                                    <th>数量</th>
                                    <th style="border-right: 1px solid #e0e0e0">小计</th>
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
                                                <a href="#">${item.tradename}</a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    ￥${item.price}
                                    </td>
                                    <td>          
                                        ${item.count}                                            
                                    </td>
                                    <td id="price" style="border-right: 1px solid #e0e0e0">￥ ${item.count * item.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            `
                $arr.push(str);
            }


            // $div.innerHTML = $arr.join('');
            $insertBox.innerHTML = $arr.join('');
            $shopCarBox.appendChild($insertBox);

        }
    }
}())