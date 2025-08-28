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

/******************************************************
@ Init
******************************************************/
$(function () {	content.init();});/******************************************************
@ Init
******************************************************/
$(function(){
	mulitySlideFlag = false;	
	exSlideArr = [];
	slideCur = 0;
	ex_slideCheck(0);
	mulitySlideFlag = true;		
	slideArr = [];	

	main.init();

	
	$('.main_intro_slide').each(function () {
		var _autoDelay = Math.floor(Math.random() * (500 - 4000) + 4000)
		var _pause = Math.floor(Math.random() * (3500 - 4500) + 4500)		
		var introOption = {
			minSlides:1,
			maxSlides:1,
			auto: true,
			autoHover: true,
			autoDelay:_autoDelay,
			pause:_pause,
			controls:false,
			touchEnabled:false,
			infiniteLoop :false,
			onSlideAfter:function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
				var __t = currentSlideNumber;
				var current = __t.find('a').attr('href');
				__t.parents('.bx-wrapper').next().next().attr('href',current);
			}
		}
		var introSlide = $(this).bxSlider(introOption);
		slideArr.push(introSlide)
	});
		
	$('.main_talk_slide').each(function () {
		var _autoDelay = Math.floor(Math.random() * (300 - 4000) + 4000)
		var _pause = Math.floor(Math.random() * (2000 - 4500) + 4500)		
		var _touch = (SW <= 1024)?true:false;
		var talkOption = {
			minSlides:1,
			maxSlides:1,
			auto: true,
			autoHover: true,
			autoDelay:_autoDelay,
			pause:_pause,
			controls:false,
			touchEnabled:_touch,
			infiniteLoop :false,
		}
		var talkSlide = $(this).bxSlider(talkOption);
		slideArr.push(talkSlide)
	});
});


/******************************************************
@ Window Resize
******************************************************/
$(window).resize(function(){
	if (mResizeCheck != $(window).width()) {
		
		mResizeCheck = $(window).width();
	}

	if(mulitySlideFlag)ex_slidePageCheck(slideCur);
	
});


function ex_slideCheck(_i){
	slideCur = _i;
	$('.product_sort_tab ul').find('> li').eq(_i).addClass('active').siblings().removeClass('active');
	$('.main_product_slide_wrap').find('> div').eq(_i).show().siblings().hide();
	ex_slidePageCheck(_i);
}

function ex_slidePageCheck(_i){
	var SW = $(window).width();
	var slideNum = 5;
	var slideMargin = 30
	if(SW <= 1920)slideNum = 5;
	if(SW <= 1280)slideNum = 4;
	if(SW <= 1024)slideNum = 3;
	if(SW <= 768)slideNum = 2;
	if(SW <= 768)slideNum = 2;
	if(SW <= 380)slideNum = 1;
	var _PH = $('.main_product_slide_wrap').innerWidth()/slideNum;

	var _setting = {
		slideWidth:_PH,
		minSlides: slideNum,
		maxSlides: slideNum,
		moveSlides:1,
		controls:false,
		prevText:'<img src="../images/content/btn_slide_prev.png" alt="" width="20" />',
		nextText:'<img src="../images/content/btn_slide_next.png" alt="" width="20" />',
		infiniteLoop:false,
		touchEnabled:false
	}	

	_setting.touchEnabled = (SW <= 1024)?true:false;	

	if(!mulitySlideFlag){
		m_slide00 = $('#main_product_slide00').bxSlider(_setting);
		m_slide01 = $('#main_product_slide01').bxSlider(_setting);
		m_slide02 = $('#main_product_slide02').bxSlider(_setting);
		m_slide03 = $('#main_product_slide03').bxSlider(_setting);
	}else{
		m_slide00.reloadSlider(_setting);
		m_slide01.reloadSlider(_setting);
		m_slide02.reloadSlider(_setting);
		m_slide03.reloadSlider(_setting);
	}
}	
	
var main = {

	first : true,
	visualSlide : null,
	visualSlideOption : null,
	bannerSlide : null,
	bannerSlideOption : null,

    init: function () {	

		main.visualSlideOption = {
			minSlides:1,
			maxSlides:1,
			auto: true,
			autoHover: true,
			autoDelay:4000,
			pager:false,
			pause:3000,
			touchEnabled:false,
			useCSS : false

		}	
		
		main.bannerSlideOption = {
			minSlides:1,
			maxSlides:1,
			auto: true,
			autoHover: true,
			autoDelay:3500,
			pause:3000,
			touchEnabled:false,
			infiniteLoop :false,
			onSlideAfter:function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
				var __t = currentSlideNumber;
				var current = __t.find('a').attr('href');
				__t.parents('.bx-wrapper').next().next().attr('href',current);
			}
		}	
			
		this.resize();

	},

	resize : function(){
		
		main.mainSlideData();
	},

	mainSlideData : function(){		

		main.visualSlideOption.touchEnabled = (SW <= 1024)?true:false;
		
		if(main.first){
			//first
			main.visualSlide = $('.n_visual_slide').bxSlider(main.visualSlideOption);			
			main.bannerSlide = $('.main_banner_slide').bxSlider(main.bannerSlideOption);			
			main.first = false;
		}else{
			main.visualSlide.reloadSlider(main.visualSlideOption);
			main.bannerSlide.reloadSlider(main.bannerSlideOption);
		}
	}
};

function skip(){
	$('html,body').stop().animate({scrollTop:$('#n_header').offset().top},600)
}




