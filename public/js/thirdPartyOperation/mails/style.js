// 富文本框
jQuery(function ($) {

    $('textarea[data-provide="markdown"]').each(function () {
        var $this = $(this);

        if ($this.data('markdown')) {
            $this.data('markdown').showEditor();
        } else $this.markdown()

        $this.parent().find('.btn').addClass('btn-white');
    })



    function showErrorAlert(reason, detail) {
        var msg = '';
        if (reason === 'unsupported-file-type') {
            msg = "Unsupported format " + detail;
        } else {
            //console.log("error uploading file", reason, detail);
        }
        $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
    }

    //$('#editor1').ace_wysiwyg();//this will create the default editor will all buttons

    //but we want to change a few buttons colors for the third style
    $('#editor1').ace_wysiwyg({
        toolbar: [
            'font',
            null,
            'fontSize',
            null,
            {
                name: 'bold',
                className: 'btn-info'
            },
            {
                name: 'italic',
                className: 'btn-info'
            },
            {
                name: 'strikethrough',
                className: 'btn-info'
            },
            {
                name: 'underline',
                className: 'btn-info'
            },
            null,
            {
                name: 'insertunorderedlist',
                className: 'btn-success'
            },
            {
                name: 'insertorderedlist',
                className: 'btn-success'
            },
            {
                name: 'outdent',
                className: 'btn-purple'
            },
            {
                name: 'indent',
                className: 'btn-purple'
            },
            null,
            {
                name: 'justifyleft',
                className: 'btn-primary'
            },
            {
                name: 'justifycenter',
                className: 'btn-primary'
            },
            {
                name: 'justifyright',
                className: 'btn-primary'
            },
            {
                name: 'justifyfull',
                className: 'btn-inverse'
            },
            null,
            {
                name: 'createLink',
                className: 'btn-pink'
            },
            {
                name: 'unlink',
                className: 'btn-pink'
            },
            null,
            {
                name: 'insertImage',
                className: 'btn-success'
            },
            null,
            'foreColor',
            null,
            {
                name: 'undo',
                className: 'btn-grey'
            },
            {
                name: 'redo',
                className: 'btn-grey'
            }
        ],
        'wysiwyg': {
            fileUploadError: showErrorAlert
        }
    }).prev().addClass('wysiwyg-style2');


    /**
    //make the editor have all the available height
    $(window).on('resize.editor', function() {
    	var offset = $('#editor1').parent().offset();
    	var winHeight =  $(this).height();
    	
    	$('#editor1').css({'height':winHeight - offset.top - 10, 'max-height': 'none'});
    }).triggerHandler('resize.editor');
    */


    $('#editor2').css({
        'height': '200px'
    }).ace_wysiwyg({
        toolbar_place: function (toolbar) {
            return $(this).closest('.widget-box')
                .find('.widget-header').prepend(toolbar)
                .find('.wysiwyg-toolbar').addClass('inline');
        },
        toolbar: [
            'bold',
            {
                name: 'italic',
                title: 'Change Title!',
                icon: 'ace-icon fa fa-leaf'
            },
            'strikethrough',
            null,
            'insertunorderedlist',
            'insertorderedlist',
            null,
            'justifyleft',
            'justifycenter',
            'justifyright'
        ],
        speech_button: false
    });




    $('[data-toggle="buttons"] .btn').on('click', function (e) {
        var target = $(this).find('input[type=radio]');
        var which = parseInt(target.val());
        var toolbar = $('#editor1').prev().get(0);
        if (which >= 1 && which <= 4) {
            toolbar.className = toolbar.className.replace(/wysiwyg\-style(1|2)/g, '');
            if (which == 1) $(toolbar).addClass('wysiwyg-style1');
            else if (which == 2) $(toolbar).addClass('wysiwyg-style2');
            if (which == 4) {
                $(toolbar).find('.btn-group > .btn').addClass('btn-white btn-round');
            } else $(toolbar).find('.btn-group > .btn-white').removeClass('btn-white btn-round');
        }
    });




    //RESIZE IMAGE

    //Add Image Resize Functionality to Chrome and Safari
    //webkit browsers don't have image resize functionality when content is editable
    //so let's add something using jQuery UI resizable
    //another option would be opening a dialog for user to enter dimensions.
    if (typeof jQuery.ui !== 'undefined' && ace.vars['webkit']) {

        var lastResizableImg = null;

        function destroyResizable() {
            if (lastResizableImg == null) return;
            lastResizableImg.resizable("destroy");
            lastResizableImg.removeData('resizable');
            lastResizableImg = null;
        }

        var enableImageResize = function () {
            $('.wysiwyg-editor')
                .on('mousedown', function (e) {
                    var target = $(e.target);
                    if (e.target instanceof HTMLImageElement) {
                        if (!target.data('resizable')) {
                            target.resizable({
                                aspectRatio: e.target.width / e.target.height,
                            });
                            target.data('resizable', true);

                            if (lastResizableImg != null) {
                                //disable previous resizable image
                                lastResizableImg.resizable("destroy");
                                lastResizableImg.removeData('resizable');
                            }
                            lastResizableImg = target;
                        }
                    }
                })
                .on('click', function (e) {
                    if (lastResizableImg != null && !(e.target instanceof HTMLImageElement)) {
                        destroyResizable();
                    }
                })
                .on('keydown', function () {
                    destroyResizable();
                });
        }

        enableImageResize();

        // 层级菜单
        jQuery(function($){
            var sampleData = initiateDemoData();//see below
        
        
            $('#tree1').ace_tree({
                dataSource: sampleData['dataSource1'],
                multiSelect: true,
                cacheItems: true,
                'open-icon' : 'ace-icon tree-minus',
                'close-icon' : 'ace-icon tree-plus',
                'itemSelect' : true,
                'folderSelect': false,
                'selected-icon' : 'ace-icon fa fa-check',
                'unselected-icon' : 'ace-icon fa fa-times',
                loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
            });
            
            
            function initiateDemoData(){
                var tree_data = {
                    'vehicles' : {text: '汇添富基金管理公司', type: 'folder'}	
                }
                
                tree_data['vehicles']['additionalParameters'] = {
                    'children' : {
                        'licai' : {text: '投资理财部', type: 'folder'},
                        'dianzi' : {text: '电子金融部', type: 'folder'},
                        'yingyun' : {text: '基金营运部', type: 'folder'}
                    }
                }
                tree_data['vehicles']['additionalParameters']['children']['licai']['additionalParameters'] = {
                    'children' : {
                        'classics' : {text: 'XXX', type: 'item'},
                        'convertibles' : {text: 'XXX', type: 'item'},
                        'coupes' : {text: 'XXX', type: 'item'},
                        'hatchbacks' : {text: 'XXX', type: 'item'},
                        'hybrids' : {text: 'XXX', type: 'item'},
                        'suvs' : {text: 'XXX', type: 'item'},
                        'sedans' : {text: 'XXX', type: 'item'},
                        'trucks' : {text: 'XXX', type: 'item'}
                    }
                }
                tree_data['vehicles']['additionalParameters']['children']['dianzi']['additionalParameters'] = {
                    'children' : {
                        'classics' : {text: 'XXX', type: 'item'},
                        'convertibles' : {text: 'XXX', type: 'item'},
                        'coupes' : {text: 'XXX', type: 'item'},
                        'hatchbacks' : {text: 'XXX', type: 'item'},
                        'hybrids' : {text: 'XXX', type: 'item'},
                        'suvs' : {text: 'XXX', type: 'item'},
                        'sedans' : {text: 'XXX', type: 'item'},
                        'trucks' : {text: 'XXX', type: 'item'}
                    }
                }
                tree_data['vehicles']['additionalParameters']['children']['yingyun']['additionalParameters'] = {
                    'children' : {
                        'classics' : {text: 'XXX', type: 'item'},
                        'convertibles' : {text: 'XXX', type: 'item'},
                        'coupes' : {text: 'XXX', type: 'item'},
                        'hatchbacks' : {text: 'XXX', type: 'item'},
                        'hybrids' : {text: 'XXX', type: 'item'},
                        'suvs' : {text: 'XXX', type: 'item'},
                        'sedans' : {text: 'XXX', type: 'item'},
                        'trucks' : {text: 'XXX', type: 'item'}
                    }
                }
               
        
                var dataSource1 = function(options, callback){
                    var $data = null
                    if(!("text" in options) && !("type" in options)){
                        $data = tree_data;//the root tree
                        callback({ data: $data });
                        return;
                    }
                    else if("type" in options && options.type == "folder") {
                        if("additionalParameters" in options && "children" in options.additionalParameters)
                            $data = options.additionalParameters.children || {};
                        else $data = {}//no data
                    }
                    
                    if($data != null)//this setTimeout is only for mimicking some random delay
                        setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);
        
                    //we have used static data here
                    //but you can retrieve your data dynamically from a server using ajax call
                    //checkout examples/treeview.html and examples/treeview.js for more info
                }
                return {'dataSource1': dataSource1}
            }
            $('.tree-container').ace_scroll({size: 250, mouseWheelLock: true});
				$('#tree1').on('closed.fu.tree disclosedFolder.fu.tree', function() {
					$('.tree-container').ace_scroll('reset').ace_scroll('start');	
				});
        });
        // table页码
        jQuery(function($){
            //initiate dataTables plugin
				var myTable = 
				$('#dynamic-table')
				//.wrap("<div class='dataTables_borderWrap' />")   //if you are applying horizontal scrolling (sScrollX)
				.DataTable( {
					bAutoWidth: false,
					"aoColumns": [
					  { "bSortable": false },
					  null, null,null, null, null,
					  { "bSortable": false }
					],
					"aaSorting": [],
					
					
					//"bProcessing": true,
			        //"bServerSide": true,
			        //"sAjaxSource": "http://127.0.0.1/table.php"	,
			
					//,
					//"sScrollY": "200px",
					//"bPaginate": false,
			
					//"sScrollX": "100%",
					//"sScrollXInner": "120%",
					//"bScrollCollapse": true,
					//Note: if you are applying horizontal scrolling (sScrollX) on a ".table-bordered"
					//you may want to wrap the table inside a "div.dataTables_borderWrap" element
			
					//"iDisplayLength": 50
			
			
					select: {
						style: 'multi'
					}
			    } );
			
				
				
				// $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';
				
				// new $.fn.dataTable.Buttons( myTable, {
				// 	buttons: [
				// 	  {
				// 		"extend": "colvis",
				// 		"text": "<i class='fa fa-search bigger-110 blue'></i> <span class='hidden'>Show/hide columns</span>",
				// 		"className": "btn btn-white btn-primary btn-bold",
				// 		columns: ':not(:first):not(:last)'
				// 	  },
				// 	  {
				// 		"extend": "copy",
				// 		"text": "<i class='fa fa-copy bigger-110 pink'></i> <span class='hidden'>Copy to clipboard</span>",
				// 		"className": "btn btn-white btn-primary btn-bold"
				// 	  },
				// 	  {
				// 		"extend": "csv",
				// 		"text": "<i class='fa fa-database bigger-110 orange'></i> <span class='hidden'>Export to CSV</span>",
				// 		"className": "btn btn-white btn-primary btn-bold"
				// 	  },
				// 	  {
				// 		"extend": "excel",
				// 		"text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to Excel</span>",
				// 		"className": "btn btn-white btn-primary btn-bold"
				// 	  },
				// 	  {
				// 		"extend": "pdf",
				// 		"text": "<i class='fa fa-file-pdf-o bigger-110 red'></i> <span class='hidden'>Export to PDF</span>",
				// 		"className": "btn btn-white btn-primary btn-bold"
				// 	  },
				// 	  {
				// 		"extend": "print",
				// 		"text": "<i class='fa fa-print bigger-110 grey'></i> <span class='hidden'>Print</span>",
				// 		"className": "btn btn-white btn-primary btn-bold",
				// 		autoPrint: false,
				// 		message: 'This print was produced using the Print button for DataTables'
				// 	  }		  
				// 	]
				// } );
				// myTable.buttons().container().appendTo( $('.tableTools-container') );
				
				// //style the message box
				// var defaultCopyAction = myTable.button(1).action();
				// myTable.button(1).action(function (e, dt, button, config) {
				// 	defaultCopyAction(e, dt, button, config);
				// 	$('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
				// });
				
				
				// var defaultColvisAction = myTable.button(0).action();
				// myTable.button(0).action(function (e, dt, button, config) {
					
				// 	defaultColvisAction(e, dt, button, config);
					
					
				// 	if($('.dt-button-collection > .dropdown-menu').length == 0) {
				// 		$('.dt-button-collection')
				// 		.wrapInner('<ul class="dropdown-menu dropdown-light dropdown-caret dropdown-caret" />')
				// 		.find('a').attr('href', '#').wrap("<li />")
				// 	}
				// 	$('.dt-button-collection').appendTo('.tableTools-container .dt-buttons')
				// });
			
				// //
			
				// setTimeout(function() {
				// 	$($('.tableTools-container')).find('a.dt-button').each(function() {
				// 		var div = $(this).find(' > div').first();
				// 		if(div.length == 1) div.tooltip({container: 'body', title: div.parent().text()});
				// 		else $(this).tooltip({container: 'body', title: $(this).text()});
				// 	});
				// }, 500);
				
				
				
				
				
				myTable.on( 'select', function ( e, dt, type, index ) {
					if ( type === 'row' ) {
						$( myTable.row( index ).node() ).find('input:checkbox').prop('checked', true);
					}
				} );
				myTable.on( 'deselect', function ( e, dt, type, index ) {
					if ( type === 'row' ) {
						$( myTable.row( index ).node() ).find('input:checkbox').prop('checked', false);
					}
				} );
			
			
			
			
				/////////////////////////////////
				//table checkboxes
				$('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);
				
				//select/deselect all rows according to table header checkbox
				$('#dynamic-table > thead > tr > th input[type=checkbox], #dynamic-table_wrapper input[type=checkbox]').eq(0).on('click', function(){
					var th_checked = this.checked;//checkbox inside "TH" table header
					
					$('#dynamic-table').find('tbody > tr').each(function(){
						var row = this;
						if(th_checked) myTable.row(row).select();
						else  myTable.row(row).deselect();
					});
				});
				
				//select/deselect a row when the checkbox is checked/unchecked
				$('#dynamic-table').on('click', 'td input[type=checkbox]' , function(){
					var row = $(this).closest('tr').get(0);
					if(this.checked) myTable.row(row).deselect();
					else myTable.row(row).select();
				});
			
			
			
				$(document).on('click', '#dynamic-table .dropdown-toggle', function(e) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
				});
				
				
				
				//And for the first simple table, which doesn't have TableTools or dataTables
				//select/deselect all rows according to table header checkbox
				var active_class = 'active';
				$('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){
					var th_checked = this.checked;//checkbox inside "TH" table header
					
					$(this).closest('table').find('tbody > tr').each(function(){
						var row = this;
						if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
						else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
					});
				});
				
				//select/deselect a row when the checkbox is checked/unchecked
				$('#simple-table').on('click', 'td input[type=checkbox]' , function(){
					var $row = $(this).closest('tr');
					if($row.is('.detail-row ')) return;
					if(this.checked) $row.addClass(active_class);
					else $row.removeClass(active_class);
				});
			
				
			
				/********************************/
				//add tooltip for small view action buttons in dropdown menu
				$('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
				
				//tooltip placement on right or left
				function tooltip_placement(context, source) {
					var $source = $(source);
					var $parent = $source.closest('table')
					var off1 = $parent.offset();
					var w1 = $parent.width();
			
					var off2 = $source.offset();
					//var w2 = $source.width();
			
					if( parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2) ) return 'right';
					return 'left';
				}
				
				
				
				
				/***************/
				$('.show-details-btn').on('click', function(e) {
					e.preventDefault();
					$(this).closest('tr').next().toggleClass('open');
					$(this).find(ace.vars['.icon']).toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
				});
				/***************/
				
				
				
				
				
				/**
				//add horizontal scrollbars to a simple table
				$('#simple-table').css({'width':'2000px', 'max-width': 'none'}).wrap('<div style="width: 1000px;" />').parent().ace_scroll(
				  {
					horizontal: true,
					styleClass: 'scroll-top scroll-dark scroll-visible',//show the scrollbars on top(default is bottom)
					size: 2000,
					mouseWheelLock: true
				  }
				).css('padding-top', '12px');
				*/
			
			
        })

        /**
        //or we can load the jQuery UI dynamically only if needed
        if (typeof jQuery.ui !== 'undefined') enableImageResize();
        else {//load jQuery UI if not loaded
        	//in Ace demo ./components will be replaced by correct components path
        	$.getScript("assets/js/jquery-ui.custom.min.js", function(data, textStatus, jqxhr) {
        		enableImageResize()
        	});
        }
        */
    }
});
//富文本框end

