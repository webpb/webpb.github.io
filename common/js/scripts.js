/**
 * slider 이경수
 **/

function wiz_slider_set(_type,_count,_el, page) {
    var space = '0',
    	slidesPerView = _count,
    	isauto = false,
    	pages = false,
    	speed = 300,
    	loop = true,
    	loopAdditionalSlides = 1,
    	centeredSlides = true,
    	direction = 'horizontal',
    	breakpoints = false,
    	autoHeight = true,
    	calculateHeight = true,
    	pagination = {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets', //progressbar
        };
    
    switch (_type) {
	    case '0':
	    	calculateHeight = true;
	    	autoHeight = true;
	    	space = 40;
	    	speed = 1000;
	    	pages = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
	    	isauto =  {
    			delay : 5000,
				disableOnInteraction : false	
	    	}
	    	breakpoints = {  
			    '1024': {
			        spaceBetween : 0,
			        speed : 300
			        },
		        '1500': {
			        spaceBetween : 20
			        } 
			    }
	      break;
	    case '1':
	    	space = false;
	    	direction = 'vertical'; //horizontal,vertical
	    	isauto =  {
    			delay : 3000,
				disableOnInteraction : false	
	    	}
	    	pagination = false;
	      break;
	    case '2':
	    	space = 40;
	    	isauto =  false;
//	    	pagination = false;
	    	pagination = (page == 'page' ? {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets', //progressbar
            } : false) ;
	    	
	    	centeredSlides = false;
	    	loop = false;
	    	breakpoints = {  
			    '1400': {
			        slidesPerView: 1,
			        spaceBetween : 8
			        },
		    	'1500': {
		    		slidesPerView: 2,
			        spaceBetween : 20
			        }
			    }
	      break;
	    case '3':
	    	space = 40;
	    	isauto =  false;
	    	pagination = (page == 'page' ? {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets', //progressbar
            } : false) ;
	    	
	    	
	    	centeredSlides = false;
	    	loop = false;
	    	breakpoints = {  
    			'600': {
			        slidesPerView: 2,
			        spaceBetween : 8
			        },
		        '1024': {
			        slidesPerView: 3,
			        spaceBetween : 8
			        },
		        '1500': {
			        slidesPerView: 4,
			        spaceBetween : 20
			        }
			    }
	      break;
	    case '4':
	    	space = 0;
	    	pagination = {
  		          el: ".swiper-pagination",
		          type: "fraction",
		     };
	      break;
	    case '5':
	    	space = 40;
	    	isauto =  false;
	    	centeredSlides = false;
	    	loop = false;
	    	isauto =  {
	    			delay : 5000,
					disableOnInteraction : false	
		    	};
	    	breakpoints = {  
		        '1024': {
			        slidesPerView: 1,
			        spaceBetween : 8
			        }
			    }
	      break;
	    case '6':
	    	space = 40;
	    	isauto =  false;
	    	
	    	
	    	pagination = (page == 'page' ? {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets', //progressbar
            } : false) ;
	    	
	    	
	    	centeredSlides = false;
	    	loop = false;
	    	breakpoints = {  
		        '1024': {
			        slidesPerView: 1,
			        spaceBetween : 8
			        },
		        '1500': {
			        slidesPerView: 3,
			        spaceBetween : 20
			        }
			    }
	      break;
	    case '7':
	    	space = 40;
	    	isauto =  false;
//	    	pagination = false;
	    	pagination = (page == 'page' ? {
                el: '.swiper-pagination',
                clickable: true,
                type: 'bullets', //progressbar
            } : false) ;
	    	
	    	centeredSlides = false;
	    	loop = false;
	    	breakpoints = {  
		        '1024': {
			        slidesPerView: 1,
			        spaceBetween : 8
			        },
		        '1500': {
			        slidesPerView: 2,
			        spaceBetween : 20
			        }
			    }
	      break;
	    default:
	      console.log('no type');
	  }
    
    var mySwiper = new Swiper(_el, {
        direction: direction,
        slidesPerView : slidesPerView,
        spaceBetween: space,
        centeredSlides: centeredSlides,
        //slidesOffsetBefore: 120,
        autoplay : isauto,
        loop: loop,
        //loopedSlides: 0,
        //initialSlide: 0,
        //loopFillGroupWithBlank: true,
        autoHeight:autoHeight,
        speed: speed,
        pagination: pagination,
        navigation: pages,
        calculateHeight:calculateHeight,
        breakpoints : breakpoints,
        observer: true,
        observeParents: true
    });
    
//    mySwiper.on('slideChange', function (i) {
//    	if(_el === ".wiz_product_02") {
//    		console.log(mySwiper.activeIndex);
//    		$("li", "#wiz_product_02_btn").removeClass('active');
//    	}
//	});
    
//    if(btn){
//    	
//	    switch (des) {
//	    case 's1':
//	    	$(_el).find('> div').eq(_idx).show().siblings().hide();
//	    	break;
//	    case 's2':
//	    	$(".wiz_product_02_wrap").find('> div').eq(_idx).show().siblings().hide();
//	    	break;
//	    default:
//	      console.log('no data');	
//	    }
//    	
//    	$(btn).parent().parent().find('.active').removeClass('active');
//    	$(btn).addClass('active');
//    }
    
    //hover set
    setTimeout(function(){
    wiz_swiper_hover_stop(_el);
    },100);
}

