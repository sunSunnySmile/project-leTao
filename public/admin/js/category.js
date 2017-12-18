$(function() {
    // 跳转过来的时候，获取数据，渲染到页面    
    // 全局查询参数
    var QueryPage = {
        page: 1,
        pageSize: 5,
        totalPage: 1
    }
    queryTopCategoryPaging();
    // 获取一级分类页面数据
    //   接口地址:/category/queryTopCategoryPaging
    function queryTopCategoryPaging(callback) {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: QueryPage,
            success: function(result) {
                console.log(result);
                // 根据获得的结果计算总页数
                QueryPage.totalPage = Math.ceil(result.total / result.size);
                // console.log(QueryPage);
                // 渲染数据
                var html = template("cateTableAdd", result);
                $(".cateAddTable").html(html);
                callback && callback();
            }
        })
    };
    // 设置分页








});