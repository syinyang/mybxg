define(['jquery','template','bootstrap'],function($,template) {
	$.ajax({
		dataType: 'json',
		url: '/api/teacher',
		success: function(data) {
			// console.log(data);
			if(data.code == 200) {
				var html = template('tealistTpl',{list: data.result});
				$(".table tbody").html(html);

				$("#teacherInfo").find(".preview").click(function() {
					var tcId = $(this).closest('td').attr('data-id');
					$.ajax({
						url: '/api/teacher/view',
						dataType: 'json',
						data: {
							tc_id: tcId
						},
						success: function(data) {
							data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g,' ');
							var html = template('teacherModalInfoTpl',data.result);
							$("#teacherModalInfo").html(html);
							$("#teacherModal").modal();
						}
					});
					return false;
				});
			}
		}
	});
});