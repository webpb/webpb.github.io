/******************************************************
@ input Number 길이 제한 cw 200811 추가
******************************************************/
  function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
      object.value = object.value.slice(0, object.maxLength);
    }    
  }

/******************************************************
@ Init
******************************************************/
$(function () {
	mResizeCheck		=	$(window).width();				/* ios resize scroll bug */
    npos					=	$(window).scrollTop();			/* scroll top position */
    SW					=	$(window).width();				/* window width */
    SH						=	$(window).height();				/* window height */

	common.init();
	contentPop.init();
	agent = common.checkMedia();


	/******************************************************
	@ Document Ready
	******************************************************/
	$(document).ready(function () {

		$('#n_wrap').addClass('start');

		$('.n_quick_wrap').on('scroll', function(){

			if(SW >= 640){
				if($(this).scrollTop() > 0){
					$('.quick_top').addClass('fix');
				}else{
					$('.quick_top').removeClass('fix');
				}
			}
		});

		if(SW >= 1024){
			$('#n_gnb li').bind('mouseenter focusin',function(){
				$('.all_shop').addClass('open');
				$('#n_header').addClass('all');
				$('#cover').css('z-index',105).stop(true).fadeIn(350);
			});
			$('#n_header').bind('mouseleave focusout',function(){
				if($('.all_shop').hasClass('open') && $('#n_header').hasClass('all')){
					$('.all_shop').removeClass('open');
					$('#n_header').removeClass('all');
					$('#cover').attr('style','');
				}
			});
		}

		//common.helpGridRedraw();

		// list_search
		$(".btn_search_control").on("click", function(){
			if(!$(".list_search").hasClass('on')){
				$(".list_search").addClass("on");
			}else{
				$(".list_search").removeClass("on");
			}
		});

		/** cw 200720 수정 시작 **/
		$('.pop_wrap').on('click',function(){
			var _target = $('.pop_data');
			var _px = _target.offset().left;
			var _py = _target.offset().top;
			var _w = _target.innerWidth();
			var _h = _target.innerHeight();

			if(event.srcElement != undefined && event.srcElement.id != undefined && (event.srcElement.tagName == "SELECT" || event.srcElement.tagName == "LABEL" || event.srcElement.tagName == "INPUT")) return;
			if(event.pageX < _px || event.pageX > _px + _w || event.pageY < _py || event.pageY > _py + _h){
				contentPop.close();
			}
		});
		/** cw 200720 수정 끝 **/

	});

	/******************************************************
	@ Window Load
	******************************************************/
	$(window).on("load",function () {

		common.sortSwipeTab();

	});

	/******************************************************
	@ Window Scroll
	******************************************************/
	$(window).on("scroll",function () {
		npos	=	$(window).scrollTop();
		SW	=	$(window).width();
		SH		=	$(window).height();
		common.scroll();
	});

	$('.duo-content').on("scroll",function () {
			npos	=	$(this).scrollTop();	
			SW	=	$(this).width();		
			SH		=	$(this).height();		
			common.scroll();
		});

	/******************************************************
	@ Window Resize
	******************************************************/
	$(window).on("resize",function () {
		if (mResizeCheck != $(window).width()) {
			npos	=	$(window).scrollTop();
			SW	=	$(window).width();
			SH		=	$(window).height();
			common.resize();
			common.scroll();
			contentPop.resize();
			mResizeCheck = $(window).width();
		}

	});

	/**
	 * form submit시 로딩바 처리.. 
	 */
	$("form").on("submit", function() {
		$('#loaderBackground').show();
		
		setTimeout(function() {
			$('#loaderBackground').hide();
		}, 3000);
		
	});

	/**
	 *  로고 처리..
	 */
	if($(location).attr('pathname') == '/new/brand.do') {
		const urlParams = new URL(location.href).searchParams;
		const menuParam = urlParams.get('menu');
		if(menuParam == 'duolac') {
			//$('.logo').css('background', 'url("/images/main/logo.svg") no-repeat 50% 50%');
			$('.logo').css('background', 'url("/images/duolac_logo.png") no-repeat 50% 50%');
		} else if (menuParam == 'duolab') {
			$('.logo').css('background', 'url("/images/main/logo-2.svg") no-repeat 50% 50%');
		} else if (menuParam == 'lactoclear') {
			$('.logo').css('background', 'url("/images/main/logo-3.svg") no-repeat 50% 50%');
		}
	} else {
		$('.logo').css('background', 'url("/images/duolac_logo.png") no-repeat 50% 50%');
	} 
	
});

