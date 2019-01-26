function sendAjax(url,obj){
    const xhr = new XMLHttpRequest();
    //设置默认值
    const _default = {
        method: 'GET',
        data: null
    }
    //替换默认值
    for(let i in _default){
        if(i in obj){
            _default[i] = obj[i];
        }
    }
    //强制转大写
    _default.method = _default.method.toUpperCase();
    //判断请求方式
    if(_default.method == 'GET'){
        var flag = url.indexOf('?') == -1 ? '?' : '&';
        url += flag;
        //把data拼接到url中
        for(var key in _default.data){
            var keyValue = `${key}=${_default.data[key]}`;
            url += keyValue + '&'
        }
        url += `_=${Date.now()}`;
        console.log('get拼接后的url是：'+ url);
        _default.data = null;

    }else if(_default.method == 'POST'){
        _default.data = JSON.stringify(_default.data);
    };
    xhr.open(_default.method,url,true);
    xhr.send(_default.data);
    return new Promise((resolve,reject) => {
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    var data = xhr.responseText;
                    resolve(data);
                }else{
                    var data = xhr.responseText;
                    reject(data);
                }
            }
        }
    })
}