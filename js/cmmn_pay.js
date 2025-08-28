/**
 *	FO 공통 결제 JS
 */

var CmmnPay = (function() {
	
	//휴대폰인증
	var _kakaoPg = function (ordNo, mbrNo, itemNm, qty, totalAmt, vat){
		window.name='duolacMainWindow';
		
	    var param  = "?ordNo="    + encodeURI(ordNo);
	        param += "&mbrNo="    + encodeURI(mbrNo);
	        param += "&itemNm="   + encodeURI(itemNm);
	        param += "&qty="      + encodeURI(qty);
	        param += "&totalAmt=" + encodeURI(totalAmt);
	        param += "&vat="      + encodeURI(vat);
		var popup = window.open("/od/api/kakaopay/ready.do" + param, 'payment_popup', 'width=426,height=510,toolbar=no,location=no');
		popup.opener = self;
		
		// 다음 코드는 cordova를 사용하여 window와 연동합니다.
		popup.addEventListener('loadstop', function(event) {
			if(event.url.includes('od/api/kakaopay/success.do')){
//				console.log('popup.executeScript callback(retValue) = ' + retValue);
				 if(fnKakaoPgResult != undefined) fnKakaoPgResult(retValue);
				popup.close();
			} else if(event.url.includes('od/api/kakaopay/fail.do')){
				popup.close();
				alert('인증이 실패하였습니다.');
			} else if(event.url.includes('od/api/kakaopay/cancel.do')){
				popup.close();
				alert('인증을 취소하였습니다.');
			}
		});
		popup.addEventListener('loaderror', function(event) {
			fnKakaoPgResult('false');
			popup.close();
			alert('에러가 발생하였습니다.');
		});
	}

	return {
		kakaoPg				: _kakaoPg
	}
}());