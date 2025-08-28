/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

// 이미지 경로 구분
var workSpCd = $("#workSpCd").val();

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.filebrowserUploadUrl = '/bd/files/uploadForEditor.json?workSpCd=' + workSpCd;
	config.contentsCss = '/common/css/ckeditor-4.10.0/styleforEditor.css';
	config.removePlugins = 'elementspath';
	config.height = 250;
};
