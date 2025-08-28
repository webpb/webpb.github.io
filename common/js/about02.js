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

		historySliderArr = [];
		var i =0;
		$('.history_slider').find('> div').each(function(){
			if($(this).hasClass('slider_state')){
				historySliderArr[i] = $(this).index();
				i++;
			}
		});

		historySlider = $('.history_slider').slick({
			infinite: false,
			arrows:true,
			slidesToShow: 5,
			draggable:false,
			prevArrow:'.btn_history_prev',
			nextArrow:'.btn_history_next',
			adaptiveHeight: true,
			responsive: [
			    {
					breakpoint : 1024,
					settings:{
						slidesToShow: 3,
						draggable:true
					}
				},
			    {
					breakpoint : 640,
					settings:{
						slidesToShow: 1,
					}
				}
			]
		});

		$('.history_slider').on('afterChange' , function(event, slick, currentSlide){
			//console.log(currentSlide);
			var _activeIndex = 0;
			if(currentSlide >= historySliderArr[0] && currentSlide <= historySliderArr[1]){
				_activeIndex = 0;
			}
			if(currentSlide >= historySliderArr[1] && currentSlide <= historySliderArr[2]){
				_activeIndex = 1;
			}
			if(currentSlide >= historySliderArr[2]){
				_activeIndex = 2;
			}
			$('.duolac_about06').find('.txt02 ul li').eq(_activeIndex).addClass('actived').siblings().removeClass('actived');
		});

		$('.duolac_about06').find('.txt02 ul li button').click(function(){
			var _parent = $(this).parent();
			//_parent.addClass('actived').siblings().removeClass('actived');
			$('.history_slider').slick('slickGoTo' , historySliderArr[_parent.index()]);

		});


		bubbleEffectStart($('#bubble'));


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

function bubbleEffectStart(_t){
		var t = _t;
		var i = 0;
		var s_random = Math.floor(Math.random()*(2.2-3.2)+3.2);
		var yT_random = Math.floor(Math.random()*(-10-0)+0);
		var yB_random = Math.floor(Math.random()*(0-30)+30);
		TweenMax.to(t,s_random,{y:yT_random,alpha:1,delay:i*0.5,ease:Sine.easeInOut,onComplete:function(){
			TweenMax.to(this.target,s_random,{y:yB_random,ease:Sine.easeOut,onComplete:function(){
				bubbleEffectStart(this.target,this.target.index());
			}});
		}});							
	}


/******************************************************
@ Init
******************************************************/
$(function () {	content.init();});
