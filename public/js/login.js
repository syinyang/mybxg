define(['jquery','cookie'],function($) {
	$("#loginId").click(function() {
        $.ajax({
            type: 'post',
            dataType: 'json',
            data: $("#form").serialize(),
            url: '/api/login',//反向代理  （配置虚拟主机时加一段代码，映射）
            success: function(data) {
                if(data.code == 200) {
                	$.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    location.href = '/index/index';

                }
            }
        });
        return false;
    });
});