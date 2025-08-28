/**
 *	FO 공통 JS
 */

var Cmmn = (function() {

	/**
	 * 빈값체크
	 */
	var _isEmpty = function(value) {
		if (value == "" || value == null || value == undefined || value == "undefined" || ( value != null && typeof value == "object" && !Object.keys(value).length )) {

			return true
		} else {

			return false
		}
	};

	/**
	 * 숫자콤마 포맷
	 */
	var _setComma = function(val) {

		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	/**
	 * 숫자콤마 언포맷
	 */
	var _setUnComma = function(val) {

		var result = parseFloat(String(val).replace(/,/g,""));

		if (isNaN(result)) {
				return 0;
		}

		return result;
	};
	
	/**
	 * 숫자만 입력
	 */
    var _setInputOnlyNumber = function(obj) {
        $(obj).val($(obj).val().replace(/[^0-9]/gi,""));
    }

    var _isNumeric = function(val) {
		return returnVal = /^(([0-9]{1,3}(,[0-9]{3})*(\.[0-9]*)?)|[0-9]+)?$/.test(val) ? true : false;
    }
    
    
	/**
	 *
	 * 첫번째 param 넘길 form id
	 * 두번째 주소
	 * ex) Cmmn.submit("headerFrm", "/mb/loginInit.do")
	 */
	var _submit = function(formId, addr) {
		var $formId = $("#" + formId);

		$formId.attr("action", addr);

		$formId.submit();
	}

	/**
	 * 검색조건용 시작 or 종료날짜 세팅
	 *
	 * 시작날짜 태그 start_date
	 * 종료날짜 클래스 end_date
	 * 종료날짜에 현재날짜가 들어가고 시작날짜엔 한달 전 날짜셋팅
	 */
	var _setSrchDate = function(setMonth) {
		var calEndDe= $(".start_date").length > 0 ? ($(".end_date").val().replace(/-/g, '/')) : "",
		 	nowDate = Cmmn.isEmpty(calEndDe) ? new Date() : new Date(calEndDe),
		 	month	= setMonth||1,
			eYear 	= nowDate.getFullYear(),
			eMonth 	= nowDate.getMonth() + 1,
			eDay	= nowDate.getDate(),
			sDate 	= nowDate.getTime() - ((30 * month) * 24 * 60 * 60 * 1000);

		 	nowDate.setTime(sDate);

		var sYear 	= nowDate.getFullYear(),
		 	sMonth 	= nowDate.getMonth() + 1,
		 	sDay 	= nowDate.getDate();

		if (eMonth < 10) {
			eMonth 	= "0" + eMonth;
		}

		if (eDay < 10) {
			eDay 	= "0" + eDay;
		}

		if (sMonth < 10){
			sMonth 	= "0" + sMonth;
		}

		if (sDay < 10) {
			sDay 	= "0" + sDay;
		}

		var startDate 	= sYear + "-" + sMonth + "-" + sDay;	// 한달전 	날짜
		var endDate 	= eYear + "-" + eMonth + "-" + eDay;	// 현재   	날짜

		$(".start_date").val(startDate);
		$(".end_date").val(endDate);
	}

	/**
	 * form 의 input text, input radio, textarea, selectbox 의 값을 obj로 만들어준다.
	 * @parameter   obj로 만들 타겟 Id  ( form, div, span .. 가능)
	 */
	var _formToObj = function(frmId) {
		var $frm 	= $("#" + frmId);
		var dataObj = {};
		var chkObj	= {};

		$frm.find("input:text, input:password, input:hidden, select, textarea, input:radio, input:checkbox").each(function(i, v) {
			var $input 	= $(this),
				name 	= $input.attr("name");

			if (!Cmmn.isEmpty(name)) {
				var val = "";

				if ($input.attr("type") === "radio") {
					val = $("#" + frmId + " input[name='" + name + "']:checked").val();
				} else if ($input.attr("type") === "checkbox") {

					if (Cmmn.isEmpty(chkObj[name])) {
						chkObj[name] = [];
					}

					if ($input.prop("checked")) {
						chkObj[name].push($input.val());
					}

					val = chkObj[name];
				} else {
					val = $input.val();
				}

				dataObj[name] = val;
			}
		});

		return dataObj;
	}
	
	var _objectifyForm = function(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
          returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }
    
	var _checkInputValidate = function(input) {
        var pattern = "";
        var title   = "";
        var isValid = false;
        var isRequired = input.hasAttribute("required");
        var isReadOnly = input.hasAttribute("readonly");
        if(input.hasAttribute("title"))
        {
            title = input.getAttribute("title");  
        }
        if(!isRequired && input.value.length == 0) 
        {
            isValid = true;
        } else if(isRequired && input.value.length > 0) 
        {
        	isValid = true;    
        } else if(input.hasAttribute("pattern")) {
            pattern = input.getAttribute("pattern");
            var re = new RegExp("^" + pattern + "$");
            isValid = re.test(input.value);
        } else if(input.hasAttribute("oninput")) {
            $(input).trigger("input");
            var msg = $(input).data("validMsg");
            isValid = msg == "";
            if(!isValid) title=msg;
        }
        //console.log(isValid, input.type, input.name, title, pattern, isRequired, isReadOnly);
        //if(isReadOnly) return true; //읽기전용은 체크하지 않음.
        if(input.type =="checkbox") {
            if(isRequired) {
                isValid = input.checked;    
            } else {
                isValid = true;
            }
        }
        if(isValid) return true;
        else {
            input.focus();
            window.scrollTo( window.scrollX, $(input).offset().top - 80);
            alert(title);
            return false;
        }
    }
	
	var _onFocusMove = function(strFind) {
		var $FindObj = $(strFind);
		$FindObj.focus();
        window.scrollTo( window.scrollX, $FindObj.offset().top - 80);
	}
	
	var _allChecker = function(strFindAllChecker, strFindChechers) {
        $(strFindAllChecker).click(function() {
            var $checkBox = $(strFindChechers);
            $(this).is(":checked") ? $checkBox.prop("checked", true) : $checkBox.prop("checked", false);
        });
    }
	
	var _onErrorProc = function( jqXHR, textStatus, errorThrown)
    {
    	if(jqXHR != undefined && jqXHR.responseText != undefined) {
    		var data = null;
    		try {
    			data = JSON.parse(jqXHR.responseText);
    		} catch(e) {
    			console.log("PARSE ERROR : ", e);
    		}
    		if(data != null && data.message != undefined) {
    			console.log(data.message);
    			alert("처리 중 오류가 발생하였습니다.");
    		}
    	}
    }
	
	var _formAjaxSave = function(strFindForm, strUrl, successCallback) {
		var frm = document.getElementById(strFindForm);
		var $frm = $(frm);
		var isSuccess = false;
		$frm.find('input[pattern], input[required]').each(function(index, obj) {
            return (isSuccess = Cmmn.checkInputValidate(obj)); 
        });
		if(isSuccess) {
			var param = JSON.stringify(Cmmn.objectifyForm($frm.serializeArray()));
			$.ajax({
	            type : 'post',
	            url : strUrl,
	            data : { "param" : param } ,
	            dataType : 'json',
	            error: _onErrorProc,
	            success : successCallback
	        });	
		}
	    return false;
	}
	
	var _changeEmailService = function(selEmailService, inputEmailService) {
		inputEmailService.value=selEmailService.value;
		inputEmailService.readOnly = selEmailService.selectedIndex > 0;
	}
	
	//휴대폰인증
	var _checkplusPopup = function (pType){
		window.name='duolacMainWindow';
		
		var openUrl = '/cmmn/niceid/checkplusInit.do';
		
		if(pType == 'fp'){
			openUrl += '?pType=fp';
		}else if(pType == 'fu'){
			openUrl += '?pType=fu';
		}else if(pType == 'ia') {
			openUrl += '?pType=ia';
		}else if(pType == 'joinSSO') {
			openUrl += '?pType=joinSSO';
		}
		
		var popup = window.open(openUrl, 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		popup.opener = self;
		
		// 다음 코드는 cordova를 사용하여 window와 연동합니다.  
		popup.addEventListener('loadstop', function(event) {
			if(event.url.includes('checkplus_success.do')){
				popup.executeScript({ code: 'calledFromOpener();' }, function(retValue) {
					 console.log('popup.executeScript callback(retValue) = ' + retValue);
					 
					popup.close();
					fnResult(retValue[0][0]);
				});
			} else if(event.url.includes('checkplus_fail.do')){
				popup.close();
				alert('인증이 실패하였습니다.');
			}});
		popup.addEventListener('loaderror', function(event) { 
			popup.close();
			alert('에러가 발생하였습니다.');
			});
	}

	var _ipinPopup = function(pType){
		window.name='duolacMainWindow';
		
		var openUrl = '/cmmn/niceid/ipinInit.do';
		
		if(pType == 'fp'){
			openUrl += '?pType=fp';
		}else if(pType == 'fu'){
			openUrl += '?pType=fu';
		}
		
		var popup = window.open(openUrl, 'popupIPIN', 'width=450, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	    popup.opener = self;
	    
	 // 다음 코드는 cordova를 사용하여 window와 연동합니다.  
		popup.addEventListener('loadstop', function(event) {
			if(event.url.includes('ipin_process.do')){
				popup.executeScript({ code: 'calledFromOpener();' }, function(retValue) {
					 console.log('popup.executeScript callback(retValue) = ' + retValue);
					 fnResult(retValue[0][0]);
					popup.close();
				});
			}});
		popup.addEventListener('loaderror', function(event) { 
			popup.close();
			alert('에러가 발생하였습니다.');
			});
	}

 	/**
     * 테이블 엘레멘트로 구현된 그리드의 데이터 취합용 내부 함수
     * @param parentSelector      : 현재 엘레멘트 id     (필수)
     * @param upprParam           : 상위 취합된 데이터   (필수)
     * @param formData            : 발송을 위한 form객체 (필수)
     */
 	var _multiSubList = function(parentSelector, upprParam, formData) {
 		console.log("cmmn : ", upprParam);
		var inputName = parentSelector.data("colNm");
		var param    = {};
		if(upprParam[inputName] === undefined) {
			upprParam[inputName] = [];
		}

		param['isNew'] = parentSelector.data('isNew');
		param['isUpd'] = parentSelector.data('isUpd');
		param['isDel'] = parentSelector.data('isDel');

		var elements = parentSelector.find("[data-row-col-nm]");

		for(var i=0;i<elements.length;i++) {
			var selector = $(elements[i]);
			var tagName = selector.prop("tagName");
			var colNm = selector.data('rowColNm');

			if(tagName === "SELECT") {
				param[colNm] = selector.val();
			} else if(tagName === "INPUT") {
				var inputType = selector.prop("type");
				switch(inputType) {
				case "radio" :
					if(selector.data("rowColVal") !== undefined) {
						param[colNm] = selector.data("rowColVal");
					} else {
						param[colNm] = selector.val();
					}
					break;
				case "checkbox" :
					if (selector.is(":checked")) {
						if(selector.data("rowColVal") !== undefined) {
							param[colNm] = selector.data("rowColVal");
						} else {
							param[colNm] = "";
						}
					} else {
						param[colNm] = selector.val();
					}
					break;
				case "file" :
					var files = selector.prop("files");
					var uid = _createFileUid();
					if(files.length > 0) {
						param[colNm] = uid;
						upprParam[uid] = selector.data('workCd');
					}
					for (var f = 0; f < files.length; f++) {
						formData.append(uid, files[f]);
					}
					break;
				default :
					param[colNm] = selector.val();
					break;
				}
			} else if(tagName === "TEXTAREA") {
				param[colNm] = selector.val();
			} else if (tagName === "P" || tagName === "TD") {
				param[colNm] = selector.text();
			}
		}
		upprParam[inputName].push(param);
 	}

 	var _createFileUid = function () {
 	    function s4() {
 	      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
 	    }
 	    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
 	}

    /**
     * 문자 입력가능 문자수 체크
     * @param id : tag id
     * @param title : tag title
     * @param maxLength : 최대 입력가능 수 (문자열 길이)
     */
 	var _maxLengthCheck = function(e, id, maxLength) {
      	var message = $(e).val();
      	var messageCount = $(e).val().length;
      	var limitByte = Number(maxLength);

         if(messageCount >= limitByte) {
         	var refineMessage = message;
         	for(var i=0;;i++){
         		refineMessage = refineMessage.substring(0, refineMessage.length -1);
         		refineLength = refineMessage.length;
         		if( limitByte <= refineLength){
         			continue;
         		}else{
         			$(e).val(refineMessage);
         			if(!id == false) {
         				$("#" + id).text(refineLength);
         			}
         			break;
         		}
         	}
         }else{
         	if(!id == false) {
         		$("#" + id).text(messageCount);
         	}
         }    
 	}
 	
    function _getToday() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        return mm+'/'+dd+'/'+yyyy;
    }

    function _getCookie(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    };

    function _isPopShow(no) {
        return _getToday() != _getCookie('dontshow' + no);
    }
    
    function _isPopShowLayer(no) {
        return _getToday() != _getCookie('dontshowLayer' + no);
    }

	return {
		isPopShow					: _isPopShow,
		isPopShowLayer				: _isPopShowLayer,
		getCookie					: _getCookie,
		getToday					: _getToday,
		isEmpty 					: _isEmpty,
		setComma                    : _setComma,
		setUnComma                  : _setUnComma,
		isNumeric					: _isNumeric,
		setInputOnlyNumber			: _setInputOnlyNumber,
		submit						: _submit,
		setSrchDate                 : _setSrchDate,
		formToObj 					: _formToObj,
		objectifyForm               : _objectifyForm,
		checkInputValidate          : _checkInputValidate,
		onFocusMove                 : _onFocusMove,
		allChecker                  : _allChecker,
		formAjaxSave                : _formAjaxSave,
		changeEmailService          : _changeEmailService,
		checkplusPopup              : _checkplusPopup,
		ipinPopup                   : _ipinPopup,
		multiSubList				: _multiSubList,
		createFileUid				: _createFileUid,
		onErrorProc                 : _onErrorProc,
		maxLengthCheck				: _maxLengthCheck
	}
}());