define(['jquery','template','ckeditor','datepicker','language','uploadify','region','validate','form'],function($,template,CKEDITOR) {
	$.ajax({
		url: '/api/teacher/profile',
		dataType: 'json',
		success: function(data) {
			var html = template('teacherProfileTpl',data.result);
			$("#teacherProfileInfo").html(html);

			$("#upfile").uploadify({
	            buttonText : '',
	            width: '120',
	            height: '120',
	            itemTemplate : '<span></span>',
	            fileObjName : 'tc_avatar',
	            swf: '/public/assets/uploadify/uploadify.swf',
	            uploader: '/api/uploader/avatar',
	            onUploadSuccess : function(file,data){
	                // console.log(data);
	                data = JSON.parse(data);
	                $(".preview img:eq(0)").prop('src',data.result.path);
	            }
	        });

	        $('#hometown').region({
                url : '/public/assets/region/region.json'
            });

            CKEDITOR.replace('editor',{

				toolbarGroups: [
					{
						name: 'clipboard',
						groups: ['clipboard','undo']
					}	
				]
			});


            $("#settingsForm").validate({

            	sendForm : false,

            	valid : function(){
	                // 所有的输入域都通过验证才能够执行 
	                var p = $("#p option:selected").text();
	            	var c = $("#c option:selected").text();
	            	var d = $("#d option:selected").text();
	            	var hometown = p + "|" + c + "|" + d;   

	            	for(var instance in CKEDITOR.instances) {
	            		CKEDITOR.instances[instance].updateElement();
	            	}
		            $(this).ajaxSubmit({
		                
		            	

		                type : 'post',
		                data : {tc_hometown : hometown},//添加表单中没有的额外的数据
		                url:'/api/teacher/modify',
		                success : function(data){
		                    location.reload();
		                }
		            });
			            
	        		

            	},
	            description : {
	                // 自定义描述
	                tc_roster : {
	                    required : '昵称不能为空',
	                   	valid : '格式正确'
	                },
	                tc_cellphone : {
	                    required : '手机不能为空',
	                   	valid : '格式正确'
	                }
	            }
            });
		}
	});
});