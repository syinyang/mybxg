define(['jquery','template','bootstrap'],function($,template) {
	$.ajax({
		dataType: 'json',
		url: '/api/teacher',
		success: function(data) {
			// console.log(data);
			if(data.code == 200) {
				var html = template('tealistTpl',{list: data.result});
				$(".table tbody").html(html);

				previewTeacher();
				enableOrDisableTeacher();
			}
		}
	});

	function previewTeacher() {
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
	function enableOrDisableTeacher() {
		$("#teacherInfo").find(".edteacher").click(function() {
			var that = this;
			var td = $(this).closest('td');
			var tcId = td.attr('data-id');
			var tcStatus = td.attr('data-status');
			$.ajax({
				type: 'post',
				url: '/api/teacher/handle',
				dataType: 'json',
				data: {
					tc_id: tcId,
					tc_status: tcStatus
				},
				success: function(data) {
					if(data.code == 200) {
						td.attr('data-status',data.result.tc_status);
						if(data.result.tc_status == 0) {
							$(that).html("注 销");
						}else {
							$(that).html("开 启");
						}
					}
				}
			});
		});
	}
});