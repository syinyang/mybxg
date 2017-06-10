define(['jquery','template'],function($,template) {
	$.ajax({
		dataType: 'json',
		url: '/api/teacher',
		success: function(data) {
			console.log(data);
			if(data.code == 200) {
				var html = template('tealistTpl',{list: data.result});
				$(".table tbody").html(html);
			}
		}
	});
});