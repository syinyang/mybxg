define(['jquery'],function($) {
	return {
		setMenu: function(pathname) {
			$(".aside .navs a").removeClass('active');
			$(".aside .navs a[href='"+ pathname +"']").addClass('active');
		},
		qs: function(attr,param) {
			param = param.substring(1);
			var arr = param.split('&');
			var retValue = null;
			arr.forEach(function(e,i) {
				var kv = e.split('=');
				if(attr == kv[0]) {
					retValue = kv[1];
					return;
				} 
			});
			return retValue;
		} 	
		
	}
	
});