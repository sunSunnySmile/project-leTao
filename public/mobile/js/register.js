$(function() {
    var VCODE = null;
    // 点击注册
    /* 
        1 验证 手机号码
        使用正则表达式去做验证!!! 
        2 验证密码 1
        长度不能少于6 
        3 验证 重复密码
        拿两个密码对比 
        4 验证认证码 
        a 验证非空 - 6位数
        b 验证和后台的认证码是否一致 
        c 倒计时 不能多次点击 
            tap 点击 
            0 判断是否可以二次点击 
            1 发送ajax 成功  设置VCODE 
            2 开启倒计时 
                文字修改 
                按钮不可以再次点击 
            3 倒计时时间到了
                重新允许点击
        5 发送请求-注册 
        成功 提示  
        失败 提示
        */
    $(".registerBtn").on("tap", function() {
        // 定义一组全局变量获取表单数据
        var data = {
            username: $.trim($(".pho_number").val()),
            password: $.trim($(".Lt_password").val()),
            mobile: $.trim($(".pho_number").val()),
            vCode: $.trim($(".vCode").val())
        };

        // 1.用正则验证手机号码----百度
        if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(data.mobile)) {
            mui.toast("请输入合法手机号");
            return false;
        }

        // 2.验证密码
        if (data.password.length < 6) {
            mui.toast("请输入合法密码");
            return false;
        }

        // 3.验证重复密码
        if (data.password !== $.trim($(".Lt_password2").val())) {
            mui.toast("两次密码不一致，请正确输入");
            return false;
        }

        // 4.验证验证码
        if (data.vCode.length != 6) {
            mui.toast("请输入合法的验证码");
            return false;
        }

        if (data.vCode !== VCODE) {
            mui.toast("验证码错误");
            return false;
        }
        // 6.提交数据注册
        $.ajax({
            url: "/user/register",
            type: "post",
            data: data,
            success: function(result) {
                // console.log(result);
                if (result.success) {
                    mui.toast("注册成功");
                    setTimeout(function() {
                        location.href = "login.html";
                    }, 1000);
                }
                if (result.error && result.error == 403) {
                    // 用户名已经存在
                    mui.toast(result.message);
                }
            }
        });
    });

    // 5.获取验证码
    $(".getCodeBtn").on("tap", function() {
        // 点击后判断是否能点击---不能点击则中断执行后面的代码
        if ($(this).attr("disabled")) {
            return false;
        }
        // 如果可以点击，加属性，让它不能再次点击
        $(this).attr("disabled", true);
        // this 增加属性后，指向变了，所以将this赋值给另一个变量，才能找到原来的this所指向的元素
        var that = this;
        $(that).html("正在发送。。。");
        // 发送请求获取验证码
        $.ajax({
            url: "/user/vCode",
            type: "get",
            success: function(result) {
                console.log(result);
                VCODE = result.vCode;
                // 开启倒计时
                var time = 60;
                var timeId = setInterval(function() {
                    time--;
                    $(that).html(time + "秒后再获取");
                    if (time == 0) {
                        clearInterval(timeId);
                        $(that).removeAttr("disabled");
                        $(that).html("获取验证码");
                    }
                }, 1000)

            }
        });

    })


});