/**
 * 로딩바 공통 처리
 */
$.ajaxSetup({
	beforeSend:function(){
		// progress bar open
		$("#loaderBackground").show();
		$("#loaderBackground2").show();
	},
	complete:function(){
		// progress bar hidden
		setTimeout(function() {
			$('#loaderBackground').hide();
			$('#loaderBackground2').hide();
		}, 1000);
	}
});


/**********************************
@ common
**********************************/
var common = {

    btnTopFlag: false,
	petTimer : null,

    init: function () {

		$('#n_header').find('.gnb_menu_list > li > a, .gnb_menu_list2 > li > a').click(function(){
			if(SW <= 1024){
				if(!$(this).parent('li').hasClass('actived')){
					$(this).parent('li').addClass('actived').siblings().removeClass('actived');
				}
			}
		});
		var topSlide = $('.top_notice_slide');
		if(topSlide.length == 1)
		{
			topSlide.bxSlider({
				mode : 'vertical',
				minSlides:1,
				maxSlides:1,
				auto: true,
				autoHover: true,
				autoDelay:4000,
				pager:false,
				infiniteLoop :true,
				useCSS: false,
				pause:4000,
				touchEnabled:false
			});
		}
		
		//딤드 배경 생성
		$('#n_wrap').append('<div id="cover"></div>');

		//딤드 배경 클릭시 이벤트
		$('#cover').click(function(){
			//검색영역 활성화시 닫기
			if($('#n_header').find('.n_top_search').hasClass('open')){
				common.searchClose();
			}

			//퀵 활성화시 닫기
			if($('#n_quick').hasClass('open')){
				common.quickClose();
			}

			//shop메뉴 활성화 닫기
			if($('.all_shop').hasClass('open')){
				$('.all_shop').removeClass('open');
				$('#n_header').removeClass('all');
				$('#cover').attr('style','');
			}
		});

		// quick notice
		$('.my_notice_wrap .btn_notice_del').on('click', function(){
			$(this).parent().hide();

			if($('.notice_list > p:visible').length <= 0 ){
				$('.my_notice_wrap').removeClass('open');
			}

		});
		$('.btn_notice_open').on('click', function(){
			$('.my_notice_wrap').addClass('open');
			$('.my_notice_wrap .notice_list > p').show();
		})

		this.scroll();
		this.resize();

	},

	helpTitleClick : function(e){
		e.preventDefault();
		var $target = $(e.target);
		var _cont = $(e.target).parents('.help_title').next('.help_detail')
		if(!_cont.hasClass('open')){
			$('.help_detail').removeClass('open');
			$('.help_title a').removeClass('active');
			$target.addClass('active')
			$target.parents('.help_title').next('.help_detail').addClass('open');
		}else{
			$target.removeClass('active')
			_cont.removeClass('open');
		}
	},

	helpGridRedraw : function() {
		/* help list control */
		$('.help_title > td > a').on('click', common.helpTitleClick);
	},

	scroll : function(){

		if (npos >= 100) {
            if (!common.btnTopFlag) {
                $('#btn_top_scroll').stop(true).fadeIn(300);
            }
            common.btnTopFlag = true;

        } else {
            if (common.btnTopFlag) {
                $('#btn_top_scroll').stop(true).fadeOut(300);
            }
            common.btnTopFlag = false;
        }
//		if(npos > $('#n_container').offset().top){
//			$('#n_header').addClass('fix');
//		}else{
//			$('#n_header').removeClass('fix');
//		}
	},

	resize : function(){

		this.scroll();

		if(SW > 1024){
			//desk
			$('#n_header').find('.gnb_menu_list > li, .gnb_menu_list2 > li > a').each(function(){
				var _target = $(this).find('> a');
				var _url		= _target.attr('data-url');
				_target.attr('href',_url);
			});
			$('.search_condition_list > div.btns > a:eq(1)').css("display", "");
			$('.search_condition_list > div').not(".btns").each(function() {
				this.style.display = null;
			});
		}else{
			//mobile
			$('#n_header').find('.gnb_menu_list > li, .gnb_menu_list2 > li > a').each(function(){
				$(this).find('> a').attr('href',$(this).find('> a').attr('href'));
			});
			if($('#n_header').find('.all_shop').hasClass('open')){
				$('#n_header').find('.all_shop').removeClass('open');
				$('#cover').stop(true).hide();
			}
//			$('.search_condition_list > div.btns > a:eq(1)').css("display", "none");
//			$('.search_condition_list > div').not(".btns").each(function() {
//				this.style.display = "none";
//			});
		}

		//table colspan control
		$('.colspan_data').each(function(){
			var _colspan = $(this).parents('tr').prev('tr').find('>td').length;
			if(SW > 1024){
				$(this).attr('colspan',_colspan);
			}else{
				$(this).attr('colspan','2');
			}
		});
	},

	sortSwipeTab : function(){
		//모바일에서 스와이프 탭 활성화 영역으로 셋팅
		if($('.swiper_tab').length){
			if(SW <= 1024){
				$('.swiper_tab').each(function(){
					var _scrollTarget = $(this).find('> ul');
					var _x = 0;
					var _i = 0;
					_scrollTarget.find('> li ').each(function(){
						if($(this).hasClass('actived')){
							_x = $(this).position().left;
							_i = $(this).index();
							//console.log(_x);

						}
					});
					_scrollTarget.scrollLeft(_x);
				});
			}
		}
	},

	quickOpen : function(){
		if($('.all_shop').hasClass('open')){
			$('.all_shop').removeClass('open');
			$('#n_header').removeClass('all');
		}
		$('#n_quick').addClass('open');
		$('#cover').css('z-index',105).stop(true).fadeIn(350);
		$('html').addClass('fix');

		if($('.purchase_product_slide').length > 0){
			$('.purchase_product_slide').bxSlider({
				minSlides:1,
				maxSlides:1,
				auto: true,
				autoHover: true,
				autoDelay:4000,
				pager:true,
				controls:false,
				pause:4000,
				infiniteLoop :true,
				useCSS: false,
				touchEnabled:false
			  });
		}

		if($('.benefit_slide').length > 0){
			$('.benefit_slide').bxSlider({
				minSlides:1,
				maxSlides:1,
				auto: true,
				autoHover: true,
				autoDelay:4000,
				pager:true,
				controls:false,
				pause:4000,
				infiniteLoop :true,
				useCSS: false,
				touchEnabled:false
			  });
		}
	},

	quickClose : function(){
		$('#n_quick').removeClass('open');
		$('#cover').stop(true).fadeOut(350,function(){
			$('#cover').attr('style','');
			$('html').removeClass('fix');
		});
	},

	quickToggle: function() {
		common.gnbClose();
		if($("#n_quick").hasClass("open")) {
			common.quickClose();
		} else {
			common.quickOpen();
		}
	},

	searchOpen : function(){
		$('#n_header').find('.n_top_search').addClass('open').removeClass('close');
		$('#cover').stop(true).fadeIn(350);
		if($('.all_shop').hasClass('open')){
			$('.all_shop').removeClass('open');
			$('#n_header').removeClass('all');
			$('#cover').css('z-index','80')
		}
	},

	searchMove : function(keyword) {
		 
		var encKeyword = encodeURIComponent(keyword)  ;
		 
		if( keyword == "﻿듀오락맘스" )
		{ 
			encKeyword = encKeyword.replace("%EF%BB%BF","") ;
		}
		 
		if(keyword !== undefined && keyword.length > 0) {
			window.location.href = "/gd/prdList.do?kwd=" + encKeyword;
		} else {
			window.location.href = "/gd/prdList.do";
		}
	},

	searchClose : function(){
		$('#n_header').find('.n_top_search').removeClass('open').addClass('close');
		$('#cover').stop(true).fadeOut(350);
	},

	/**200714 수정 시작**/
	gnbCheck : function(){
		if(!$('#n_header').hasClass('open')){
			$('#n_gnb').addClass('open');
			$('#n_header').addClass('open');
			$('html').addClass('fix');
			$(".btn_top_cart1").css("display","none");
			$(".btn_top_login1").css("display","none");
		}else{
			$('#n_gnb').removeClass('open');
			$('#n_header').removeClass('open');
			$('html').removeClass('fix');

			$(".btn_top_cart1").css("display","");
			$(".btn_top_login1").css("display","");
		}
	},
	/**200714 수정 끝**/
	gnbClose: function() {
		$('#n_gnb').removeClass('open');
		$('#n_header').removeClass('open');
		$('html').removeClass('fix');

		$(".btn_top_cart1").css("display","");
		$(".btn_top_login1").css("display","");
	},
	
	gnbToggle: function() {
        // common.quickClose();
        // common.gnbCheck();

		//$('.wiz_categorys.wiz_popup_style._m').addClass('_on');
		//$('body,html').addClass('hidden_scroll_m');
		$(".duo-menu-layer.duo-menu").addClass("on");
	},
	
	allShopOpen : function(){
		if($('.all_shop').hasClass('open')){
			$('.all_shop').removeClass('open');
			$('#n_header').removeClass('all');
			$('#cover').attr('style','');
		}else{
			$('.all_shop').addClass('open');
			$('#n_header').addClass('all');
			$('#cover').css('z-index',105).stop(true).fadeIn(350);

		}
	},

	parentScrollDisable : function(){
		/*$('body').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		});*/
	},

	parentScrollEnable : function(){
		$('body').off('scroll touchmove mousewheel');
	},

	getParameter:function(key){
		var url = location.href;
		var spoint = url.indexOf("?");
		var query = url.substring(spoint, url.length);
		var keys = new Array;
		var values = new Array;
		var nextStartPoint = 0;
		while (query.indexOf("&", (nextStartPoint + 1)) > -1) {
			var item = query.substring(nextStartPoint, query.indexOf("&", (nextStartPoint + 1)));
			var p = item.indexOf("=");
			keys[keys.length] = item.substring(1, p);
			values[values.length] = item.substring(p + 1, item.length);
			nextStartPoint = query.indexOf("&", (nextStartPoint + 1));
		}
		item = query.substring(nextStartPoint, query.length);
		p = item.indexOf("=");
		keys[keys.length] = item.substring(1, p);
		values[values.length] = item.substring(p + 1, item.length);
		var value = "";
		for (var i = 0; i < keys.length; i++) {
			if (keys[i] == key) {
				value = values[i];
			}
		}
		return value;
	},

	checkMedia:function(){
		var UserAgent = navigator.userAgent;
		var UserFlag = true;
		if (UserAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) UserFlag = false
		return UserFlag
	},

	getScrollBarWidth : function () {
		var inner = document.createElement('p');
		inner.style.width = "100%";
		inner.style.height = "200px";

		var outer = document.createElement('div');
		outer.style.position = "absolute";
		outer.style.top = "0px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild (inner);

		document.body.appendChild (outer);
		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		var w2 = inner.offsetWidth;
		if (w1 == w2) w2 = outer.clientWidth;

		document.body.removeChild (outer);

		return (w1 - w2);
	}
};


