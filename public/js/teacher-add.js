define(['jquery','util','template','form','validate'],function($,util,template) {
	util.setMenu('/teacher/list');
	
	function submitForm(url) {

		$("#addTeacherForm").validate({
			sendForm: false,
			eachInvalidField: function() {
				console.log(1)
			},
			eachValidField: function() {
				console.log(2)
			},
			valid: function() {
				//全部有效，进行如下操作,提交表单
				$(this).ajaxSubmit({
					type: 'post',
					url: url,
					success: function(data) {
						if(data.code == 200) {
							location.href = '/teacher/list';
						}
					}
				});

			},
			description: {
				tcName: {
					required: '姓名不能为空',
					valid: '姓名可以使用'
				},
				tcPass: {
					required: '密码不能为空',
					pattern: '密码必须是6位',
					valid: '密码可以使用'
				},
				tcJoinDate: {
					required: '日期不能为空',
					valid: '日期可以使用'
				}
			}
		});
		// $("#addTeacherBtn").click(function() {

			
			// $.ajax({
			// 	type: 'post',
			// 	url: url,
			// 	dataType: 'json',
			// 	data: $("#addTeacherForm").serialize(),
			// 	success: function(data) {
			// 		if(data.code == 200) {
			// 			location.href = '/teacher/list';
			// 		}
			// 	}
			// });
		// });
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