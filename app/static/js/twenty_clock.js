function getTwentyClock(targetDate, ele) {
    var nowDate = targetDate;
    var str = 'start';
    //目标日期字符串到格林尼治时间的毫秒数
    targetDate = targetDate + 20000;
    return new Promise((resolve, reject) => {
        var timer = setInterval(_ => {
            //当前时间到格林尼治时间的毫秒数
            nowDate += 1000;
            var secondDifference = parseInt(Math.abs(targetDate - nowDate) / 1000);
            var second = secondDifference % 60;
            if (second <= 9) {
                second = '0' + second;
            }
            var minute = Math.floor(secondDifference / 60) % 60;
            if (minute <= 9) {
                minute = '0' + minute;
            }
            if (targetDate >= nowDate) {
                ele.innerHTML = `${minute} : ${second}`;
                // str = "jixu";
                // resolve(str);
            } else {
                ele.innerHTML = '';
                str = 'jieshu';
                console.log(str);
                clearInterval(timer);
                resolve(str);
            }

        }, 1000)
    })

}