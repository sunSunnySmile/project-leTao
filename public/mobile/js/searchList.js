// tips:注意查看文档和api
$(function() {
    // 设置全局查询对象
    var queryObj = {
        proName: "",
        brandId: "",
        price: "",
        num: "",
        page: 1,
        pageSize: 6
    };
    //上一个页面跳转过来的时候是带参数跳转，所以获取url中的参数，然后作为值传递给后台获取数据---获取的是url中key的值
    queryObj.proName = getURLParams("key");
    // 页面数据的总条数
    var Count = 1;
    // 下拉、上拉刷新----mui组件
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function() { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    // 1.2进入页面时，默认下拉刷新，发送请求，获取数据，动态渲染页面内容（提前写好发送请求，这里可以直接调用----设置定时器，模拟网速不好的时候的页面刷新，否则太快看不出效果）
                    setTimeout(function() {
                        queryObj.page = 1; //设置页数

                        queryProduct(function(result) {
                                Count = result.count;
                                // console.log(result);

                                var html = template("prolistTpl", result);
                                $(".product_list").html(html);
                            })
                            // 关闭刷新图标
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh(false);
                        // 并刷新图标，让下一次可以继续下拉刷新
                        mui('#refreshContainer').pullRefresh().refresh(true);
                    }, 1000);
                }
            },
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function() { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    // 上拉加载下一页----需知道共有多少页和当前页
                    queryProduct();
                    var pageTotal = Math.ceil(Count / queryObj.pageSize);
                    setTimeout(function() {
                        if (queryObj.page < pageTotal) {
                            queryObj.page++;
                            queryProduct(function(result) {
                                var html = template("prolistTpl", result);
                                $(".product_list").append(html);
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                            });
                        } else {
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                        }
                    }, 2000);
                }
            }
        }
    });

    /**
     *  1 进入页面的时候初始化数据----发送异步请求获取产品相关数据       
     * a 获取url的参数 ?key=1 -> 1         
     * b 拼接url         
     * c 渲染数据
     */
    // 1.发送异步请求获取产品相关数据
    function queryProduct(callback) {
        $.ajax({
            url: "/product/queryProduct",
            data: queryObj,
            success: function(result) { //查询数据成功之后，如果有回调函数，则执行回调函数
                callback && callback(result);
                // console.log(result);
            }
        })
    };

    // 获取url的参数 ?key=1 -> 1 
    function getURLParams(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    // 点击搜索框跳转---就是点击发松请求给后台获取数据后渲染，输入的val值就是发送请求时proName的值
    $(".search_btn").on("tap", function() {
        var val = $(".search_content").val();
        if (!$.trim(val)) {
            // 判断输入的内容是否为空
            mui.toast('请输入关键字');
        } else { //不为空则赋值给proName，然后发送请求渲染页面
            queryObj.proName = val;
            // 手动触发下拉刷新
            mui("#refreshContainer").pullRefresh().pulldownLoading();
        }
    })

    // 点击排序
    $(".lt_sort_bar>a").on("tap", function() {
        $(this).addClass("active").siblings().removeClass("active");
        $(this).find(".mui-icon").toggleClass("mui-icon-arrowdown  mui-icon-arrowup");
        var sort = -1;
        if ($(this).find(".mui-icon").hasClass("mui-icon-arrowup")) {
            sort = 1;
        } else {
            sort = 2;
        }
        // 获取要排序的关键字-----根据关键字判断点击的是哪个键 price num
        if ($(this).data("sortname") == "price") {
            queryObj.price = sort;
            queryObj.num = "";
        } else if ($(this).data("sortname") == "num") {
            queryObj.num = sort;
            queryObj.price = "";
        }
        // 手动触发下拉刷新
        mui("#refreshContainer").pullRefresh().pulldownLoading();
    })




});