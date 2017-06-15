define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util) {
	util.setMenu('/course/course_add');
	var csId = util.qs('cs_id',location.search);
	var flag = util.qs('flag',location.search);
	$.ajax({
		url: '/api/course/picture',
		dataType: 'json',
		data: {cs_id: csId},
		success: function(data) {
			if(flag) {
				data.result.flagText = "课程编辑";
			}else {
				data.result.flagText = "课程添加";
			}
			var html = template('coursePictureTpl',data.result);
			$("#coursePictureInfo").html(html);



			//编辑时裁切图片
			var preview = $(".preview img");
			var nowCrop = null;//调用多次cropImage()会产生多个遮罩效果，处理

			//裁切图片功能
			function cropImage() {

				nowCrop && nowCrop.destroy();//调用的时候如果存在就删掉,是jcrop的方法

				// 裁切
                preview.Jcrop({
                	aspectRatio: 2
                },function() {
                	//建立选区之后就能触发回调函数

                	nowCrop = this;
                	// 缩略图
                	this.initComponent('Thumbnailer',{
                		width: 240,
                		height: 120,
                		thumb: '.thumb' //放到前面thumb的类名中
                		//改源代码 1798行
                	});
                	
                	//计算选区参数,先算图片的宽高
                	var width = this.ui.stage.width,
                		height = this.ui.stage.height;
                	//坐标
                	var x = 0;
                		y = (height - width/2)/2;
                		w = width;
                		h = width/2;

                	//创建选区，并设置位置，作用是，一点击裁切，就会自动蹦出选区
                	this.newSelection();
                	this.setSelect([x,y,w,h]);

                	//获取裁切尺寸
                	preview.parent().on('cropend',function(e,s,c) {
                		$('[name="x"]').val(c.x);
                		$('[name="y"]').val(c.y);
                		$('[name="w"]').val(c.w);
                		$('[name="h"]').val(c.h);
                	});

                	$(".jcrop-thumb").css({
                		top: 0,
                		left: 0
                	});
                });
			}


			//给裁切按钮绑定事件
            $("#cropImg").click(function() {
            	//前面给按钮加一个标志位 data-flag
            	//点击的时候获取状态位
            	var flag = $(this).attr('data-flag');
            	if(flag == '1') {
            		//不能放在下面
            		$(this).attr('data-flag','2');
            		$(this).text('保存图片');

            		//实现裁切功能
            		cropImage();
            		
            	}else {
            		//提交坐标信息
            		$("#cropInfoForm").ajaxSubmit({
            			type: 'post',
            			url: '/api/course/update/picture',
            			data: {cs_id: csId},
            			success: function(data) {
            				if(data.code == 200) {
            					location.href = '/course/lesson?cs_id='+data.result.cs_id;
            				}
            			}
            		});
            	}
            });





			$("#upfile").uploadify({
	            buttonText : '上传图片',
	            buttonClass: 'btn btn-success btn-sm',//这里的类名是从html里拽过来的，因为被覆盖了
	            width: '70',
	            height: 'auto',
	            formData: {cs_id: csId},
	            itemTemplate : '<span></span>',//自定义上传进度条
	            fileObjName : 'cs_cover_original', //相当于name
	            swf:'/public/assets/uploadify/uploadify.swf',
	            uploader:'/api/uploader/cover', //上传到哪里
	            onUploadSuccess : function(file,data){
	                data = JSON.parse(data);
	                var preview = $(".preview img");
	                preview.attr('src',data.result.path);

	                cropImage();

	                
	            }
	        });
		}
	});
});