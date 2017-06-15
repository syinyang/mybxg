define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR) {
	util.setMenu('/course/course_add');
	var csId = util.qs('cs_id',location.search);

	var flag = util.qs('flag',location.search);

	$.ajax({
		dataType: 'json',
		url: '/api/course/basic',
		data: {
			cs_id: csId
		},
		success: function(data) {
			if(flag) {
				data.result.flagText = "课程编辑";
			}else {
				data.result.flagText = "课程添加";
			}
			var html = template('courseBasicTpl',data.result);
			$("#courseBasicInfo").html(html);


			CKEDITOR.replace('editor');
			// for(var )

			//处理分类联动,api
			$("#firstCategory").change(function() {
				$.ajax({
					url: '/api/category/child',
					dataType: 'json',
					data: {cg_id: $(this).find('option:checked').attr('value')},
					success: function(data) {
						var tpl = '{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>{{/each}}';
						var html = template.render(tpl,{list: data.result});
						$("#secondCategory").html(html);
					}
				});
			});


			$("#basicForm").validate({
				sendForm : false,
				valid: function() {
					$(this).ajaxSubmit({
						url: '/api/course/update/basic',
						type: 'post',
						data: {cs_id: csId},
						success : function(data){
							if(data.code == 200) {
								location.href = '/course/picture?cs_id=' + data.result.cs_id;
							}
		                }
					});
				}
			});
		}
	});
});