$(function () {
	

    // Swiper 슬라이더 설정
    const tEvent = new Swiper(".event-section .swiper-container.event", {
        
		scrollbar: {
            el: ".event-section .duo-swiper-scroll",
            hide: false,
        },
        spaceBetween: 8,
		observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지: 1,
    });

    // Main Visual Swipe
    const mainVisual = new Swiper(".main-visual .swiper-container", {
        // pagination: {
        //     el: ".main-visual .swiper-pagination",
        //     clickable: true,
        // },
        spaceBetween: 0,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
		pagination: {            
            el: ".main-visual .swiper-pagination",
            /*renderFraction: function (currentClass, totalClass) {
                return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
            },
			*/
			type: "bullets",
			clickable: true, 
        },
        breakpoints: {
            320: { // 모바일 (불릿 형태)
                slidesPerView: 1,
            },
            1000: { // PC (현재 페이지 / 전체 페이지 형태)
                slidesPerView: 1,
            },
        },
    });

    // 자동 재생 및 일시 정지 버튼 이벤트
	$('#main-visual-ctr').on('click',function(){
		if($(this).hasClass('play')){
			$(this).addClass('stop').removeClass('play')
			mainVisual.autoplay.stop();
		}else{
			$(this).addClass('play').removeClass('stop')
			mainVisual.autoplay.start();
		}
	})

    // Best Product Swiper
    const bestProduct = new Swiper(".best-product-wrap .best-product.swiper-container", {
        spaceBetween: 18,
        pagination: {
            el: ".best-product-wrap .swiper-pagination",
        },
        scrollbar: {
            el: ".best-product-wrap .swiper-scrollbar",
        },
        breakpoints: {
            320: {
                slidesPerView: 2.1,
            },
            1100: {
                slidesPerView: 4,
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });

    // Banner Swiper
    const banner = new Swiper(".banner-wrap .banner.swiper-container", {
        spaceBetween: 18,
        pagination: {
            el: ".banner-wrap .swiper-pagination",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            1000: {
                slidesPerView: 1,
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });

    // New Product Swiper
    const newProduct = new Swiper(".new-products-wrap .new.swiper-container", {
        spaceBetween: 18,
        pagination: {
            el: ".new-products-wrap .swiper-pagination",
			type: "bullets",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            1000: {
                slidesPerView: 1,
				
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
		scrollbar: {
            el: ".new-products-wrap .duo-swiper-scroll",
            hide: false,
        },
    });
	
	// New Product2 Swiper
    const newProduct2 = new Swiper(".new-products-wrap2 .swiper-container", {
        spaceBetween: 18,
        pagination: {
            el: ".new-products-wrap2 .swiper-pagination.bullets_line",
			type: "bullets",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            1000: {
                slidesPerView: 1,
				
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
		scrollbar: {
            el: ".new-products-wrap2 .duo-swiper-scroll",
            hide: false,
        },
		navigation: {
			nextEl: '.new-products-wrap2 .custom-next',
			prevEl: '.new-products-wrap2 .custom-prev'
		},
		on: {
			touchMove(swiper) {
		      swiper.el.querySelector('.swiper-pagination').style.opacity = '0';
		    },
			touchEnd(swiper) {
		      swiper.el.querySelector('.swiper-pagination').style.opacity = '1';
		    },
			// 슬라이드 변경이 시작될 때만 페이징 감춤
		    slideChangeTransitionStart(swiper) {
		      swiper.el.querySelector('.swiper-pagination').style.opacity = '0';
		    },
		    // 슬라이드가 완전히 끝났을 때 페이징 다시 표시
		    slideChangeTransitionEnd(swiper) {
		      swiper.el.querySelector('.swiper-pagination').style.opacity = '1';
		    }
		  }
    });

    // OnEvent Swiper
    const onEvent = new Swiper(".onEvent-wrap .swiper-container.onevent", {
        spaceBetween: 18,
        pagination: {
            el: ".onEvent-wrap .swiper-pagination",
            type: "bullets",
        },
        scrollbar: {
            el: ".onEvent-wrap .swiper-scrollbar",
            draggable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.1,
            },
            1000: {
                slidesPerView: 3,
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });

    // Duo Experience Swiper
    
    const duo = new Swiper(".tab_swiper_contents .swiper-container", {
    	/* 추천 상품 관련 2개 이상 업로드 가능하도록 개발팀 변경 */
    	autoHeight : true,
	    calculateHeight : true,
		spaceBetween: 18,
        pagination: {
            el: ".tab_swiper_contents .swiper-pagination",
            clickable: true
        },
		breakpoints: {
            320: {
                slidesPerView: 2.1,
            },
            1000: {
                slidesPerView: 4,
            },
        },
        scrollbar: {
            el: ".tab_swiper_contents .swiper-scrollbar",
            draggable: true,
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });

/* 개발 수정 */
/*    
const duo = new Swiper('.duo-ex-wrap .swiper-container', { 
	  pagination: {
	    el: '.duo-ex-wrap .swiper-pagination',
	    clickable: true,
	    renderBullet: function (index, className) {
	    	let item = duopaginationTexts[index];
	        let crnNo = item.seq;
	        let text = item.text;

	        return `<span class="${className}" data-crnNo="${crnNo}">${text}</span>`;
	    },
	  },
	  spaceBetween : 8,
	  scrollbar: {
	    el: '.duo-ex-wrap .swiper-scrollbar',
	    draggable: true,
	  }
	});
*/

    // Media Swiper
    const media = new Swiper(".duo-media-wrap .swiper-container.media", {
        spaceBetween: 18,
        pagination: {
            el: ".duo-media-wrap .swiper-pagination",
            type: "bullets",
        },
        scrollbar: {
            el: ".duo-media-wrap .swiper-scrollbar",
        },
        breakpoints: {
            320: {
                slidesPerView: 1.1,
            },
            1000: {
                slidesPerView: 3,
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });

    // Brand Story Swiper
    const story = new Swiper(".brand-story-wrap .swiper-container.story", {
        spaceBetween: 18,
        pagination: {
            el: ".brand-story-wrap .swiper-pagination",
            type: "bullets",
        },
        scrollbar: {
            el: ".brand-story-wrap .swiper-scrollbar",
            hide: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.1,
            },
            1000: {
                slidesPerView: 3,
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });
	

	// 체험팩
    const expProduct = new Swiper(".exp-product.swiper-container", {
	    spaceBetween: 18,
	    pagination: {
	        el: ".exp-product .swiper-pagination",
	    },
	    scrollbar: {
	        el: ".exp-product .swiper-scrollbar",
	    },
	    breakpoints: {
	        320: {
	            slidesPerView: 2.1,
	        },
	        1100: {
	            slidesPerView: 4,
	        },
	    },
	    observer: true, // DOM 변경 감지
	    observeParents: true, // 부모 요소 변경 감지
	});
	
	// 유산균이야기
    const lactoStory = new Swiper(".lacto_story_list.swiper-container", {
	    spaceBetween: 30,
	    pagination: {
	        el: ".lacto_story_list .swiper-pagination",
	    },
	    scrollbar: {
	        el: ".lacto_story_list .swiper-scrollbar",
	    },
	    breakpoints: {
	        320: {
	            slidesPerView: 1.3,
	        },
	        1100: {
	            slidesPerView: 3,
	        },
	    },
	    observer: true, // DOM 변경 감지
	    observeParents: true, // 부모 요소 변경 감지
	});
	// 브랜드 스토어
    const brandStore = new Swiper(".brand_store.swiper-container", {
	    spaceBetween: 18,
	    pagination: {
	        el: ".brand_store .swiper-pagination",
	    },
	    scrollbar: {
	        el: ".brand_store .swiper-scrollbar",
	    },
	    breakpoints: {
	        320: {
	            slidesPerView: 1.1,
	        },
	        1100: {
	            slidesPerView: 3,
	        },
	    },
	    observer: true, // DOM 변경 감지
	    observeParents: true, // 부모 요소 변경 감지
	});
	
	const tabs_category = new Swiper(".main_cates.swiper-container", {
        spaceBetween: 16,
        pagination: {
            //el: ".banner-wrap .swiper-pagination",
        },
		slidesPerView: 4.2,
		//slidesOffsetBefore: 20,
	    //slidesOffsetAfter: 20,
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });
	
	// tab 용 
    const tabs3 = new Swiper(".tab_swiper", {
        spaceBetween: 6,
        pagination: {
            //el: ".banner-wrap .swiper-pagination",
        },
        breakpoints: {
            320: {
                slidesPerView: 4,
				slidesOffsetBefore: 20,
			    slidesOffsetAfter: 20,
            },
            1000: {
                slidesPerView: 10,
				slidesOffsetBefore: 0,
			    slidesOffsetAfter: 0,
            },
        },
        observer: true, // DOM 변경 감지
        observeParents: true, // 부모 요소 변경 감지
    });
});
