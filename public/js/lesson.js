define(['jquery','template','util','bootstrap','form'],function($,template,util) {
	util.setMenu('/course/course_add');
	var csId = util.qs('cs_id',location.search);


	$.ajax({
		url: '/api/course/lesson',
		dataType: 'json',
		data: {cs_id: csId},
		success: function(data) {
			// console.log(data);
			var html = template('lessonTpl',data.result);
			$("#lessonInfo").html(html);

			$(".lessonedit").click(function() {
				var ctId = $(this).attr('data-ct_id');
				
				$.ajax({
					url: '/api/course/chapter/edit',
					dataType: 'json',
					data: {ct_id: ctId},
					success: function(data) {
						// console.log(data);
						var html = template('lessoneditTpl',data.result);
						$("#lessonEditInfo").html(html);

						$("#chapterModal").modal();//位置

						$(".lessonAddBtn").click(function() {
							$("#lessonEditForm").ajaxSubmit({
								url: '/api/course/chapter/modify',
								type: 'post',
								data: {
									ct_id: data.result.ct_id,
									ct_is_free: $("#freeFlag:checked").size()==0?0:1
								},
								success: function(data) {
									if(data.code == 200) {
										location.reload();
									}
									
								}
							});
						});
					}
				});
			});

			$("#addLessonBtn").click(function() {
				$("#chapterModal").modal();
				// 添加，数据都是空的，所以写空对象
				var html = template('lessoneditTpl',{});
				$("#lessonEditInfo").html(html);
// 公共的代码提取出来，先不写了
				$("#lessonEditForm").ajaxSubmit({
					url: '/api/course/chapter/add',
					type: 'post',
					data: {
						ct_cs_id: data.result.cs_id,
						ct_is_free: $("#freeFlag:checked").size()==0?0:1
					},
					success: function(data) {
						if(data.code == 200) {
							location.reload();
						}
					}
				});
			});


		}
	});
});