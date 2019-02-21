var shopPark = (function () {
    // var $shopCarBox = document.querySelector('.mainpart_bottom');
    var $shopCarTbody = document.querySelector('tbody');
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
                        <tr index=${i}>
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
            `
                $arr.push(str);
            }


            // $div.innerHTML = $arr.join('');
            $shopCarTbody.innerHTML = $arr.join('');
            

        }
    }
}())