/** 코너 선택 이벤트 */
function onClickCnr(_el, _btn, _idx) {
	if(_btn) {
		$(_btn).parent().parent().find('.active').removeClass('active');
		$(_btn).addClass('active');
	}

	$(_el).find('> div').eq(_idx).show().siblings().hide();
}

/**
 * 
 * slider over stop
 * 
**/
function wiz_swiper_hover_stop(_el){
	//$(".swiper-container").each(function(elem, target){
	    var swp = '';
	    $(_el).find('.swiper-wrapper').off();
	    $(_el).find('.swiper-wrapper').on('mouseover',function(){
	    //$(_el).find('.swiper-wrapper').hover(function(event) {
	    	swp = $(_el)[0].swiper;
	        swp.autoplay.stop();
	    });
	    $(_el).find('.swiper-wrapper').on('mouseleave',function(){
	    	swp = $(_el)[0].swiper;
	    	var autof = swp.params.autoplay.enabled;
	    	var onoff = $(_el).find('.wiz_swiper_play').data('type');
	    	if(onoff == 'start' && autof == true || onoff == undefined && autof == true){
	    		swp.autoplay.start();
	    	}
	    });
	//});
}
/**
 * 
 * slider start stop
 * 
**/
function wiz_swiper_paly(_me){
	//$(".swiper-container").each(function(elem, target){
	    var swp = $(_me).parents('.swiper-container')[0].swiper;
	    var type = $(_me).data('type');
	    if(type == 'start'){
	    	swp.autoplay.stop();
	    	$(_me).data('type','stop');
	    	$(_me).addClass('stop');
	    	$(_me).removeClass('start');
	    }else{
	    	swp.autoplay.start();
	    	$(_me).data('type','start');
	    	$(_me).addClass('start');
	    	$(_me).removeClass('stop');
	    }
	//});
}
/**
 * today open
**/
function _close_s_p(el,_today){
	$('.'+el).addClass('_off');
	setTimeout(function(){
		$('.'+el).addClass('_off_none');
	},500)
	if(_today == '_closetoday'){
		today_close(el, 1);
	}
}

function today_open(el) {
  var b_cookie = getCookie(el);
  if (!b_cookie) {
    $('.'+el).removeClass('_off');
    $('.'+el).removeClass('_off_none');
  }
}

function today_close(el, expiredays) {
	setCookie(el, "expire", expiredays);
	$('.'+el).addClass('_off');
}

