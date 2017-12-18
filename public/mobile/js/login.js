$(function() {
    // 为登录注册事件
    $(".loginBtn").on("tap", function() {
        // 获取用户输入的用户名和密码
        var userName = $(".Lt_userName").val();
        var userPwd = $(".Lt_password").val();
        // 判断用户输入的内容是否为空
        if (!$.trim(userName)) {
            mui.toast("请输入合法的用户名");
            return false;
        }

        if (!$.trim(userPwd)) {
            mui.toast("请输入合法密码");
            return false;
        }

        // 登录要发送Ajax请求再登录
        $.ajax({
            url: "/user/login",
            type: "post",
            data: $("form").serialize(),
            success: function(result) {
                // 请求数据成功后：a.登录成功，回到原来的页面，或是跳转到首页
                // b.登录失败，弹出提示信息
                if (result.success) {
                    if ($.getURLParams("returnUrl")) {
                        console.log(location.href);
                        location.href = $.getURLParams("returnUrl");

                    } else {
                        location.href = "/mobile/index.html";
                    }
                } else {
                    mui.toast(result.message);
                }
            }
        })





    })







});