var shopList = (function(){
    var $shopBox = document.querySelector('.fdj_middle_right');
    // var index = 0;
    
    
    return {
        init() {
            this.getData();
            this.event();
        },
        event() {
            var _this = this;
            $shopBox.onmouseenter = function() {
              
                console.log(_this.buttonall);
                _this.buttonall[0].onclick = function(){
                    console.log('jian')
                }
                
            }
            // console.log(_this.buttonall);
            // this.buttonall[0].onclick = function(){
            //     console.log("jian")
            // }

        },
        //获取数据
        getData() {
            var _this = this;
            sendAjax("http://localhost:8888/nockTone_weipin/server/php/trade_info.php",{
                method:'get'
            }).then(data => {
                _this.data = JSON.parse(data);
                _this.insertData(_this.data);
            })
        },
        //渲染数据
        insertData(data) {
            // data = this.data;
            // console.log(this);
            // var _this = this;
            console.log(data)
            //整个空数组，解决字符串渲染效率低的问题
            var arr = []
            var str = `<p>OTHER MIX</p>
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
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </dd>
            </dl>
            <button>加入购物车</button>`
            arr.push(str);
            $shopBox.innerHTML = arr.join('');
            
            this.buttonall = document.querySelectorAll('button');
            console.log(this.buttonall);
            
           
        },
        //设置数据
        setData(){

        }
    }
}());
shopList.init();