function getCookie(el) {
	var nameOfCookie = el + "=";
	var x = 0;
	while (x <= document.cookie.length) {
	  var y = (x + nameOfCookie.length);
	  if (document.cookie.substring(x, y) == nameOfCookie) {
	    if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
	      endOfCookie = document.cookie.length;
	    return unescape(document.cookie.substring(y, endOfCookie));
	  }
	  x = document.cookie.indexOf(" ", x) + 1;
	  if (x == 0)
	    break;
	}
	return "";
}
function setCookie(el, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = el + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

/**
 * number count
 */
function number_width(el){
	var l = $(el).text().replace(/,/gi, "").length;
    if($(window).outerWidth() > 1024){
    	$(el).width(l * 26);
	}else{
		$(el).width(l *16);
	}
}
function number_count(el){
	
	$({ val : 0 }).animate({ val : $(el).data('val') }, {
	  duration: 3000,
	  step: function() {
	    var num = numberWithCommas(Math.floor(this.val));
	    $(el).text(num);
	    number_width(el);
	  },
	  complete: function() {
	    var num = numberWithCommas(Math.floor(this.val));
	    $(el).text(num);
	    number_width(el);
	  }
	});
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * scroll yn
 */
$.fn.hasScrollBar = function() {
  return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
};

/**
 * resize
 */
function _wiz_resize(){
	var _wiz_counts = $('._wiz_counts');
	_wiz_counts.each(function(i,v){
		//number_width(v);
	})
}
function checkResolution() {
    if (window.innerWidth < 1100) {
        $('body').addClass('ismobile');
    } else {
        $('body').removeClass('ismobile');
    }
}

/**
 * load
 */

$(function(){
	
	/*20250401 메인 개편 common*/
	
	$('.duo-wrap.main').addClass('show');
	
	// 버튼 이벤트 처리
    $(".duo-foot button").click(function () {
        $(".duo-foot button").removeClass("on");
        $(this).addClass("on");
    });

    $(".foot-link-02").click(function () {
        $(".duo-menu-layer.duo-menu").addClass("on");
    });

    $(".duo-menu-layer .btn-close").click(function () {
        $(".duo-menu-layer").removeClass("on");
    });

    // 아코디언 메뉴
    $(".accodian-list .menu-tit").click(function () {
        $(this).toggleClass("up").next(".menu-con").toggle();
    });

    $(".accodian-list > li .menu-tit").click(function () {
        var $parent = $(this).parent();
        if ($parent.hasClass("active")) {
            $parent.removeClass("active");
        } else {
            $(".accodian-list > li.active").removeClass("active");
            $parent.addClass("active");
        }
    });

    // 탭 기능
    $(".tab").click(function () {
        var targetId = $(this).data("tab");
        $(".tab").removeClass("active");
        $(".tab-content").removeClass("active");
        $(this).addClass("active");
        $("#" + targetId).addClass("active");
    });
	
	var content = $('.duo-content');
    var contentOffsetTop = content.offset().top; // .t-menu-wrap의 초기 위치

    $(".duo-content").on('scroll', function() {
        var scrollPosition = $(".duo-content").scrollTop();

        if (scrollPosition >= contentOffsetTop) {
            // .logo가 스크롤 위치에 도달하면 fixed 클래스 추가 
            $(".duo-header").addClass('fixed')
        } else {
            // .logo가 원래 위치로 돌아오면 fixed 클래스 제거 
            $(".duo-header").removeClass('fixed')
        }
    });
	
	$(window).on('scroll', function() {
	    var wscrollPosition = $(window).scrollTop();
	
	    if (wscrollPosition >= contentOffsetTop) {
	        // .logo가 스크롤 위치에 도달하면 fixed 클래스 추가 
	        $(".duo-header").addClass('fixed')
	    } else {
	        // .logo가 원래 위치로 돌아오면 fixed 클래스 제거 
	        $(".duo-header").removeClass('fixed')
	    }
	});
	
	checkResolution();
	
	/*resize*/
	$(window).resize(function(){
		_wiz_resize();
		_wiz_scroll_left_right();
		checkResolution()
	})
	
	/*count g*/
	var _count_01 = false;
	
	/*scroll top set*/
	/*
	var st = 0,h_off_t = 0;
	$(window).scroll(function(){
		st = $('html').scrollTop();
		h_off_t = $('.wiz_header_wrap').offset().top + $('.wiz_header_wrap').outerHeight();
		if(st >= h_off_t){
			$('.wiz_gnb_wrap').addClass('_fixed');
			$('.wiz_content_wrap').css('margin-top',$('.wiz_gnb_wrap').height() + 'px');
			$('._nav_logo').addClass('_onlogo');
		}else{
			$('.wiz_gnb_wrap').removeClass('_fixed');
			$('.wiz_content_wrap').css('margin-top','0');
			$('._nav_logo').removeClass('_onlogo');
		}
		main count_01
		if($('.count_01').visible() == true && _count_01 == false){
			//number_count('.count_01');
			$('.count_01').html($('.count_01').data('val'))
			_count_01 = true;
		}
		
		main or etr top scroll
		if(st >= 60){
			$('.wiz_header_wrap._ani').addClass('_height_z2');
			$('.wiz_header_wrap_m._dumy2').addClass('_on');
			$('.wiz_m_s_none').addClass('_on');
		}else{
			$('.wiz_header_wrap._ani').removeClass('_height_z2');
			$('.wiz_header_wrap_m._dumy2').removeClass('_on');
			$('.wiz_m_s_none').removeClass('_on');
		}
		
	})
	*/
	/*youtube iframe api*/
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	$('._iframe_video').on('click',function(){
		_wiz_youtube_clicks(this);
	});
	
	
	/*gnb mouse over*/
	$('._gnb_item').on('mouseover',function(){
		$('._gnb_item').removeClass('_on');
		$(this).addClass('_on');
	})
	$('.wiz_gnb_items').on('mouseleave',function(){
		$('._gnb_item').removeClass('_on');
		
		$('._wiz_gnb_select_ic').parent().removeClass('_on');	
		$('._wiz_gnb_select_ic').removeClass('rotate90');
	});
	$('.wiz_gnb_items').on('mousemove',function(e){
		var t = $('._gnb_item').last();
		var ofs = t.offset().left + t.width();
		var mos = e.pageX;
		if(mos > ofs){
			$('._gnb_item').removeClass('_on');
		}
	});
	
	$('._gnb_item_sub').on('mousemove',function(e){
		e.stopPropagation();
	});
	
	/*bottom select mouse over*/
	$('._footer_select_p_wrap').on('click',function(){
		$('._footer_select_p_wrap').removeClass('_on');
		$(this).addClass('_on');
	})
	$('._footer_select_p_wrap').on('mouseleave',function(){
		$('._footer_select_p_wrap').removeClass('_on');
	})
	/*gnb right mouse over*/
	$('._wiz_gnb_select_ic').on('click',function(){
		var _p = $(this).parent(); 
		if(_p.hasClass('_on')){
			_p.removeClass('_on');	
			$(this).removeClass('rotate90');
		}else{
			_p.addClass('_on');
			$(this).addClass('rotate90');
		}
	})
	/*search focus _mobile*/
	var _m_open = function(){
		$('.wiz_search.wiz_popup_style._m').addClass('_on');
		$('body,html').addClass('hidden_scroll_m');
		$('.wiz_search.wiz_popup_style._m').find('._input').focus();
	}
	$('.wiz_search_wrap ._input._m').on('focusin',function(){
		_m_open();
	});
	$('._wiz_product_search, .wiz_m_s_none').on('click',function(){
		_m_open();
	});

	
	$('.wiz_search_close').on('click',function(){
		$('.wiz_search.wiz_popup_style._m').removeClass('_on');
		$('body,html').removeClass('hidden_scroll_m');
	})
	$('.wiz_categorys_close').on('click',function(){
		$('.wiz_categorys.wiz_popup_style._m').removeClass('_on');
		$('body,html').removeClass('hidden_scroll_m');
	})
	/*search*/
	var _pc_open = function(){
		$('._wiz_search_add').addClass('_on');
		$('._wiz_s_s_wrap').addClass('_on');
	}
	$('.wiz_search_wrap ._input._pc').on('focusin',function(){
		_pc_open();
	});
	$('.wiz_search_wrap ._input._pc').one('focusin',function(){
		$(this).val('');
		$('._wiz_s_s_wrap ._btn._pc').hide();
		$('._wiz_s_s_wrap ._btn._search').show();
	});
	$('._wiz_s_s_wrap ._btn._pc').on('click',function(){
		var url = $(this).data('url');
		location.href = url;
	});
	$('._wiz_s_s_wrap ._btn._m').on('click',function(){
		var url = $(this).data('url');
		location.href = url;
	});
	$('._wiz_s_s_wrap ._btn._search').on('click',function(){
		if($('._wiz_s_s_wrap ._input._pc').val() == ''){
//			alert('검색어를 입력해 주세요');	
			$('._wiz_s_s_wrap ._input').focus();
		}else{
//			alert('검색');
		}
	})
	$('.wiz_search_wrap ._btn._mp').on('click',function(){
		if($('.wiz_search_wrap ._input._mp').val() == ''){
//			alert('검색어를 입력해 주세요');	
			$('.wiz_search_wrap ._input._mp').focus();
		}else{
//			alert('검색');
		}
	})
	
	$('.wiz_header_wrap').on('mouseleave',function(){
		$('._wiz_search_add').removeClass('_on');
		$('._wiz_s_s_wrap').removeClass('_on');
	})
	
	/*product sort click*/
	$('._wiz_sort_select > li._item').on('click',function(e){
		if($(this).hasClass('_on')){
			$(this).removeClass('_on');
		}else{
			$('._wiz_sort_select > li._item').removeClass('_on');
			$(this).addClass('_on');
		}
	});
	$('._wiz_sort_select').on('mouseleave',function(){
		$('._wiz_sort_select > li._item').removeClass('_on');
	})
	
	/*product title click*/
	$('._wiz_product_title').on('click',function(){
		if($(this).hasClass('_on')){
			$(this).removeClass('_on');
			$('._wiz_title_submenu').removeClass('_on');
		}else{
			$(this).addClass('_on');
			$('._wiz_title_submenu').addClass('_on');
		}
	})
	
	/*mobile category*/
	$('#wiz_mobile_btns ._cate').on('click',function(){
		$('.wiz_categorys.wiz_popup_style._m').addClass('_on');
		$('body,html').addClass('hidden_scroll_m');
	})
	
	/*s*/
	_wiz_scroll_left_right();
	
	/*scroll left drag ie x*/
	document.querySelectorAll('._drag').forEach(function(item) {
		var slider = item;
		var isDown = false;
		var startX;
		var scrollLeft;
		
		slider.addEventListener('mousedown', function(e) {
		  isDown = true;
		  slider.classList.add('active');
		  startX = e.pageX - slider.offsetLeft;
		  scrollLeft = slider.scrollLeft;
		});
		slider.addEventListener('mouseleave', function() {
		  isDown = false;
		  slider.classList.remove('active');
		});
		slider.addEventListener('mouseup', function() {
		  isDown = false;
		  slider.classList.remove('active');
		});
		slider.addEventListener('mousemove', function(e) {
		  if(!isDown) return;
		  e.preventDefault();
		  var x = e.pageX - slider.offsetLeft;
		  var walk = (x - startX) * 3; //scroll-fast
		  slider.scrollLeft = scrollLeft - walk;
		});
	})
	
	/*main_bnn next & prev hover*/
   $('.wiz_main_bnn .swiper-button-next , .wiz_main_bnn .swiper-button-prev').on('mouseover',function(){
      $('.wiz_main_bnn .swiper-slide-active').find('._img_zoom > img').addClass('scales');
   })
   $('.wiz_main_bnn').on('mouseleave',function(){
      $('.wiz_main_bnn .swiper-slide-active').find('._img_zoom > img').removeClass('scales');
   })
   
})

/**
 * scroll always right 
**/

function _wiz_scroll_left_right(){
	$('._wiz_sc_l_r').each(function(i,v){
		$(v).scrollLeft($(v)[0].scrollWidth);
	})
}



/**
 * youtube
 **/
function _wiz_youtube_clicks(me){
	var me = $(me);
	var ytid = me.data('youtube');
	_wiz_onYouTubeIframeAPIReady(ytid,me.find('._youtube')[0]);
}

var _youtube_arr = new Array(); 
function _wiz_onYouTubeIframeAPIReady(vid,target) {
	$('._iframe_video').off('click');
	$(target).parent().find('strong').hide();
	$(target).parent().find('span').hide();
	
	// 2025.03 메인 개편 img hide 추가
	$(target).parent().find('img').hide();
	
	if($(target).parent().find('iframe').length == 0){
		
		player = new YT.Player(
				target
				, {
		height: '100%',
		width: '100%',
		videoId: vid,
		playerVars: { 'autoplay': 1, 'playsinline' : 1 },
		rel : 0,
		events: {
			'onReady': _wiz_onPlayerReady,
		    'onStateChange': _wiz_onPlayerStateChange
			}
		});
		_youtube_arr.push(player);
	}else{
		$(target).show();
		target.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
	}
	
}
function _wiz_onPlayerReady(e){
	e.target.mute();
    e.target.playVideo();
}
function _wiz_onPlayerStateChange(event){
	if(event.data === 1){
		$(event.target.i).parent().find('strong').hide();
		$(event.target.i).parent().find('span').hide();
		$(event.target.i).parent().prev().show();
		
		$.each(_youtube_arr,function(i,v){
			if($(v.i).attr('id') != $(event.target.i).attr('id')){
				try{
					v.pauseVideo();
				}catch(e){
				}
			}
		})
	}
	if(event.data === 2){
		$(event.target.i).hide();
		$(event.target.i).parent().find('strong').show();
		$(event.target.i).parent().find('span').show();
		$(event.target.i).parent().prev().hide();
	}
	if(event.data === 0){
		$(event.target.i).parent().find('strong').show();
		$(event.target.i).parent().find('span').show();
		$(event.target.i).parent().append('<div class="_youtube"></div>');
		$(event.target.i).parent().prev().hide();
		$(event.target.i).remove();
	}
	
	$('._iframe_video').on('click',function(){
		_wiz_youtube_clicks(this);
	});
}

/**
*visible 
*/
$(function(){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       can accounts for vertical position, horizontal, or both
     */
    var $w=$(window);
    $.fn.visible = function(partial,hidden,direction,container){

        if (this.length < 1)
            return;
	
	// Set direction default to 'both'.
	direction = direction || 'both';
	    
        var $t          = this.length > 1 ? this.eq(0) : this,
						isContained = typeof container !== 'undefined' && container !== null,
						$c				  = isContained ? $(container) : $w,
						wPosition        = isContained ? $c.position() : 0,
            t           = $t.get(0),
            vpWidth     = $c.outerWidth(),
            vpHeight    = $c.outerHeight(),
            clientSize  = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = isContained ?
												rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
												rec.top >= 0 && rec.top < vpHeight,
                bViz = isContained ?
												rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
												rec.bottom > 0 && rec.bottom <= vpHeight,
                lViz = isContained ?
												rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
												rec.left >= 0 && rec.left <  vpWidth,
                rViz = isContained ?
												rec.right - wPosition.left > 0  && rec.right < vpWidth + wPosition.left  :
												rec.right > 0 && rec.right <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz,
		vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
                hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop 				= isContained ? 0 : wPosition,
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $c.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                position          = $t.position(),
                _top            = position.top,
                _bottom         = _top + $t.height(),
                _left           = position.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

});

