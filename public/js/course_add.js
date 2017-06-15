define(['jquery','util','form','validate'],function($,util) {
	util.setMenu(location.pathname);
	
	$("#courseAddForm").validate({
		
		sendForm : false,
		valid : function(){
            $(this).ajaxSubmit({
            	type: 'post',
            	url: '/api/course/create',
            	data: {cs_name: $("#cs_name").val()},
            	success: function(data) {
            		location.href = '/course/basic?cs_id=' + data.result.cs_id;
            	}
            });

        }
	});
});