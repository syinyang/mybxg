define(['jquery','util','template'],function($,util,template) {
	util.setMenu('/teacher/list');
	
	function submitForm(url) {
		$("#addTeacherBtn").click(function() {
			$.ajax({
				type: 'post',
				url: url,
				dataType: 'json',
				data: $("#addTeacherForm").serialize(),
				success: function(data) {
					if(data.code == 200) {
						location.href = '/teacher/list';
					}
				}
			});
		});
	}
	var tcId = util.qs('tc_id',location.search);
	if(tcId) {

		

		$.ajax({
			url: '/api/teacher/edit',
			data: {
				tc_id: tcId
			},
			dataType: 'json',
			success: function(data) {
				$("#navFlag").html("讲师编辑");
				var html = template('teacherFormTpl',data.result);
				$("#teacherFormInfo").html(html);

				submitForm('/api/teacher/update');
			}
		});
	}else {
		

		$("#navFlag").html("讲师添加");
		var html = template('teacherFormTpl',{});
		$("#teacherFormInfo").html(html);

		submitForm('/api/teacher/add');
	}
	
	
});