(function($) {
    // 设置a标签默认跳转，因为mui中a标签是设置默认不跳转
    $("body").on("tap", "a", function() {
        location.href = $(this).attr("href");
    })

    $.extend($, {
        // 获取url上的参数
        getURLParams: function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        LtAjax: function(option) {
            $.ajax({
                url: option.url,
                type: option.type || "get",
                data: option.data || "",
                success: function(result) {
                    if (result.success) {
                        option.success && option.success(result);
                    } else if (result.error == 400) {
                        location.href = "login.html?returnUrl=" + location.href;
                    }
                }

            })
        }
    })

})(Zepto);