/**
 *	상품공통
 */
var GOODS = {
	// 위시리스트
	sendWishList     : function(pdtCd) {

		$.ajax({
			url 		: "/gd/saveWishList.do",
			data 		: {"pdtCd" : pdtCd},
			datatype 	: "JSON",
			method		: "POST",

			success		: function(data) {

				if (data.result === "SUCCESS") {

					if(confirm("위시리스트로 이동하시겠습니까?")) {
						location.href = "/mypage/myWishList.do";
					}
				} else {
					alert(data.msg);
					if(data.msg != "이미 관심상품에 저장되었습니다."){
						location.href = "/login.do";
					}
	            }
			},

			error       : Cmmn.onErrorProc
		});
	},
	
	reloadSideInfo : function() {
		var quickBar = document.getElementById("n_quick");
		if(quickBar)
		{
			$.ajax({
				url 		: "/defaultSide.do",
				datatype 	: "HTML",
				method		: "POST",
				success		: function(html) {
					var loadSide = html.replace('<aside id="n_quick">', '').replace('</aside>', '');
					
					$(quickBar).html(loadSide);
				},
				error       : Cmmn.onErrorProc
			});
		}
	},
	getGoodsInfo	: function( pdtCd ) {
	 
		$.ajax({
    		url			: "/gd/getGoodsInfo.do",   
    		data		: { pdtCd :  pdtCd },
    		datatype	: "JSON",
    		async		: false,
    		method		: "POST",
    		success		: function(data) {
    			 
    			resultObj = data
    		},
    		error		: Cmmn.onErrorProc
    	});
    	
    	return resultObj;
		
	},

	// 장바구니
	sendCart	: function(pdtCd,sbflag) {
		/* 구매제한상품 정보갖고오기 
		 * lmtChkObj = {	buyLmtYn 	: "Y" 또는 "N" , 
						    buyLmtCond 	: "10" (신규회원전용),
						    beforeOrderCnt : 이전 구매건 count,
						    newMemberChk : true 또는 false (1개월 이내 가입고객이면 true) }
		 */
		
		var cnt = 0;
		var jsonArray 	= new Array();
		var bscObj	= {};
		bscObj.ordQty 	= "1";
		bscObj.pdtCd 	= pdtCd;
		if(sbflag == 'Y') bscObj.sbFlag = "Y";
		jsonArray[cnt] 	= bscObj;
		cnt++;
		
		var lmtChkObj = this.buyLmtYnChkFn(jsonArray);
		if(lmtChkObj === null) return;
		if(lmtChkObj.result === 'FAIL'){
			alert(lmtChkObj.msg);
			
			if(lmtChkObj.msgCode !== null && lmtChkObj.msgCode !== ''){
				window.location.href=lmtChkObj.msgCode;
			}
			
			return;
		}

		
		//		  [ START ] 구글애널리틱스  – 장바구니 추가 정보 수신을 위해 . 상품명과 금액을 가져오기 위해 쿼리함.
		var getGoodsInfo = this.getGoodsInfo(pdtCd);
		 
		gtag('event', 'add_to_cart', {
			  "send_to": "UA",  
			  "items": [
			    {
			      	"id"		: getGoodsInfo.pdtCd  ,
			      	"name"		: getGoodsInfo.pdtNm,
					"brand"		: "DUOLAC",
					"price"		: getGoodsInfo.salePrc ,
			      	"quantity"	: 1
				}
			]
		}); 
		//		  [ END ] 구글애널리틱스  – 장바구니 추가 정보 수신  
		
		// [ START ] Google Analytics 4   - 장바구니 추가 정보 수신 
		 
		gtag("event", "add_to_cart", {
			  send_to: "GA4",
			  currency: "KRW",
			  value: getGoodsInfo.salePrc,
			  items: [
			    {
			      item_id: getGoodsInfo.pdtCd ,
			      item_name: getGoodsInfo.pdtNm , 
			      affiliation     : "duolac.co.kr",
			      item_brand: "DUOLAC", 
			      price: getGoodsInfo.salePrc  ,
			      quantity: 1
			    }
			  ]
			});
		 
		//[ END ] Google Analytics 4  - 장바구니 추가 정보 수신   
		
		
		$.ajax({
			url 		: "/cart/insertCart.do",
			data 		: {cartParam : JSON.stringify(jsonArray)},
			datatype 	: "JSON",
			method		: "POST",
			success		: function(data) {
				if (data.result === "SUCCESS") {
					if(confirm("장바구니 화면으로 이동하시겠습니까?")) {
						if(sbflag == 'Y') {
							location.href = "/cart/cartView.do?billingYn=Y";
						} else {
							location.href = "/cart/cartView.do";
						}
					} else {
						GOODS.reloadSideInfo();
					}
				} else if(data.result === 'FAIL' && data.msgCode === 'BL-01'){
					alert(data.msg);
				}
			},
			error       : Cmmn.onErrorProc
		});
 	},

 	// 단건 바로구매
	sendOrder	: function(pdtCd) {
		/* 구매제한상품 정보갖고오기 
		 * lmtChkObj = {	buyLmtYn 	: "Y" 또는 "N" , 
						    buyLmtCond 	: "10" (신규회원전용),
						    beforeOrderCnt : 이전 구매건 count,
						    newMemberChk : true 또는 false (1개월 이내 가입고객이면 true) }
		 */
		var $formId = $("#headerFrm");
		var ordFm = '<input type="hidden" name="orderParam" />';
		$formId.append(ordFm);

		var jsonArray = new Array();
		var bscObj	= {};
		bscObj.ordQty 	= "1";
		bscObj.pdtCd 	= pdtCd;
		jsonArray[0] = bscObj;
		
		var lmtChkObj = this.buyLmtYnChkFn(jsonArray);
		if(lmtChkObj === null) return;
		if(lmtChkObj.result === 'FAIL'){
			alert(lmtChkObj.msg);
			
			if(lmtChkObj.msgCode !== null && lmtChkObj.msgCode !== ''){
				window.location.href=lmtChkObj.msgCode;
			}
			
			return;
		}

  	    $("#headerFrm > [name='orderParam']").val(JSON.stringify(jsonArray));

  	    $formId.attr({
			action : "/od/orderView.do",
			target : "_self",
			method : "POST"
		});

  	    $formId.submit();
 	},

 	// 다건 바로구매
 	sendOrderList : function(jsonArray) {
 		var lmtChkObj = this.buyLmtYnChkFn(jsonArray);
 		if(lmtChkObj === null) return;
 		if(lmtChkObj.result === 'FAIL'){
			alert(lmtChkObj.msg);
			
			if(lmtChkObj.msgCode !== null && lmtChkObj.msgCode !== ''){
				window.location.href=lmtChkObj.msgCode;
			}
			
			return;
		}
		
 		var $formId = $("#headerFrm");
		var ordFm = '<input type="hidden" name="orderParam" />';
		$formId.append(ordFm);

 		$("#headerFrm > [name='orderParam']").val(JSON.stringify(jsonArray));
 		if(confirm("선택된 상품을 주문하시겠습니까.")) {
	  	    $formId.attr({
				action : "/od/orderView.do",
				target : "_self",
				method : "POST"
			});

	  	    $formId.submit();
 		}
 	},

 	// 사이드바 단건삭제
    setDelCart : function(pdtCd) {

        var cnt = 0;
        var jsonArray   = new Array();
        var bscObj  = {};
        bscObj.pdtCd    = pdtCd;
        jsonArray[cnt]  = bscObj;
        cnt++;
        
        if(confirm("삭제하시겠습니까.")) {
        	this.fnDelCart(jsonArray, pdtCd);
        }
    },

 	// 사이드바 단건 장바구니 삭제 데이터 전송
    fnDelCart : function(jsonArray, delPrdCd) {
        $.ajax({
            url         : "/cart/deleteCartList.do",
            data        : {cartParam : JSON.stringify(jsonArray)},
            datatype    : "JSON",
            method      : "POST",

            success     : function(data) {

                if (data.result === "SUCCESS") {
                	
                	$("#sidePopCarts div[data-prd-cd='" + delPrdCd + "']").remove();
                	alert("삭제되었습니다");
                	
                	GOODS.cartCallBack();
                }
            },

            error       : Cmmn.onErrorProc
        });
    },
    
    // 장바구니 삭제 후 콜백함수
    cartCallBack : function() {
    	var $cartSize 	= $("#cartSize"),
    		cartSize	= 0;
    	
    	// 장바구니 상품 개수
    	if ($cartSize.text() !== "0") {
    		cartSize = Number($cartSize.text()) - Number($cartSize.text());
    		   		
    		$cartSize.text(cartSize);
    		
    		if (cartSize === 0) {
    			
        		// 결제 예정금액 삭제
        		$("#cartTotalPrice").remove();
    		}
    	} 
    	   	
    	// 상품 없을 경우
    	if ($("#sidePopCarts .product_info_wrap").length === 0) {
    		var divTag = document.createElement("div");
    		
    		divTag.setAttribute("class", "no_data");
    		divTag.textContent = "장바구니에 담긴 제품이 없습니다.";
    		
    		// 요소 어팬드
    		$("#sidePopCarts").after(divTag);
    	}
    },
    
    // 오늘본 상품 삭제
    setDelTodayPrd : function(pdtCd) {
    	var paramObj  = {};
        paramObj.pdtCd = pdtCd;	//값을 넘겨줍니다.
        
        if(confirm("삭제하시겠습니까.")) {
        	this.fnDelTodayPrd(paramObj);
        }
    },
    
    // 오늘본 상품 삭제 데이터 전송
    fnDelTodayPrd : function(paramObj) {
        $.ajax({
            url         : "/gd/delTodayPrd.do",
            data        : {param : JSON.stringify(paramObj)},
            datatype    : "JSON",
            method      : "POST",

            success     : function(data) {

                if (data.result === "SUCCESS") {
                	
                	$("#sideTodayPrdList li[data-prd-cd='" + paramObj.prdCd + "']").remove();
                	alert("삭제되었습니다");
                	
                	if ($("#sideTodayPrdList li").length === 0) {
                		var divTag = document.createElement("div");
                		
                		divTag.setAttribute("class", "no_data");
                		divTag.textContent = "최근 본 제품이 없습니다.";
                		
                		$("#sideTodayPrdList").append(divTag);
                	}
                }
            },

            error       : Cmmn.onErrorProc
        });
    },
    
    
    /* 구매제한상품 조회
	 * lmtChkObj = {	buyLmtYn 	: "Y" 또는 "N" , 
					    buyLmtCond 	: "10" (신규회원전용),
					    beforeOrderCnt : 이전 구매건 count,
					    newMemberChk : true 또는 false (1개월 이내 가입고객이면 true) }
											   
											   
	 */
    buyLmtYnChkFn : function(paramObjArray) {
    	/*
    	var paramObj = {},
    	    paramObjArray = new Array(),
    		resultObj = null;
    	
    	paramObj.pdtCd = pdtCd;
    	paramObj.ordQty = pdtQty;
    	paramObjArray[0] = paramObj;
    	*/
    	
    	$.ajax({
    		url			: "/gd/buyLmtYnChk.do",
    		data		: {param : JSON.stringify(paramObjArray)},
    		datatype	: "JSON",
    		async		: false,
    		method		: "POST",
    		success		: function(data) {
    			resultObj = data
    		},
    		error		: Cmmn.onErrorProc
    	});
    	
    	return resultObj;
    }
}