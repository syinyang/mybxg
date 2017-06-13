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
		nprogress: 'nprogress/nprogress',
		validate: 'validate/jquery-validate',
		form: 'jquery-form/jquery.form',
		uploadify: 'uploadify/jquery.uploadify.min',
		region: 'region/jquery.region',
		ckeditor: 'ckeditor/ckeditor',
		datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker.min',
		language: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		settings: '../js/settings',
		courselist: '../js/course'
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		},
		validate: {
			deps: ['jquery']
		},
		language: {
			deps: ['jquery','datepicker']
		},
		uploadify: {
			deps: ['jquery']
		},
		ckeditor: {
			exports: 'CKEDITOR'
		}
	}
});