/******************************************************
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
			infiniteLoop :true,
			useCSS: false,
			onSlideAfter:function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
				var __t = currentSlideNumber;
				var current = __t.find('a').attr('href');
				__t.parents('.bx-wrapper').next().next().attr('href',current);
			}
		}

		if($(this).find('li').length <=1 ){
			$(this).parent().parent().parent().addClass('page_hide');			
		}else{
			$(this).parent().parent().parent().removeClass('page_hide');			
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
			infiniteLoop :true,
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
//	$('.product_sort_tab ul').find('> li').eq(_i).addClass('active').siblings().removeClass('active');
	$('.wiz_product_01').find('> div').eq(_i).show().siblings().hide();
	ex_slidePageCheck(_i);
}

function ex_slideCheck1(_i){
	slideCur = _i;
//	$('.product_sort_tab ul').find('> li').eq(_i).addClass('active').siblings().removeClass('active');
	$('.wiz_product_02').find('> div').eq(_i).show().siblings().hide();
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
	var _PH = $('.main_product_slide_wrap').innerWidth()/slideNum;
	
	// start 2019.05.22 수정 슬라이드 표시
	var _setting = {
		slideWidth:_PH,
		minSlides: slideNum,
		maxSlides: slideNum,
		moveSlides:1,
		controls:false,
	/*	prevText:'<img src="../images/content/btn_slide_prev.png" alt="" width="20" />',
		nextText:'<img src="../images/content/btn_slide_next.png" alt="" width="20" />',
		infiniteLoop:false,*/
		infiniteLoop :true,
		useCSS: false,
		touchEnabled:false,
		autoHover: true, 
		autoDelay:4000,
		pause:3000,
		auto: true
	}	

	_setting.touchEnabled = (SW <= 1024)?true:false;		
	
	var len = $('#main_product_slide0'+_i).find(' > li').length;
	if(len > slideNum ){
		m_slide00 = $('#main_product_slide0'+_i).bxSlider(_setting);
	}
	$('#new_product_slide').bxSlider(_setting);
	
	/*if(!mulitySlideFlag){
		m_slide00 = $('#main_product_slide00').bxSlider(_setting);
		m_slide01 = $('#main_product_slide01').bxSlider(_setting);
		m_slide02 = $('#main_product_slide02').bxSlider(_setting);
		m_slide03 = $('#main_product_slide03').bxSlider(_setting);
	}else{
		m_slide00.reloadSlider(_setting);
		m_slide01.reloadSlider(_setting);
		m_slide02.reloadSlider(_setting);
		m_slide03.reloadSlider(_setting);
	}*/
	// end 2019.05.22 수정 슬라이드 표시
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
			infiniteLoop :true,
			useCSS: false,
			touchEnabled:false,		
			onSlideBefore: function(currentIndex){
				currentIndex.each(function(){
					if(currentIndex.find('iframe').length > 0){
						currentIndex.find('iframe').attr('src','');
					}
				})				
			},
			onSlideAfter:function(currentIndex) {				
				if(currentIndex.index() == 3){
					currentIndex.find('iframe').attr('src','https://player.vimeo.com/video/338181596?background=1&autoplay=1&loop=1&muted=1');
				}
			}
		}	
		
		
		main.bannerSlideOption = {
			minSlides:1,
			maxSlides:1,
			auto: true,
			autoHover: true,
			autoDelay:3500,
			pause:3000,
			touchEnabled:false,
			infiniteLoop :true,
			useCSS: false,
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




