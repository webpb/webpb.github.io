$(function(){

	// sub swipe item
    const subMainItem = new Swiper('.sub-main-item-wrap .swiper-container.sub-main-item', { 
          spaceBetween : 8 ,
          pagination: {
            el: '.sub-main-item-wrap .swiper-pagination', 
          },
          scrollbar: {
            el: '.sub-main-item-wrap .swiper-scrollbar',
            hide: false, // 스크롤바 숨기지 않음
          }, 
          breakpoints: {
            320: {
                slidesPerView: 2.1,
            },
            1000: {
                slidesPerView: 6.1,
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });



});