/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.toolbar = 'Full';
	config.width ='100%';
	config.toolbarCanCollapse = true;
    // config.extraPlugins="html5audio";
    // config.protectedSource.push(/<pre[\s\S]*?pre>/g);
    config.basicEntities = false;  //标签不需要转义
    // （去掉BR）   
    // config.enterMode=CKEDITOR.ENTER_BR;
    // (去掉P)
    config.shiftEnterMode=CKEDITOR.ENTER_P;
    // config.autoParagraph = false;
    // 或者源码模式
    // config.startupMode ='source';
    // 编辑框加样式切换不会不见
    config.allowedContent = true;
    // 自动获取焦点
    // config.startupFocus = true;
    // 不让编辑框内容多出换行
    CKEDITOR.on('instanceReady', function (ev) {

        var writer = ev.editor.dataProcessor.writer;        

        writer.indentationChars = '  '; 

        var dtd = CKEDITOR.dtd; 

        for (var e in CKEDITOR.tools.extend({}, dtd.$block, dtd.$listItem, dtd.$tableContent)) {

            ev.editor.dataProcessor.writer.setRules(e, {    

            indent: false,

            breakBeforeOpen: false,     

            breakAfterOpen: false,  

            breakBeforeClose: false,

            breakAfterClose: false

            });

        } 
        for (var e in CKEDITOR.tools.extend({}, dtd.$list, dtd.$listItem, dtd.$tableContent)) {

            ev.editor.dataProcessor.writer.setRules(e, {

            indent: true,

            });

        }

    });
};

