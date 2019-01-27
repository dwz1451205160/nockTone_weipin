function getClock(targetDate,ele){

    //目标日期字符串到格林尼治时间的毫秒数
    targetDate = Date.parse(targetDate);
    
    var timer = setInterval(_ => {
    //当前时间到格林尼治时间的毫秒数
    var nowDate = Date.now();
    var secondDifference = parseInt(Math.abs(targetDate - nowDate)/1000);
    var second = secondDifference % 60;
    var minute = Math.floor(secondDifference / 60) % 60;
    var hour = Math.floor(secondDifference / 60 / 60) % 24;
    var day = Math.floor(secondDifference / 60 / 60 / 24);
    ele.innerHTML = `剩余：${day}天${hour}时${minute}分${second}秒`;
    },1000)
}


