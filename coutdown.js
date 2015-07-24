(function () {
    var DURATION = 6000;//这个总的60000ms=60S=1MIN

    var startTime = 0;
    //下面这几个参数是为画加载弧线准备的
    var br = 100;//半径
    var X = 105;//圆心x
    var Y = 105;//圆心Y
    var sa = -180 / 360 * Math.PI;//设置弧线的起点
    var direction = false;//set false for anticlockwise

    var drawingCanvas = document.getElementById('sampleCanvas');
    var context = drawingCanvas.getContext('2d');
    var timer;//计时器

    function countTime() {
        var passedTime = Date.now() - startTime;
        if (passedTime < DURATION) {
            DrawArc(passedTime);
            CountText(passedTime);
        }
        else {
            document.getElementById('timerSecond').innerText = "00:00";
            $('#btn_retry').click(function(){
                $('#timerSecond').parents('.time_container').removeClass('loading');
                setTimeout(function () {
                    $('#timerSecond').parents('.time_container').addClass('loading');
                },100);
                Init();
            });
            clearInterval(timer);
        }
    }

    function DrawArc(passedTime) {
        context.clearRect(0, 0, 210, 210);

        context.strokeStyle = '#35b544';
        context.fillStyle = '#35b544';

        context.lineWidth = 1;
        context.beginPath();
        context.arc(X, Y, br, 0, 2 * Math.PI, direction);
        context.closePath();
        context.stroke();

        context.lineWidth = 5;
        context.beginPath();

        var ea = passedTime / DURATION * 2 * Math.PI + sa;//设置弧线的终点
        context.arc(X, Y, br, sa, ea, false);
        context.stroke();
    }

    function CountText(passedTime) {
        var second =60-Math.round(passedTime / 1000);
        if (second < 10) {
            second = '0' + second;
        }
        document.getElementById('timerSecond').innerText = "00:" + second;
    }

    function Init() {
        startTime = Date.now();
        timer=setInterval(countTime, 60);
    }

    $(function () {
        Init();
    });
})();