/**********************************
@ pop view
**********************************/
var contentPop = {
    btnTopFlag: false,
    target: null,
    init: function () {
        contentPop.target = $('#content_pop');
    },
    open: function (type, _url, param) {
		$('#n_wrap').attr('style','');
		$('#n_header').attr('style','');
		$('body').attr('style','');
        $('html').addClass('fix');
		contentPop.target.html('');
        jQuery.ajax({
            url: _url,
            type: type,
            data: param,
            beforeSend: function() {
            	// 팝업에서는 로딩바 취소
            },
            success: function (data) {
                var $newItems = $(data);
                contentPop.target.html($newItems);
                contentPop.target.scrollTop(0)
                contentPop.target.scroll(function () {
                });
                contentPop.target.stop(true).fadeIn(400);
				contentPop.contentHeightCheck();
                popFlag = true;
            },
            complete: function(result) {
            	
            	if(result.responseText == "invalidLogin"){
            		alert("로그인 후 이용바랍니다.");
            		window.location.href = "/login.do";
            	}
            	
            	$('#loaderBackground').hide();
            }, 
            error: function (result) {

            }
        });
    },
    openHtml: function (type, page, param) {
		$('#n_wrap').attr('style','');
		$('#n_header').attr('style','');
		$('body').attr('style','');
        $('html').addClass('fix');
		contentPop.target.html('');
        jQuery.ajax({
            url: "/getPopHtml.do?page=" + encodeURIComponent(page),
            type: type,
            data: param,
            beforeSend: function() {
            	// 팝업에서는 로딩바 취소
            },
            success: function (data) {console.log(contentPop.target)
                var $newItems = $(data);
                contentPop.target.html($newItems);
                contentPop.target.scrollTop(0)
                contentPop.target.scroll(function () {
                });
                contentPop.target.stop(true).fadeIn(400);
				contentPop.contentHeightCheck();
                popFlag = true;
	        },
            error: function (result) {

            }
        });
    },
    close: function () {
        $('html').removeClass('fix');
		$('#n_wrap').attr('style','');
		$('#n_header').attr('style','');
        contentPop.target.scrollTop(0)
        contentPop.target.stop(true).fadeOut(400, function () {
            contentPop.target.html('');
			common.parentScrollEnable();
        });
        popFlag = false;
    },
    change: function (type, _url, param) {
        contentPop.open(type, _url, param);
    },
    moveTop: function () {
        contentPop.target.stop(true).animate({ scrollTop: 0 }, 600)
    },
	contentHeightCheck : function(){
		if(contentPop.target.find('> div > div > div').innerHeight() > SH){

			if(SW > 1024){
				$('#n_wrap').css('padding-right',common.getScrollBarWidth() + 'px');
				$('#n_header').css('padding-right',common.getScrollBarWidth() + 'px');
			}
			common.parentScrollEnable();

		}else{
			common.parentScrollDisable();
		}
	},
	resize : function(){
		if(SW > 1024){
		}else{
			$('#n_wrap').attr('style','');
			$('#n_header').attr('style','');
		}
	}
}


