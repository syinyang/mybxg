requirejs.config({
	baseUrl: '/public/assets',
	paths: {
		jquery: 'jquery/jquery.min',
		bootstrap: 'bootstrap/js/bootstrap.min',
		cookie: 'jquery-cookie/jquery.cookie',
		common: '../js/common',
		util: '../js/util',
		index: '../js/index',
		login: '../js/login',
		template: 'artTemplate/template-web',
		tealist: '../js/teacher-list',
		teaadd: '../js/teacher-add',
		nprogress: 'nprogress/nprogress'
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		}
	}
});