$(function () {	content.init();});
/*===================================
@ content
===================================*/
var content = {

	stageW			:	0,					
	stageH			:	0,					
	posY				:	0,					
	data				:	[],					
	target			:	null,			
	navTarget		:	null,
	pageCur			:	-1,				
	navCur			:	0,				
	len				:	-1,		

	init : function(){
		//console.log('content init');
		var _this					=	this;

		_this.target				=	$('#scroll_content');
		_this.navTarget			=	$('#scroll_content_nav');
		_this.len					=	_this.target.find('> section').length;
		_this.stageW			=	$(window).width();
		_this.stageH			=	$(window).height();
		_this.posY				=	$(window).scrollTop();

		if(_this.target.find('> section').eq(_this.len-1).height() < _this.stageH && _this.stageH > 1024){
			_this.target.find('> section').eq(_this.len-1).height(_this.stageH);
		}

		_this.setData();
		_this.resize();
		_this.scroll();	


		_this.navTarget.find('button').on('click' , function(){
			var _y = $(this).parents('li').index();
			content.moveContent(_y);
		});

		/******************************************************
		@ Window Scroll
		******************************************************/
		$(window).on("scroll",function () {
			content.scroll();			
		});

		/******************************************************
		@ Window Resize
		******************************************************/
		$(window).on("resize",function () {
			content.resize();
		});

	},

	resize : function(){
		this.stageW		=	$(window).width();
		this.stageH		=	$(window).height();
		this.action.pageResize();
	},

	scroll : function(){
		this.posY		=	$(window).scrollTop();
		this.event.activeHandler(this.posY);
	},

	moveContent : function(_index){
		var _y	=	this.target.find('> section').eq(_index).offset().top+1;
		content.action.move(_y);
	},

	setData : function(){
		//console.log('setData');
		content.target.find('> section').each(function(){

			var _index	=	$(this).index(),
				 _target	=	$(this);

			content.data[_index] = {

				index		:	_index,
				target	:	_target,
				flag		:	true,
               numArr: [],

				init : function (){
					var _this = this;			
					
					if (this.target.find('.number_format').length > 0) {
						var __i = 0;
						this.target.find('.number_format').each(function () {																		
							_this.numArr[__i] = new numberTicker($(this), true);
							__i++;	
						});
					}

					
				},

				play : function(posY){
					var _this = this;

					var _i = 0;
					_this.target.find('.e_wrap').each(function(){								
						var _delay = (_i * 0.15)+0.5;
						$(this).css({'transition-delay' : _delay+'s'}).addClass('open');
						_i++;
					});


					if(_this.flag == true){								

						if(_this.index == 0){							

						} else if(_this.index == 1){							

						} else if(_this.index == 4){
							setTimeout(function(){							
								var k=0;
								for(k=0;k<_this.numArr.length;k++){
									_this.numArr[k]._reset();
								}
							},1250);
						}

						_this.target.addClass('open');
					}
					_this.flag = false;
					
				},

				reset : function(){
					var _this = this;

						_this.target.removeClass('open');						


						if(_this.index == 0){							

						} else if(_this.index == 1){														

						} else if(_this.index == 2){

						}
					_this.flag = true;
				}

			}

			content.data[_index].init();
			content.data[_index].reset();
			if(content.posY >= $(this).offset().top - content.stageH)content.data[_index].play();

		});

	},

	action : {

		move : function(_y){
			$('html , body').stop(true).animate({ scrollTop : _y }, 600);
		},
		
		pageHandler : function(_y){
			if(content.pageCur >= 0){
				content.data[content.pageCur].play(_y);
			}
		},

		pageResize : function(){

		}
		
	},
	
	event : {

		navHandler : function(index){
			content.navTarget.find('> ul > li').each(function(){
				if($(this).index() == index){
					$(this).addClass('actived');
				}else{
					$(this).removeClass('actived');
				}
			});
		},

		activeHandler : function(index){
			//console.log('activeHandler');
			var _bottomHeight	=	content.stageH - 0,
				 _topHeight			=	0,
				 _this = this;
			
			content.target.find('> section').each(function(){
				if (index >= $(this).offset().top - _bottomHeight) {					
					content.pageCur = $(this).index();
				}

				if($(this).index() != content.len-1){
					if(index >= $(this).offset().top && index <= $(this).next().offset().top){
						content.navCur = $(this).index();
					}
				}else{
					if(index >= $(this).offset().top){
						content.navCur = $(this).index();
					}
				}	
			});


			//if(index < content.target.offset().top) content.navCur = -1;
			if(index < content.target.offset().top - _bottomHeight) content.pageCur = -1;
			content.action.pageHandler(index);
			content.event.navHandler(content.navCur);
		}		

	}

}