var videoPop = {
	open : function(_url){
		$('html').addClass('fix');
		$('#avPop').show();
		$('#m_p_player').find('.v_i iframe').attr('src', _url);
	},
	close : function(){
		$('html').removeClass('fix');
		$('#avPop').hide();
		$('#m_p_player').find('.v_i iframe').attr('src', '');
	}
}



function addOrderAction(){
	$('#n_header').find('.add_order_pet').addClass('open');

	setTimeout(function(){
		$('#n_header').find('.add_order_pet').removeClass('open');
	},1500);
}

function scollTopStart() {
    $('html,body').stop().animate({ scrollTop: 0 }, 600)
	$('.duo-content').stop().animate({ scrollTop: 0 }, 600)
}

//파일첨부
function addInputFile(t) {
    var _t = $(t);
    var _p = _t.parents('.upload_review_file');
    var _line = '';
    _line += '<div class="upload_file">'
    _line += '<input type="file" name="' + _t.siblings('input[type=file]').prop('name') + '" id="" onchange="reviewFileChange(this);" />'
    _line += '<input type="text" name="" id="" readonly="readonly" placeholder="10MB이하 jpg/gif/png 파일만 업로드 가능" />'
    _line += '<div class="btn_attach_file">'
    _line += '<a href="javascript:;" onclick="reviewFileUpload(this)" class="btn_file">사진첨부</a>'
    _line += '<a href="javascript:;" onclick="deleteFile(this)" class="btn_remove"></a>'
    _line += '</div>'
    _line += '</div>'
    _p.append(_line);
}

function deleteFile(t) {
    var _t = $(t);
    var _p = _t.parents('.upload_file');
    _p.remove();
}

function fileUpload(){
	var uploadBtn = $(".upload_file").find('.btn_file');
	uploadBtn.parent('.btn_attach_file').siblings("input[type='file']").trigger("click");
}

function fileChange(){
	var uploadFile = $(".upload_file input[type='file']");
	uploadFile.siblings("input[type='text']").val(uploadFile.val());
}

function reviewFileUpload(_target) {
    var _t = $(_target)
    _t.parent('.btn_attach_file').siblings("input[type='file']").trigger("click");
}

function reviewFileChange(_target) {
    var _t = $(_target);
    var _val = _t.val();
   _t.siblings("input[type='text']").val(_val);
}

