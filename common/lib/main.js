(function(){
    'use strict';

    function noLink() {
        var noLink = $('.no-link');

        noLink.on( 'click touch focus', function(e) {
            e.preventDefault();
        });
    }

    function selectBox($ele, $sub, $sel) {
        var $select = $($ele).find('.selected');
        var $sub = $($sub);

        var sV = '';

        $select.on('click focus', function () {
            if ( $(this).hasClass('active') ) {
                $(this).siblings('li').children($sub).stop().hide().removeClass('active');
                $(this).removeClass('active');
            } else {
                $(this).siblings('li').children($sub).stop().show().addClass('active');
                $(this).addClass('active');
            }
        });

        $sub.children('li').on('click', function () {
            sV = $(this).text();
            $(this).parents($ele).find($select).html('<span>' + sV + '</span>');

            // 셀렉트박스 옵션설정
            var sI = $(this).index();
            $(this).parents($ele).siblings($sel).children('option').attr('selected', false).eq(sI).attr('selected', true);
        });

        // 셀렉스박스 외 클릭시 셀렉트박스 닫힘
        $('html').on('click focus', function (e) {
            if ($(e.target).closest('.selected').length === 0) {
                $sub.hide().removeClass('active');
                $select.removeClass('active');
            }
        });
    }

    function autoWidth($ele, children) {
        $ele.each(function(i, e){
            var length = $(e).children(children).length;
            $(e).children(children).width(100 / length + '%');
        })
    }

    function floatTag() {
        // 태그 float
        var floatWidth = 0;

        $('.fs_hash').each(function (i, e) {
            var width = $(e).width() + 24;
            floatWidth += width * 1;
        });

        $('.fs_inner').width(floatWidth);
    }

    function popupEvent($btn) {
        // 팝업 열기
        $btn.on('click', function(e) {
            e.preventDefault();

            $('html, body').css('overflow', 'hidden');

            var popData = $(this).data('popup');
            $('#' + popData).show();
        });

        // 팝업 닫기
        $('.pop_close').on('click', function () {
            $('html, body').css('overflow', 'auto');
            $(this).parents('.popup-wrap').hide();
        });
    }

    // 체크박스 전체 체크
    function allAgree(all, check, thisCheck) {
        var $all = $(all);
        var $check = $(check);
        var allCheck = false;

        $all.on('click', function () {
            if (thisCheck == 'cart') {
                $check = $(this).parents('.cart-wrap').find('input[type="checkbox"]');
            }

            if (allCheck == true) {
                $check.each(function (i, e) {
                    $(e).prop('checked', false);
                });

                allCheck = false;
            } else {
                $check.each(function (i, e) {
                    $(e).prop('checked', true);
                });

                allCheck = true;
            }
        });

        $check.not(all).on('click', function () {
            if (thisCheck == 'cart') {
                $all = $(this).parents('.cart-wrap').find('.all-check');
                $check = $(this).parents('.cart-wrap').find('input[type="checkbox"]');
            }

            // 전체 체크 해제
            if (allCheck == true) {
                $all.prop('checked', false);

                allCheck = false;
            }

            var checkCount = $check.filter(':checked');
            if (checkCount.length == $check.length - 1) {
                $all.prop('checked', true);

                allCheck = true;
            }
        });
    }

        // 공용 슬라이더 모음
        function oneSlider($ele) {
            $ele.slick({
                arrows: false,
            });
        }

        function centerSlider($ele) {
            $ele.slick({
                arrows: false,
                centerMode: true,
                centerPadding: '30px',
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
            });
        }

    function countBtn() {
        var count = '.count-input',
            $plus = $('.count-input-box .plus'),
            $minus = $('.count-input-box .minus');


        $minus.on('click', function () {
            var nowValue = $(this).siblings(count).val();

            if (nowValue > 1) {
                nowValue -= 1;

                $(this).siblings(count).val(nowValue);
            }
        });

        $plus.on('click', function () {
            var nowValue = $(this).siblings(count).val();
            nowValue *= 1;
            nowValue += 1;

            $(this).siblings(count).val(nowValue);
        });
    }

    function dafaultTab(list, content) {
        $(list).eq(0).addClass('active');
        $(content).eq(0).addClass('active');

        $(list).on('click touch', function(){
            var thisIndex = $(this).index();

            $(this).addClass('active').siblings().removeClass('active');
            $(content).eq(thisIndex).addClass('active').siblings().removeClass('active');
        });
    }

    // Dom Ready
    $( function($) {
        // default selectbox
        selectBox('.sz-select_list', '.sz-select_sub', '.sz-select_sl');

        // a태그 링크 삭제
        noLink();

        // 자식 수에 따라 %width
        autoWidth($('.border_tab-list'), 'li');
        autoWidth($('.black_border_tab-list'), 'li');

        // float tag
        floatTag();

        // popup
        popupEvent($('.pop_open'));

            // 공용 슬라이더 load
                // 비슷한 스타일 아이템 slide
                $('.sibi_item-link').on('click', function(){
                    centerSlider($('#sibiItemPop .item_slide-wrap'));
                })

                $('.sibi_clo-box .pop_open').on('click', function () {
                    centerSlider($('#codyItemPop .center_slide-wrap'));
                })

        // 탑버튼
        $('#topBtn').on( 'click touch', function(){
            document.location.href('#');
        });

        // toggle btn
        $('.heart-btn').on( 'click', function(){
            $(this).toggleClass('active');
        });

        // 검색창 열기
        var searchWrap = '.float_search-wrap';
        // 포커스 시 seachwrap 오픈
        $('.search_wrap_open').on('focus click', function (e) {
            e.preventDefault();

            $(this).blur();
            $(searchWrap).animate({ top: 0 }, 500);

            $('body').addClass('scrollOff').on('scroll touchmove mousewheel', function (e) {
                e.preventDefault();
            });
        });

        var $close = $('.fs_close');
        $close.on('click touch', function () {
            $(this).parents(searchWrap).animate({ top: '100%' }, 500);

            $('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
        });

        // count btn
        countBtn();

        // all check form
        allAgree('#termsAgree .all-check', '#termsAgree input[type="checkbox"]');
        allAgree('#marketingAgree .all-check', '#marketingAgree input[type="checkbox"]');
        allAgree('#snsLogin .all-check', '#snsLogin input[type="checkbox"]');
        allAgree('.cart-wrap .all-check', '.cart-wrap input[type="checkbox"]', 'cart');
        allAgree('.pl_mo-fc .all-check', '.cart_pc-wrap input[type="checkbox"]');

        // 사이즈표 탭
        dafaultTab('.me-box .tab-list li', '.me-box .tab-content');
    });


    // 슬라이더바
    // Slider Standard sidebar ---------------------------------------------------
   var Option_SB1_st       = 'genoption_sidebar_width_sb1_stand', //ID option
       Option_SB2_st       = 'genoption_sidebar_width_sb2_stand', //ID option
       Option_SB1_value_st = '20', //Value Numer id
       Option_SB2_value_st = '32'; //Value Numer id

   var Slider_box_st    = $('.sb-width-slider-standard'),
       Slider_barS_st   = $('#sliderrange-S-standard'),
       Slider_barR_st   = $('#sliderrange-M-standard'),
       Slider_input1_cont_st = $('.sb-width-slider-standard .content-inputsd-1'),
       Slider_input2_cont_st = $('.sb-width-slider-standard .content-inputsd-2'),
       Slider_input1_st = $('#'+Option_SB1_st),
       Slider_input2_st = $('#'+Option_SB2_st);
   //---------------------------------------------------------------------------


   //SLIDER JQUERY  -------------------------------------------------------
   function Slider_single(BarS,S_Input1,S_Value1){
       BarS.slider({
             animate: "fast",
             // orientation: "vertical",
             range: 'min',
             min: 0,
             max: 100,
             step: 1,
             value: S_Value1,
             //values: [ IDoptionSB1_value, IDoptionSB2_value ], // values: [ 30, 99 ],
             slide: function( event, ui ) {   S_Input1.val( ui.value );     }
        });
   }
   // ----------------------------
   function Slider_multi2(BarR,S_Input1,S_Input2,S_Value1,S_Value2){
       BarR.slider({
             animate: "fast",
             // orientation: "vertical",
             range: true,
             min: 0,
             max: 100,
             step: 1,
             // value: 10,
             values: [ S_Value1, 100 - S_Value2 ], // values: [ 30, 99 ],
             slide: function( event, ui ) { S_Input1.val( ui.values[ 0 ]);   S_Input2.val( 100 - ui.values[ 1 ]);  }
        });
   }// ----------------------------

   function Slider_single_activation(BarS,S_Input1)         {  S_Input1.val( BarS.slider( "value" ) );  }
   function Slider_multi2_activation(BarR,S_Input1,S_Input2){  S_Input1.val( BarR.slider( "values", 0 ) );   S_Input2.val( 100 - BarR.slider( "values", 1 ) ); }

   function Slider_change(BarS,BarR,S_Input1,S_Input2){ BarR.slider("values", [ S_Input1.val(), (100 - S_Input2.val() )  ] ); BarS.slider("value",S_Input1.val() ); }




   //ACtion slider -------------------------
       //slider standard
   Slider_single(Slider_barS_st,   Slider_input1_st,   Option_SB1_value_st)
   Slider_multi2(Slider_barR_st,   Slider_input1_st,   Slider_input2_st,   Option_SB1_value_st,    Option_SB2_value_st)


   //start Page ------------------------------------------
       //slider standard
   Slider_single_activation(Slider_barS_st,  Slider_input1_st);
   Slider_multi2_activation(Slider_barR_st,  Slider_input1_st,  Slider_input2_st);

   //to Input on Slider ----------------------------------
       //slider standard
   Slider_input1_st.keyup(function()  { Slider_change(Slider_barS_st,  Slider_barR_st, Slider_input1_st,   Slider_input2_st)  });
   Slider_input2_st.keyup(function()  { Slider_change(Slider_barS_st,  Slider_barR_st, Slider_input1_st,   Slider_input2_st)  });
   Slider_input1_st.change(function() { Slider_change(Slider_barS_st,  Slider_barR_st, Slider_input1_st,   Slider_input2_st)  });
   Slider_input2_st.change(function() { Slider_change(Slider_barS_st,  Slider_barR_st, Slider_input1_st,   Slider_input2_st)  });


})(jQuery);
