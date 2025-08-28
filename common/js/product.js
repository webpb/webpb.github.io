/******************************************************
@ Init
******************************************************/
$(function () {
    pResizeCheck = $(window).width();
    pnpos = $(window).scrollTop();
    pSW = $(window).width();
    pSH = $(window).height();

  	$('.faq_list').on("click", ".faq_title", function() {
  		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
			$(this).next().stop(true).slideUp(300);
		}else{
			downListSort($(this).parent().index());
		}
  	});

  	$('.text_review_list').on("click", ".text > a", function(e) {
		e.preventDefault();
		if(!$(this).parent().hasClass('on')){
			$(this).parent().addClass('on').height('auto');
		}else{
			$(this).parent().removeClass('on').height('40px');
		}
	});

	checkData.init();
    product.init();
	productSlide.init();
});

$(document).ready(function () {

	if ($('.tab_data').length > 0) listSearch.init();
	$('img[usemap]').rwdImageMaps();

});

$('.duo-content').scroll(function () {
    pnpos = $('.duo-content').scrollTop();
    pSW = $(window).width();
    pSH = $(window).height();
    product.scroll();
});//end scroll

$(window).resize(function () {

    if (pResizeCheck != $(window).width()) {
        pnpos = $('.duo-content').scrollTop();
        pSW = $(window).width();
        pSH = $(window).height();
        checkData.resize();
        product.resize();
		productSlide.resize();
        pResizeCheck = $(window).width();
    }
});//end resize

/******************************************************
@ product
******************************************************/

var product = {
    bTarget: null,
    init: function () {
        product.resize();
        product.scroll();
    },
    scroll: function () {
        var _top;

        if (pSW > 1024) {
            $('#m_info').attr('style', '');
            $('#btn_top_scroll').removeClass('open');
        } else {
            _top = $('#s01').offset().top - 60;
            if (pnpos >= _top) {
                $('#btn_top_scroll').addClass('open');
            } else {
                $('#btn_top_scroll').removeClass('open');
                $('#container').attr('style', '');
            }
        }

        _top = $('#product_tab').offset().top;

        if (pnpos >= _top - 60) {
            $('#product_tab').addClass('fix');
        } else {
            $('#product_tab').removeClass('fix');

        }
    },
    resize: function () {
        if (pSW > 1024) {
            $('#m_info').attr('style', '');
            $('#container').attr('style', '');
        } else {
            $('#m_info').height($('#d_info').innerHeight());

        }
    },
    move: function (_id) {
        var _h = (pSW > 1024) ? 114 : 120;
        var _top = $('#' + _id).offset().top - _h;
        $('html,body').stop().animate({ scrollTop: _top }, 600);
		$('.view_tab').find('a').on('click', function(){
			$(this).parent('li').addClass('actived').siblings('li').removeClass('actived')
		})
    },
	mapOpen:function (_i) {
		if ($('.product_map_pop').hasClass('open')) {
            $('.product_map_pop').removeClass('open').stop(true).fadeOut(300);;
        } else {
            $('.product_map_pop').addClass('open').stop(true).fadeIn(300);
			product.move('s01');
        }
	}
}



/******************************************************
@ 모바일,피시 내용 구분
******************************************************/
var checkData = {
    flag: 0,
    init: function () {
        checkData.flag = (pSW > 1023) ? 0 : 1;
        checkData.resize();
    },
    resize: function () {
        if (pSW > 1023) {
            if (checkData.flag == 0) {
                $('#d_info').prependTo($('#scroll_wrap'));
                checkData.flag = 1;
            }
        } else {
            if (checkData.flag == 1) {
                $('#d_info').prependTo($('#m_info'));
                checkData.flag = 0;
            }
        }
    }
}

var listSearch = {
    target: null,
    init: function () {
        listSearch.resize();
    },
    resize: function () {
        $('.tab_data').each(function () {
            var _w = 0;
            var _x = 0;
            $(this).find('ul.tab_list .t_cell').each(function () {
                _w = _w + Math.ceil($(this).innerWidth());
                if ($(this).hasClass('actived')) {
                    _x = $(this).position().left;
                }
            });
            $(this).find('.tab_scroll').width(_w + 2);
            $(this).scrollLeft(_x);
        });
    }
}

var productSlide = {

	first : true,
	photoReview : null,
	reviewOption : null ,

    init: function () {

		productSlide.reviewOption = {
			slideWidth:0,
			minSlides:0,
			maxSlides:0,
			slideMargin:20,
			auto: false,
			pager:false,
			controls: true,
			touchEnabled:false,
			prevText: '<img src="../images/content/btn_photo_review_prev.png" alt="" width="22" />',
			nextText: '<img src="../images/content/btn_photo_review_next.png" alt="" width="22" />',
			infiniteLoop:true,
			useCSS: false,
		}
		this.resize();
	},

	resize : function(){
		productSlide.slideData();
	},

	slideData : function(){

		var slideW, slideN, slideM;

		slideN = 4;
		slideM = 20;
		if(SW <= 1280)slideN = 3;
		if(SW <= 1024)slideN = 6;
		if(SW <= 768)slideN = 5, slideM=10;
		if(SW <= 540)slideN = 4;
		if(SW <= 480)slideN = 3;

		slideW = $('.slide_wrap').innerWidth()/slideN;

		productSlide.reviewOption.slideWidth = slideW
		productSlide.reviewOption.slideMargin = slideM
		productSlide.reviewOption.minSlides = slideN
		productSlide.reviewOption.maxSlides = slideN
		productSlide.reviewOption.touchEnabled = (SW <= 1024)?true:false;

		if(productSlide.first){
			//first
			photoReview = $('.photo_slide').bxSlider(productSlide.reviewOption);
			productSlide.first = false;
		}else{
			if (photoReview.length > 0) photoReview.reloadSlider(productSlide.reviewOption);
		}
	}
};

function downListSort(_i){
	$('.faq_list').find('.faq_title').each(function(){
		if(_i == $(this).parent().index()){
			$(this).parent().addClass('active');
			$(this).next().stop(true).slideDown(300);
		}else{
			$(this).parent().removeClass('active');
			$(this).next().stop(true).slideUp(300);
		}
	});
};

function mapProduct(_i){
	$('.product_map_tab').find('> p').eq(_i).addClass('active').siblings().removeClass('active');
	$('.product_map_cont').find('> ul').eq(_i).show().siblings().hide();
}


