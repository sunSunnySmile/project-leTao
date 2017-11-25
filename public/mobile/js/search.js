$(function() {
    historyLoading();

    // 点击搜索按钮 - 跳转页面    
    // 存贮搜索历史
    // 对搜索历史做修改 本地存贮的技术 localstorage
    // 点击返回 - > 返回上一页面

    // 跳转到页面的时候，动态获取本地存储的历史数据，并渲染到页面----封装函数（获取本地存储的历史数据）
    //     1 从本地读取localstorage  key:LT_his value:[]
    //    1.1 先获取: 有数据就获取数据 无 就获取空数组 !!
    function historyLoading() {
        var ls = localStorage;
        var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
        // console.log(arr);
        // 1.2 判断是否有数据，没有 ，内容就为空，有就加载到页面----模板引擎
        if (arr.length < 1) {
            $(".history_list").html("");
            return;
        }
        // 如果有数据就要遍历---需要拼接的内容
        //  <div class="hl_item mui-clearfix">
        //     <span class="hl_word">123</span>
        //     <span class="mui-icon mui-icon-closeempty hl_item_clear"></span>
        // </div>
        var strArr = [];
        for (var i = 0; i < arr.length; i++) {
            strArr.push('<div class="hl_item mui-clearfix"> <span class ="hl_word">' + arr[i] + '</span><span class = "mui-icon mui-icon-closeempty hl_item_clear"></span></div>');
        }
        $(".history_list").html(strArr.join(''));
        // $(".history_list").html("123");
    }
    // 2.点击搜索按钮 - 跳转页面:为搜索按钮注册事件
    // 点击后，先判断去重，再将数据存入本地存储中，然后再读取出来渲染到页面
    $(".search_btn").on("tap", function() {
            var val = $(".search_content").val();

            // 判断是否为空
            if (!$.trim(val)) {
                return false;
            }
            var ls = localStorage;
            var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
            // console.log(arr);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                }
            }
            // arr.push(val);
            arr.unshift(val);


            ls.setItem("LT_his", JSON.stringify(arr));
            // console.log(ls)
            // historyLoading();
            // alert(123);
            location.href = "searchList.html?key=" + val;
        })
        // 3.清空本地存储
    $(".clear_all").on("tap", function() {
        localStorage.setItem("LT_his", JSON.stringify(""));
        historyLoading();
    })

    // 4.点击删除单条数据----因为点击的数据是动态生成，所以要用事件委托，给body注册事件
    // 点击将该元素所在的父元素从数组中删除，再将剩下的数据渲染到页面
    $("body").on("tap", ".hl_item_clear", function() {
        var ls = localStorage;
        var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
        var index = $(this).parent().index();
        arr.splice(index, 1);
        ls.setItem("LT_his", JSON.stringify(arr));
        historyLoading();
        // alert(1);

    })





});