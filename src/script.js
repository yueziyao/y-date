/**
 * Created by Alex on 2017/3/9.
 */
;(function ($, window, document,undefined) {
    var DP = function (target,opt) {
        this.DPTemplate =  '<div class="dp-table">'+
            '<div class="dp-header">'+
            '<div class="base-box">日</div>'+
            '<div class="base-box">一</div>'+
            '<div class="base-box">二</div>'+
            '<div class="base-box">三</div>'+
            '<div class="base-box">四</div>'+
            '<div class="base-box">五</div>'+
            '<div class="base-box">六</div>'+
            '</div>'+
            '<div class="dp-body"></div>'
            '</div>',
        this.o = target,
        this.defaults = {
            month:2,
            data:''
        },
        this.options = $.extend({},this.defaults,opt)
    }
    DP.prototype = {
        init:function() {
            this.o.html(this.DPTemplate);
            var html = "";
            //填充本月不显示的日期
            var d = new Date(),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                //本日周几
                curDayWeek = d.getDay(),
            //当月天数
                curMonthDays = new Date(d.getFullYear(), (d.getMonth()+1), 0).getDate();
            for(var m=0;m<this.options.month;m++){
                //当前循环年、月、日
                var d = new Date();
                d.setMonth(month+m);
                var curyear = d.getUTCFullYear();
                var curMonth = d.getUTCMonth();
                if(m !=0){
                    d.setDate(1);
                    curMonthDays = new Date(d.getFullYear(), (d.getMonth()+1), 0).getDate();
                    curDayWeek = d.getDay();
                }
                //组建表头
                html = html+"<div class='month-header'>"+curyear+"年"+(curMonth+1)+"月"+"</div>";
                /*
                 循环计算填充天数
                 星期1-6 填充 1-6个空格
                 当为周日时，是第一个，返回
                 */
                for(var i=0;i<curDayWeek && i < 7;i++){
                    html = html+"<div class='base-box space'>&nbsp;</div>"
                }
                /*
                 循环填充本月剩余日期
                 */
                for(var n =d.getDate();n<curMonthDays+1 && i < 7;n++){
                    //价格填充逻辑
                    var price ="";
                    try{
                        price = this.options.data[curyear][curMonth+1][n].price;
                    }catch (e){
                        //获取不到就跳过
                        price = "&nbsp;"
                    }

                    html = html+"<div class='base-box'><span class='day'>"+n+"</span>" +
                        "<span class='price'>"+price+"</span></div>"
                }
                html = html+"<div class='clear'></div>"
            }
            this.o.find(".dp-body").html(html);
        }
    }
    //在插件中使用DP对象
    $.fn.dp = function(options) {
        //创建dp的实体
        var dp = new DP(this, options);
        //调用其方法
        return dp.init();
    }

})(jQuery, window, document);
