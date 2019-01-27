var shopList = (function () {
    var $shopBox = document.querySelector('.fdj_middle_right');
    
    //声明一个全局count
    var count = 1;
    return {
        init() {
            this.getData();
            this.event();
        },
        event() {
            
            var _this = this;
            $shopBox.onmouseenter = function () {
                
                _this.buttonall[2].onclick = function () {
                     //把数量添加到数据中
                    var obj ={
                        count:1,
                        ..._this.data
                    }
                   _this.setData(obj);
                  
                    console.log('tijiao')
                }
                _this.buttonall[0].onclick = function () {
                    count--;
                    if(count < 1){
                        count = 1;
                        //此时按钮不能点击
                        this.disabled = true;
                        this.style = "cursor:not-allowed";
                        alert('本商品默认一件起售'); 
                    }
                    _this.data.count = count;
                    this.nextElementSibling.innerHTML = count;    
                }
                _this.buttonall[1].onclick = function () { 
                    //减按钮可以点击
                    this.previousElementSibling.previousElementSibling.disabled = false;
                    this.previousElementSibling.previousElementSibling.style = "cursor:pointer";  
                    count++;
                    _this.data.count = count;
                    this.previousElementSibling.innerHTML = count;
                    console.log('jia')
                }
            }

        },
        //获取数据
        getData() {
            var _this = this;
            sendAjax("http://localhost:8888/nockTone_weipin/server/php/trade_info.php", {
                method: 'get'
            }).then(data => {
                _this.data = JSON.parse(data);
                _this.insertData(_this.data);
            })
        },
        //渲染数据
        insertData(data) {
        
           
            //整个空数组，解决字符串渲染效率低的问题
            var arr = []
            var $div = document.createElement('div');
            var str = `
            <div id=${data.id}>
            <p>${data.brand}</p>
            <span>剩余：

            </span>
            <h2>${data.tradename}</h2>
            <p>白搭单品 透气不闷脚</p>
            <h1>￥${data.price}</h1>
            <dl>
                <dt>配送</dt>
                <dd>深圳市</dd>
            </dl>
            <dl>
                <dt>运费</dt>
                <dd>￥10</dd>
            </dl>
            <dl>
                <dt>尺码</dt>
                <dd>${data.size}</dd>
            </dl>

            <dl>
                <dt>数量</dt>
                <dd>
                    <button style="cursor: pointer">-</button>
                    <span>1</span>
                    <button style="cursor: pointer">+</button>
                </dd>
            </dl>
            <button>加入购物车</button>
            </div>
            `
            arr.push(str);
            $shopBox.innerHTML = arr.join('');

            this.buttonall = document.querySelectorAll('button');
            console.log(this.buttonall);


        },
        //设置数据
        setData(data) {
            //声明一个本地缓存的变量
            var shopList = localStorage.getItem("shopList") || '[]';
            shopList = JSON.parse(shopList);
            for(var i = 0;i < shopList.length;i++){
                if(data.id == shopList[i].id){
                    shopList[i].count += data.count;
                    break;
                }
            }
            //如果走到这里说明商品不存在
            if(i == shopList.length){
                shopList.push(data);
            };
            localStorage.shopList = JSON.stringify(shopList);
            console.log(localStorage.shopList);
            alert('添加购物车成功');
        }
    }
}());
shopList.init();