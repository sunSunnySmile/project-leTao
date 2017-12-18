$(function() {
    $(".category_menu").on("click", function() {
        $(this).find(".sub_menu").slideToggle();
    });
    $(".slider_menu").on("click", function() {
        $(".view").toggleClass("p0");
    });

    // 点击确认退出到登录页面-----点击有跳转就需要发送Ajax请求，请求数据
    $(".logOut_go").on("click", function() {
        // 端口：/employee/employeeLogout
        $.ajax({
            url: "/employee/employeeLogout",
            success: function(result) {
                if (result.success) {
                    location.href = "/admin/login.html";
                }
            }
        })
    })

});