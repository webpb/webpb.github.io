/******************************************************
@ Init
******************************************************/
$(function () {
    pResizeCheck = $(window).width();
    pnpos = $(window).scrollTop();				/* scroll top position */
    pSW = $(window).width();					/* window width */
    pSH = $(window).height();					/* window height */
    $('#thumb_page').find('a').each(function () {
        $(this).attr('data-slide-index', $(this).index());
    });
    thumb_slide = $('.thumb_slide').bxSlider({
        auto: false,
        controls: false,
        pagerCustom: '#thumb_page',
        infiniteLoop :true,
        touchEnabled: false
        //pager:
    });

    $('.option_check').find('input:radio[name=color]').change(function () {
        var _label = $(this).next();
        $('#option_name').show().html(_label.find('span').html());
    })
    checkData.init();
    product.init();
	
	$(function(){
		$('.faq_list').find('.faq_title').click(function(e){
			if($(this).parent().hasClass('active')){
				$(this).parent().removeClass('active');
				$(this).next().stop(true).slideUp(300);
			}else{
				downListSort($(this).parent().index());
			}
		});
	});
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
	}
	
});

$(document).ready(function () {
    product.scroll();
	if ($('.tab_data').length > 0) listSearch.init();
})

$(window).scroll(function () {
    pnpos = $(window).scrollTop();				/* scroll top position */
    pSW = $(window).width();					/* window width */
    pSH = $(window).height();					/* window height */
    product.scroll();
});//end scroll

$(window).resize(function () {
    if (pResizeCheck != $(window).width()) {
        pnpos = $(window).scrollTop();				/* scroll top position */
        pSW = $(window).width();					/* window width */
        pSH = $(window).height();					/* window height */
        checkData.resize();
        product.resize();
        product.scroll();
        pResizeCheck = $(window).width();
    }
});//end resize

/******************************************************
@ product
******************************************************/

var product = {
    bTarget: null,
    init: function () {
        product.bTarget = $('#btn_product');
        product.resize();
        product.scroll();
    },
    scroll: function () {
        var _top;

        if (pSW > 1024) {
            _top = product.bTarget.offset().top;
            if (pnpos >= _top - 58) {
                product.bTarget.addClass('fix');
            } else {
                product.bTarget.removeClass('fix');
            }
            $('#m_info').attr('style', '');
            $('#d_info').removeClass('m_fix');
            $('#d_info').removeClass('open');
            $('#btn_top_scroll').removeClass('open');



        } else {
            product.bTarget.removeClass('fix');
            _top = $('#s01').offset().top - 60;
            if (pnpos >= _top) {
                $('#d_info').addClass('m_fix');
                $('#btn_top_scroll').addClass('open');
                $('.btn_mobile_buy').addClass('actived');
            } else {
                $('#d_info').removeClass('m_fix');
                $('#btn_top_scroll').removeClass('open');
                $('.btn_mobile_buy').removeClass('actived');
                $('#d_info').removeClass('open');
                $('#container').attr('style', '');
            }
        }

        _top = $('#product_tab').offset().top;

        if (pnpos >= _top - 58) {
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
    open: function () {
        if ($('#d_info').hasClass('open')) {
            $('#d_info').removeClass('open');
            $('#container').css('z-index', '1')
        } else {
            $('#d_info').addClass('open');
            $('#container').css('z-index', '50')
        }

    },
    move: function (_id) {
        var _h = (pSW > 1024) ? 114 : 120;
        var _top = $('#' + _id).offset().top - _h;
        $('html,body').stop().animate({ scrollTop: _top }, 600)
    },
	size_open:function (_i) {
		if ($('.size_pop').hasClass('open')) {
            $('.size_pop').removeClass('open').stop(true).fadeOut(300);;
        } else {
			$('.size_pop').find('> div > div').eq(_i).show().siblings().hide();
            $('.size_pop').addClass('open').stop(true).fadeIn(300);
			product.move('s01');
			var _x = ($('.size_pop').find('.size_data > p').innerWidth()-$('.size_pop').find('.size_data').innerWidth())/2;
			$('.size_pop').find('.size_data').scrollLeft(_x);
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