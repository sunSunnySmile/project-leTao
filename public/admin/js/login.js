/**
 * bootstrapValidator插件验证表单
 * 验证非空，并对空字符串做出相应的反应
 * 进度条--nprogress
 * 自动登录-----设置模拟点击
 * 验证通过时，发送ajax请求，进入登录页面
 * 
 */
$(function() {
    $('form').bootstrapValidator({
            // 图标　（自己理解：可以算是初始化设置）
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'　　　　　　　　
            },
            // 要验证的字段
            fields: {
                // 用户名 input 标签 的 name属性 
                username: {
                    // 验证规则
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        // 提供给Ajax的回调函数
                        callback: {
                            message: "用户名不存在"
                        }
                    }
                },
                // 密码 input 标签 的 name属性
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        // 密码长度---6~18位
                        stringLength: {
                            min: 6,
                            max: 18,
                            message: '用户名长度必须在6到18位之间'
                        },
                        callback: {
                            message: "密码错误"
                        }
                    }
                }
            }
        })
        .on("success.form.bv", function(e) { //此处是省略了事件对象，是给上一个$('form')对象绑定了事件（事件可以去html中引入的js文件中找到）---链式编程
            // 点击登录时，阻止它的默认提交
            e.preventDefault();
            var $form = $(e.target);
            // 提交给后台，发送ajax请求，实现登录
            // console.log($form);
            // console.log($form.serialize());

            $.ajax({
                url: "/employee/employeeLogin",
                type: "post",
                data: $form.serialize(),
                success: function(result) {
                    // 登录失败：用户名不存在或是密码错误
                    // 登录成功：跳转到首页
                    if (result.error && result.error == 1000) {
                        $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    } else if (result.error && result.error == 1001) {
                        $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                    } else {
                        location.href = "/admin/index.html";
                    }
                }
            })
        });
    // 进度条
    $(window).ajaxStart(function() {
        NProgress.start();
    });
    $(window).ajaxStop(function() {
        NProgress.done();
    });
    // 模拟点击
    $("button[type='submit']")[0].click();
});