/******************************/
/*
/*	@ number_format
/*	- css �β댙�� �좎럡�댐옙占�,�좎떬�댿뵛�브퀗�ｏ옙占�
/*	- numberRing.init(�좎뜫爰껓옙袁�쾸�좑옙) �좎럩�뽨빳占� �좎뜫�뗰쭛占�
/*  -----------------------------------
/*	- option �띠룊��
/*	1.  _value				::	�좎뜫爰껓옙袁�쾸�좑옙
/*  4.  _comma				::	, �좎떬�녿뮔 �좎떬�듭삕(true?false)						::	�좎럩瑗뤄옙�껓옙�⑥�ъ읉
/*  5.  _letter				::	�좎뜫爰껓옙占� �좎럥理먲옙占� �띠룄�①댆占�(�좎럩裕뉛옙�얠춹�좑옙 占쎈툖�껃뜝�숈삕�좑옙)					::	�좎럩瑗뤄옙�껓옙�⑥�ъ읉
/*  6.  _cData				::	html div�좎럩裕꾬옙占�
/*  7.  _nData				::	�좎뜫爰껓옙占� �좎뜫�됵옙占� �띠룊��
/*  8.  _moveDirection		::	�좎뜫爰껓옙占� �β뼯�뉐퐲占� 占싸삳쐝�깍옙 �좎럡�댐옙洹쏆쾸�좑옙(up:�좎럡�э옙誘ㅼ뿉�좑옙,down::�좎럡�т빳占�)		::	�좎럩瑗뤄옙�껓옙�⑥�ъ읉
/*	9.  _autoStart			::	init�좎뜫�뗰쭛�듭삕�좑옙 �좎럥큔�뤄옙 �좎뜫�뗰쭛�듭삕占썲뜝占�(true?false)			::	�좎럩瑗뤄옙�껓옙�⑥�ъ읉
/*	10. _count				::	�좎뜫爰껓옙占� �β뼯�뉐퐲占� �좎럩伊볩옙�먯춺�븐슦逾졾뜝�숈삕 �좎럩�뺧옙占�						::	�좎럩瑗뤄옙�껓옙�⑥�ъ읉
/*
/******************************/

function numberTicker(t, _com) {

    var numberRing = {
        _value: 0,
        _comma: true,
        _letter: 0,
        _cData: new Array(),
        _nData: new Array(),
        _moveDirection: "up",
        _autoStart: false,
        _count: 2,
        _target: null,
        //number init(reset)
        init: function (_t) {
            numberRing._comma = _com;
            numberRing._target = _t;
            numberRing._value = numberRing._target.text();
            numberRing._target.text('');
            numberRing.charSet(String(numberRing._value));
            if (numberRing._autoStart) numberRing.start();

        },
        //number animation start
        start: function () {
            for (var i = 0; i < numberRing._cData.length; i++) {
                if (numberRing._cData[i].__type == 0) {
                    numberRing._cData[i].start();
                }
            }
        },
        //number animate reset
        reset: function (_cn) {
            for (var i = 0; i < numberRing._cData.length; i++) {
                if (numberRing._cData[i].__type == 0) {
                    numberRing._cData[i].reset();
                    numberRing._cData[i].start();
                }
            }
        },
        //number set
        charSet: function (_char) {
            var __cword = (numberRing._comma) ? numberRing.numCommaAdd(_char) : _char;
            var __dword = __cword.split("");
            var __target = numberRing._target;

            //html insert
            for (var i = 0; i < __dword.length; i++) {
                var __comHtml = jQuery("<div class='comma'><p><span>" + __dword[i] + "</span></p></div>");
                if (__dword[i] != ",") {
                    numberRing._cData[i] = new numberRing.__item(__dword[i]);
                    numberRing._nData.push(Number(__dword[i]))
                } else {
                    numberRing._cData[i] = (__comHtml);
                    __target.append(numberRing._cData[i]);
                }
            }
        },
        //item add
        __item: function (_value) {
            this.__type = 0;
            var __count = numberRing._count;
            var __target = numberRing._target;
            var __value = _value;
            var __Smin = 300;
            var __Smax = 500;
            var __list = jQuery("<div class='num'><p></p></div>");
            var __data = {
                _offy: 0,
                _dy: 0,
                _ease: 'linear',
                _speed: Math.floor(Math.random() * (__Smin - __Smax) + __Smax)
            }
            //1~9 create
            for (var i = 0; i <= 9; i++) {
                __list.find('>p').append("<span>" + i + "</span>");
            }
            __target.append(__list);

            var ry = Math.floor(Math.random() * (9 - 9) + 9)
            var Action = {
                start: function () {
                    __data._ease = (__count == 1) ? 'easeOutQuad' : 'linear';
                    __data._offy = (__count == numberRing._count) ? (__list.height() * ry) * -1 : (__list.find('> p').height() - __list.height()) * -1;
                    __data._dy = (__count == 1) ? Number(__value) * __list.height() * -1 : 0;
                    __list.find('> p').stop(true).css({ 'top': __data._offy }).animate({ 'top': __data._dy }, __data._speed, __data._ease, function () {
                        __count--
                        if (__count != 0) __data._speed = __data._speed * 2, Action.start();

                    });
                },
                reset: function () {
                    __count = numberRing._count;
                    __data._ease = 'linear';
                    __data._speed = Math.floor(Math.random() * (__Smin - __Smax) + __Smax);
                }
            }
            this.start = function () { Action.start(); }
            this.reset = function () { Action.reset(); }
        },
        //comma add
        numCommaAdd: function (_num) {
            str = String(_num);
            return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
        },
        //comma del
        numCommaDel: function (_num) {
            str = String(str);
            return str.replace(/[^\d]+/g, '');
        }
    }

    this._reset = function () {
        numberRing.reset();
    }

    numberRing.init(t);

}