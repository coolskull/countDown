;
(function ($) {

    var countDown = {

        init: function (opts, $obj) {
            var self = this;
            self.opts = opts;
            self.$obj = $obj;
            // 那每秒走的角度，每秒的形状
            opts._stepAngle = 2 / opts.duartion * Math.PI;
            opts._passedTime = 0;
            var $canvas = $("<canvas width='210' height='210'><p>Your browser doesn'/t support canvas.</p></canvas>");
            var $time = $(" <div class='time_container'><div class='time'>" +
                "<div id='timerSecond'>01:00</div></div></div>");

            $obj.append($canvas);
            //$obj.append($time);
            // 设置canvas
            var drawingCanvas = $obj.find('canvas');
            self.context = drawingCanvas[0].getContext('2d');

            var duartion = opts.duartion;
            self.timer =setTimeout(function(){
                setInterval(self.countTime(), 1000);
            },duartion*1000) ;




            var passedTime = Date.now() - startTime;
            if (passedTime < DURATION) {

            }


        },

        countTime: function () {
            var self = this;
            self.opts._passedTime++;
            self.DrawArc();
            //self.CountText();
        },
        DrawArc: function () {
            var self = this;
            var context = self.context;
            context.clearRect(0, 0, 210, 210);
            self.DrawBaseCircle();
            self.DrawMoveCircle();


        },
        DrawBaseCircle: function () {
            var self = this;
            var cavas = self.opts.canvas;
            var context = self.context;
            context.strokeStyle = cavas.strokeStyle;
            context.fillStyle = cavas.fillStyle;

            context.lineWidth = 1;
            context.beginPath();
            context.arc(cavas.X, cavas.Y, cavas.radius, 0, 2 * Math.PI, cavas.direction);
            context.closePath();
            context.stroke();
        },

        DrawMoveCircle: function () {
            var self = this;
            var opts = self.opts;
            var canvas = opts.canvas;
            var context = self.context;

            context.lineWidth = 5;
            context.beginPath();

            var ea = opts._passedTime * opts._stepAngle + canvas.sa;//设置弧线的终点
            context.arc(canvas.X, canvas.Y, canvas.radius, canvas.sa, ea, false);
            context.stroke();
        },
        CountText: function () {
            var self = this;
            var passedTime = self.opts._passedTime;
            var duartion = self.opts.duartion;
            var $obj = self.$obj;
            var second = duartion - passedTime;
            if (second < 10) {
                second = '0' + second;
            }
            //$('#timerSecond').html("00:" + second);
            $obj.find('#timerSecond').html("00:" + second);
        }


    };


    $.fn.countDown = function (options) {

        var opts = $.extend({}, $.fn.countDown.defaults, options);

        if ($.isPlainObject(opts)) {

            return this.each(function () {
                var $obj;
                $obj = $(this);
                var countDownObj = Object.create(countDown);
                countDownObj.init(opts, $obj);
                $(this).data('countDownObj', countDownObj);

            });
        }


    }

// 设置成60秒
//    var timer;//计时器
    $.fn.countDown.defaults = {
        "duartion": 60,
        // 下面这几个参数是为画加载弧线准备的
        "canvas": {
            "radius": 100, // 半径
            "X": 105,      // 圆心x
            "Y": 105,      // 圆心Y
            "sa": -180 / 360 * Math.PI,//设置弧线的起点
            "direction": false,//set false for anticlockwise
            "strokeStyle": '#35b544',
            "fillStyle": '#35b544'
        }
    };


//function retryTime() {
//
//    $('#btn_retry').click(function () {
//        $('#timerSecond').parents('.time_container').removeClass('loading');
//        setTimeout(function () {
//            $('#timerSecond').parents('.time_container').addClass('loading');
//        }, 100);
//        Init();
//    });
//
//}
//
//function stopTime() {
//    $('#timerSecond').html("00:00");
//    clearInterval(timer);
//}


})(jQuery);