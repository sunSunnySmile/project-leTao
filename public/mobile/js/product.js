$(function() {
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function(params) { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    setTimeout(function() {
                        queryProductDetail(
                            function() {
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                mui(".mui-slider").slider({
                                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0
                                });
                                mui(".mui-numbox").numbox();
                            }
                        );
                    }, 1000);
                }
            }
        }
    });


    // 获取商品详细信息
    function queryProductDetail(callback) {
        var id = $.getURLParams("productId");
        $.ajax({
            url: "/product/queryProductDetail?id=" + id,
            success: function(result) {

                var start = result.size.split("-")[0];
                var end = result.size.split("-")[1];
                var arr = [];
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                result.sizeArr = arr;
                var html = template("mainTpl", result);
                $(".view ul").html(html);
                // console.log(result);
                callback && callback(result);
            }
        });
    }
    // 使用事件委托的方式 绑定 因为  这个标签是动态生成
    $(".view ul").on("tap", ".p_size", function() {
        $(this).addClass("active").siblings().removeClass("active");
    })

    // 添加到购物车
    $(".add_toCar").on("tap", function() {
        /* 
    1 判断 是否选择了尺寸 判断是否有 active
    2 判断是否选择了数量 >0
    3 都满足 - 其他逻辑
     */
        var size = $(".p_size.active").html();
        var num = $(".mui-numbox-input").val();

        if (!size) {
            mui.toast("请选择尺码");
            return false;
        }

        if (num < 1) {
            mui.toast("请输入数量");
            return false;
        }
        // 其他逻辑 
        /* 
        1 要添加到购物车  谁的购物车 -  谁登录就是谁
        2 调用接口 根据返回值 做处理  {success:true}  {error:400 }
         */
        var option = {
            url: "/cart/addCart",
            type: "post",
            data: { productId: $.getURLParams("productId"), num: num, size: size },
            success: function(result) {
                mui.confirm("是否要跳转到购物车页面", "成功添加", ["跳转", "不跳"], function(e) {
                    if (e.index == 0) {
                        alert("跳");
                    } else if (e.index == 1) {
                        // 不跳转
                    }
                })
            }
        }
        $.LtAjax(option);
    })
});