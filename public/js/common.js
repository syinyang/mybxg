define(['jquery','template','cookie'],function($,template) {
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	$("#logout").click(function() {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/api/logout',
            success: function(data) {
            	$.removeCookie('loginInfo',{path: '/'});

                location.href = '/login';
            }
        });
    }); 

	var pathname = location.pathname;
	//当cookie不好用的时候，这里还有另一种写法，直接用PHPSESSID判断有没有登录
	//用cookie判断不严谨。。。具体为什么，暂时没听懂
    var loginInfo = $.cookie('loginInfo') && JSON.parse($.cookie('loginInfo'));
    // console.log(loginInfo);
    if(loginInfo){

    	var loginTpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
        
        var html = template.render(loginTpl,loginInfo);  
        $("#loginInfoTpl").html(html);
        
    	// $('.aside .profile').find('img').attr('src',loginInfo.tc_avatar);
    	// $('.aside .profile').find('h4').html(loginInfo.tc_name);

    }else if(pathname != '/login'){
    	location.href = '/login';
    	// console.log(12);
    }
});

	