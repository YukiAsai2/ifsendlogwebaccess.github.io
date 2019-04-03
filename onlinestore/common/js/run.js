jQuery.noConflict();

// run on preload
(function($) {
    $('html').addClass('js-on');
})(jQuery);

(function ($) {
    $(function(){
        var o = {
            classes : {
                //クラス管理
                common : {
                    active : 'active'
                },
                button : {
                    btnUp        : 'count-up',
                    btnDown      : 'count-down',
                    validate     : 'validate',
                    btnBlack1    : 'btn-cart1',
                    btnBlack2    : 'btn-fitting',
                    btnGrayout1  : 'gray10',
                    btnGrayout2  : 'gray9',
                    btnHover     : 'gray2',
                    alertMes     : 'alert'
                },
                form : {
                    textbox5    : 'text-type5',
                    sizeParent  : 'select-size',
                    colorParent1 : 'select-color1',
                    colorParent2 : 'select-color2',
                    colorScheme  : 'color-scheme',
                    colorPallet  : 'color',
                    colorCheck   : 'check',
                    categorys    : 'select1',
                    staticSerch  : 'search',
                    aside        : 'input-aside',
                    allCheck     : 'allcheck'
                },
                rollover : {
                    target : 'roll'
                },
                closeup : {
                    colParent : 'col4-1',
                    cols      : 'col',
                    winFrame  : 'closeup-frame',
                    hover     : 'hover'
                },
                /*navi : {
                    navWrap      : 'nav-local',
                    activeClass  : 'open',
                    includeLists : 'child'
                },*/
                dialog : {
                    common : {
                        active : 'dialog-active',
                        count  : 'count'
                    },
                    modal : {
                        openTrigger  : 'modal',
                        closeTrigger : 'imp-close',
                        logBox       : 'modal-window',
                        screenLay    : 'dialogscreen',
                        overLay      : 'wrapoverlay'
                    }
                },
				gnavi : {
					navWrap          : 'nav-global',
					includeListsWrap : 'global-child'
				}
            },
            appearDialogWindow : function(selector){
                // A-PC-08x モーダルウィンドウ
                if ($('#purBtn').size() > 0) {
                    if(!$('#purBtn').hasClass('showModal')) {return;}
                }
                var hasClassActive = $('body').hasClass(eventClass.dialog.common.active),
                    uptoOneStage = selector.parent().next(),
                    uptoTwoStage = selector.parent().parent().next(),
                    preDialogBox      = (uptoOneStage.hasClass(eventClass.dialog.modal.logBox))? uptoOneStage : uptoTwoStage,
                    dialogBox = preDialogBox.clone(true),
                    boxInner       = dialogBox.find('a, input, button'),
                    underElems     = $('*').not(boxInner),
                    $win           = $(window),
                    winX   = $win.scrollLeft(),
                    winY   = $win.scrollTop(),
                    winW   = $win.width(),
                    winH   = $win.height(),
                    dialogOpt  = {
                        'width'  : 800,
                        'height' : null,
                        'zindex' : 102
                    },
                    dialogscreen  = '<div class="dialogscreen" style="background:#666; z-index:100; position:fixed; display : none; opacity:0.2; filter:alpha( opacity=20 ); height:100%; width:100%"></div>',
                    wrapOverLay   = '<div class="wrapoverlay" style="z-index:101; zoom:0;"></div>';

                if( hasClassActive ){
                    $('body > .' + eventClass.dialog.modal.logBox + ', .' + eventClass.dialog.modal.screenLay + ', .' + eventClass.dialog.modal.overLay ).hide().remove();
                        $('body').removeAttr('class');
                        underElems.removeAttr('tabindex');

                }
                else{
                    $('body').prepend(dialogscreen);
                    //overlayを挿入後高さ指定
                    $('.' + eventClass.dialog.modal.screenLay).before(wrapOverLay).show().css({
                        'height' : $('body').height()
                    });

                    $('.' + eventClass.dialog.modal.overLay).before(dialogBox);

                    $('body').prepend(dialogBox);
                    //一度現物の高さを取るためにshow()する
                    dialogBox.show().css({
                        'opacity' : 0,
                        'filter'  : 'alpha( opacity=' + 0 + ')',
                        'marginBottom' : 0
                    });
                    //その高さをoptionに代入
                    dialogOpt.height = dialogBox.height();

                    //一度リセットしてからcssをかける
                    dialogBox.removeAttr('style').css({
                        'marginBottom' : 0,
                        'width'       : dialogOpt.width,
                        'height'      : dialogOpt.height,
                        'left'        : 50 +'%',
                        'margin-left' : - ( dialogOpt.width / 2 ),
                        'top'         : 50 + '%',
                        'margin-top'  : - ( dialogOpt.height / 2 ) ,
                        'position'    : 'fixed',
                        'z-index'     : dialogOpt.zindex
                    }).show();

                    $('body').addClass(eventClass.dialog.common.active);
                    underElems.attr('tabindex',-1);
                    //閉じる際のイベント登録
                    $('.' + eventClass.dialog.modal.screenLay ).on('click', function(){
                        o.appearDialogWindow($(this));
                    });
                }
            },
            resetHeightEQ : function(){
                // A-PC-070 高さ揃え削除
                var targetItems = $('.' + eventClass.closeup.colParent + '> .' + eventClass.closeup.cols);
                targetItems.removeClass('nb1');
                targetItems.removeClass('nb2');
                targetItems.removeClass('nb3');
                targetItems.removeClass('nb4');
                $('.' + eventClass.closeup.colParent + '> .' + eventClass.closeup.cols + ':visible').equalizeHeight({ items_per_row: 4, group_by_parent : 'ul' });
            },
            closeUpWindow: function (selector, ev) {
                // A-PC-070 クローズアップウィンドウ
                var targetItem = selector.parents('.' + eventClass.closeup.cols),
                    itemFrame = targetItem.find('.' + eventClass.closeup.winFrame),
                    adjustPanel = targetItem.find('.right'),
                    colorButton = targetItem.find('.list-btn'),
					colorLabel = targetItem.find('p.icon');

                if (ev === 'mouseleave' || ev === 'focusout') {
                    targetItem.stop().removeClass(eventClass.closeup.hover);
                    adjustPanel.stop().removeAttr('style').hide();
                    $('.' + eventClass.closeup.colParent + '> .' + eventClass.common.active).removeClass(eventClass.common.active);
                    itemFrame.stop().removeAttr('style');
                    colorButton.show();
					colorLabel.hide();
                } else {
                    var i = targetItem.index(),
                        targetH = targetItem.outerHeight(false),
                        frameouterH = itemFrame.outerHeight(false),
                        $items = $('.' + eventClass.closeup.colParent + '> .' + eventClass.closeup.cols + ':visible'),
                        allitems = $items.length,
                        columns = 4,
                        allLines = allitems / columns,
                        columnPad = (targetItem.parents('.' + eventClass.closeup.colParent).innerWidth() - (targetItem.innerWidth() * 4)) / 4,
                        frameStyle = {
                            margBottom: targetItem.css('margin-bottom'),
                            bdWid: 1,
                            bdColor: '#cbcbcb',
                            bdStyle: 'solid',
                            paddleft: columnPad,
                            backColor: '#fff'
                        };

                    itemFrame.css({
                        'width': 180,
                        'margin-left': -frameStyle.paddleft,
                        'padding-left': frameStyle.paddleft - frameStyle.bdWid,
                        'border-width': frameStyle.bdWid,
                        'border-style': frameStyle.bdStyle,
                        'border-color': frameStyle.bdColor,
                        'background'  : frameStyle.backColor,
                        'margin-top' : -1,
                        'padding-bottom' : 0
                    });

                    colorButton.hide();
					colorLabel.show();

					var colorColumn = targetItem.find("ul.thumb:hidden").length;
					switch (colorColumn) {
					case 1:
					    blockWidth = 255;
					    break;
					case 2:
					    blockWidth = 320;
					    break;
					default:
					    blockWidth = 385;
					    break;
					}
					var windowWidth = $(window).width();
					var windowSpace = windowWidth - 1000;
					var windowHalfSpace = windowSpace / 2;
					var startPoint = itemFrame.offset().left;
					var endPoint = windowWidth - blockWidth - startPoint - 35;
					var blockEnd = startPoint + blockWidth;

					if ((windowWidth - blockEnd)-15 > 0) {
						// ブロックが収まる場合
					    itemFrame.animate({
					        'width': blockWidth,
							queue: false
					    }, 300, function () {
					        adjustPanel.hide();
					        adjustPanel.fadeIn();
					    });
					} else {
					    itemFrame.animate({
					        'margin-left': endPoint,
					        'width': blockWidth,
							queue: false
					    }, 300, function () {
					        adjustPanel.fadeIn();
					    });
					    adjustPanel.animate({
					        'left': endPoint + 180 + 15,
							queue: false
					    }, 300);
					}
					targetItem.addClass(eventClass.closeup.hover);
                }
            },
            caliculateAmount : function(selector){
                //共通カウント機能
                var buttonUi      = selector,
                    targetTextbox = buttonUi.prevAll('.' + eventClass.form.textbox5),
                    targetValue   = targetTextbox.attr('value');
                if( $.isNumeric(targetValue) ){
                    if( targetValue >= 0 && buttonUi.hasClass(eventClass.button.btnUp) ){
                        targetTextbox.attr('value', ++targetValue );
                    }
                    if( targetValue > 0 && buttonUi.hasClass(eventClass.button.btnDown) ){
                        targetTextbox.attr('value', --targetValue );
                    }
                }
            },
            switchActiveClass : function(selector){
                // A-PC-08x カラーサイズ選択時のactive切り替え
                var addTarget      = selector,
                    checklists     = addTarget.find('input'),
                	targetParent   = addTarget.parent(),
                	markTarget     = targetParent.find('dd'),
                    markTargetLeng = markTarget.length;

                for(var i = 0; i < markTargetLeng; i++){
                    var removeTarget = markTarget.eq(i);
                    if( removeTarget.hasClass(eventClass.common.active) ){
                        removeTarget.removeClass();
                    }
                }
                addTarget.addClass(eventClass.common.active);
//                this.changeButtonImages();
                return false;
            },
//            changeButtonImages : function(){
//                // A-PC-08x カラーサイズ選択時のバリデーション
//                var isSizeChecked = $('.' + eventClass.form.sizeParent + '> dd').hasClass(eventClass.common.active),
//                    isColorChecked = $('.' + eventClass.form.colorParent1 + '> dd').hasClass(eventClass.common.active);
//                if( isSizeChecked && isColorChecked ){
//                    this.switchDisabledButton(eventClass.button.btnGrayout1, eventClass.button.btnBlack1);
//                    this.switchDisabledButton(eventClass.button.btnGrayout2, eventClass.button.btnBlack2);
//                    $('.' + eventClass.button.alertMes).hide();
//                }
//            },
            switchDisabledButton : function(tagCls, newCls){
                //汎用クラス関数
                $('.' + tagCls, 'div.container').removeClass().toggleClass(newCls);
            },
            controllColorPallet : function(selector){
                //A-PC-010 カラーパレット操作
                var $this    = selector,
                    checkPar = $this.parents('li');
                checkPar.toggleClass(eventClass.form.colorCheck);
            },
            setupEnableToselect : function(){
                //カラーパレットをIE7向けに初期設定
                if( !$.support.style ){

                    $('.color-scheme td, .color-scheme th').css({
                        'border' : 0
                    });
                    $('.color-scheme ul').css({
                        'overflow' : 'hidden',
                        'position' : 'relative',
                        'zoom'     : 0
                    });
                }
            },
            resetStyleForIE : function(){
                //カラーパレットからIE７のスタイル削除
                $('.' + eventClass.form.colorScheme + ' td, .' + eventClass.form.colorScheme + ' th, .' + eventClass.form.colorScheme + ' ul, .' + eventClass.form.colorScheme).removeAttr('style');
            },
            /*enableToSelect : function(){
                //A-PC-010 ドリルダウン
                var mainSelect     = $('#category'),
                    keyVal         = mainSelect.val(), //主キー
                    keyLabel       = $('#category > option[ value = ' + keyVal +']').text(),
                    childrenSelect = $('.' + eventClass.form.categorys + '[ id != category ]' ),
                    firstSelect    = childrenSelect.eq(0),
                    firstVal       = firstSelect.val(),
                    secoundSelect  = childrenSelect.eq(1),
                    secoundVal     = secoundSelect.val();

                if( keyVal == 0 ){
                    childrenSelect.attr('disabled','disabled');
                    childrenSelect.find('option[ value = 0 ]').attr('selected','selected');
                    this.resetStyleForIE();
                    $('.' + eventClass.form.colorScheme + ' td, .' + eventClass.form.colorScheme + ' th, .' + eventClass.form.colorScheme + ' ul, .' + eventClass.form.colorScheme).hide();
                    this.setupEnableToselect();

                }
                else{
                    firstSelect.removeAttr('disabled');
                    firstSelect.find('optgroup').removeAttr('disabled');
                    secoundSelect.find('optgroup').removeAttr('disabled');
                    firstSelect.find('optgroup[ label !=' + keyLabel + ']').attr('disabled','disabled');
                    secoundSelect.find('optgroup[ label !=' + keyLabel + ']').attr('disabled','disabled');

                    this.resetStyleForIE();
                    $('.' + eventClass.form.colorScheme + ' td, .' + eventClass.form.colorScheme + ' th, .' + eventClass.form.colorScheme + ' ul, .' + eventClass.form.colorScheme).show();

                    if( firstVal != 0 ){
                        secoundSelect.removeAttr('disabled');
                    }
                }
            },*/
            /*toggleOpenSidenav : function(selector){
                //A-PC-070 ローカルナビ開閉
                var $this    = selector,
                    parNav   = $this.parent(),
                    conNav   = $this.nextAll('.' + eventClass.navi.includeLists);
                parNav.toggleClass(eventClass.navi.activeClass);

				if(parNav.hasClass(eventClass.navi.activeClass)){
					conNav.slideDown();
				} else {
					conNav.slideUp();
				}
            },*/
            searchItemForm : function(){
                //A-PC-070 ワンクリック検索機能
                var subjects  = $('.' + eventClass.form.aside + ' input:not(:checked), .' + eventClass.form.colorPallet + ' input:not(:checked)').parent(),
                    requests    = $('.' + eventClass.form.aside + ' input:checked, .' + eventClass.form.colorPallet + ' input:checked').parent();

                for(var i = 0; i < subjects.length; i++){
                    var norequestCls = subjects.eq(i).attr('class');
                    $('.' + eventClass.closeup.colParent + '> .' + norequestCls).hide();
                }
                for(var j = 0; j < requests.length; j++){
                    var requestCls = requests.eq(j).attr('class');
                    if( requests.length == 1 ){
                        $('.' + eventClass.closeup.colParent + '> .' + requestCls).show();
                    }
                    else{
                        $('.' + eventClass.closeup.colParent + '> li[ class=' + requestCls + ']').hide();
                    }
                }
                if( requests.length == 0 ){
                    $('.' + eventClass.closeup.colParent + '> li').show();
                }

                this.resetHeightEQ();

            },
            rolloverBackground : function(selector){
                // 汎用ロールオーバー
                var extension = [ '.jpg', '.png', '.gif' ],
                    added     = '_o',
                    $this     = selector.find('img'),
                    path      = $this.attr('src');

                for(var i = 0; i < extension.length; i++ ){
                    var rule = extension[i],
                        overed = added + rule;
                    if( path.match( overed ) ){
                        var _newPath = path.replace(overed,rule);
                        $this.attr('src', _newPath);
                        break;
                    }
                    if( path.match( rule ) ){
                        var _newPath = path.replace(rule,overed);
                        $this.attr('src', _newPath);
                        break;
                    }
                }
            },
            showSubGlobalNav: function(selector, ev){
				if(ev == 'mouseenter' || ev == 'focusin'){
					$('.' + eventClass.gnavi.includeListsWrap, selector).stop().fadeIn(300);
				} else if(ev == 'mouseleave' || ev == 'focusout'){
					$('.' + eventClass.gnavi.includeListsWrap, selector).fadeOut(100);
				}
            }
        },
        eventClass = o.classes;

        /*-------------------------setting--------*/

        $('.' + eventClass.closeup.winFrame + '> .' + eventClass.closeup.winFrame + ', .' + eventClass.form.colorScheme + ', .' + eventClass.form.staticSerch /*+ ', .' + eventClass.navi.includeLists*/).css({
            'display' : 'none'
        });

        /*$('.' + eventClass.navi.activeClass).removeClass();*/


        $('.left', '.' + eventClass.closeup.colParent + '> .' + eventClass.closeup.cols).equalizeHeight({ items_per_row: 4, group_by_parent : 'ul' });

        o.setupEnableToselect();

        $('.' + eventClass.button.btnDown + ', .' + eventClass.button.btnUp + ', .' + eventClass.button.alertMes + ', .' + eventClass.form.allCheck).show();


        $('.' + eventClass.button.btnUp + ', .' + eventClass.button.btnDown + ', .' + eventClass.form.sizeParent + '> dd, .' + eventClass.form.colorParent1 + '> dd' ).attr('tabindex', 0);


        o.switchDisabledButton(eventClass.button.btnBlack1, eventClass.button.btnGrayout1);
        o.switchDisabledButton(eventClass.button.btnBlack2, eventClass.button.btnGrayout2);

        $('.' + eventClass.button.enableParent).find('button[ type = submit ]').attr('disabled', 'disabled');

        $('.' + eventClass.form.categorys + '[ id != category ]' ).attr('disabled', 'disabled');

        $('a.' + eventClass.dialog.modal.openTrigger ).attr('href', '#');

        $('input[ type = text ],input[ type = checkbox ],input[ type = radio ]').on('keydown', function(e){
            if(e.which == 13){
                return false;
            }
        });
	$('.' + eventClass.form.colorParent1 + ', .' + eventClass.form.colorParent2 ).each(function(){
		var this_ = $(this);
		if (this_.find('.active')[0]) {
		} else {
			this_.next('p').css('visibility','hidden');
		}
	});

        /*-------------------------execute--------*/
        $('.' + eventClass.rollover.target + ' a').on('hover focus blur', function(){
            //汎用マウスオーバーイベント
            o.rolloverBackground($(this));
        });

        $('.' + eventClass.closeup.cols + ' .' + eventClass.button.btnHover + '> a').on('mouseenter focusin', function(e){
            var parItem = $(this).parents('.' + eventClass.closeup.cols);
            if( !parItem.hasClass(eventClass.closeup.hover) ){
                o.closeUpWindow($(this), e.type);
                return false;
            }
        });
        $('.' + eventClass.closeup.winFrame ).on('mouseleave', function(e){
            if( $(this).parents('.' + eventClass.closeup.cols).hasClass(eventClass.closeup.hover) ){
                o.closeUpWindow($(this), e.type);
                return false;
            }
        });
        $('.' + eventClass.closeup.winFrame + ' a:contains("ブランド名")').on('focusout', function(e){
            if( $(this).parents('.' + eventClass.closeup.cols).hasClass(eventClass.closeup.hover) ){
                o.closeUpWindow($(this), e.type);
            }
        });
        $('.' + eventClass.closeup.winFrame + ' a:contains("全色を見る")').on('focusout', function(e){
            o.closeUpWindow($(this), e.type);
        });

//        $('.' + eventClass.form.categorys ).on('change', function(e){
//            o.enableToSelect();
//        });

        $('.' + eventClass.button.validate + ' button').on('click', function(){
            var isDisabled = $('.' + eventClass.button.alertMes).is(':visible');
            if( isDisabled ){
                return false;
            }
        });

        $('.' + eventClass.form.sizeParent + ' dd , .' + eventClass.form.colorParent1 + ' dd , .' + eventClass.form.colorParent2 + ' dd').on('click keydown', function(e){
            if(e.which == 13 || e.type === 'click'){
                o.switchActiveClass($(this));
            }
        });
        $('.' + eventClass.form.sizeParent + ' dd , .' + eventClass.form.colorParent1 + ' dd , .' + eventClass.form.colorParent2 + ' dd').each(function(){
            var this_ = $(this);
            if(this_.find('input').is(':checked')) {
                o.switchActiveClass(this_);
            }
        });

        $('.' + eventClass.form.colorParent1 + ' dd img, .' + eventClass.form.colorParent2 + ' dd img').on('mouseover  active', function(){
            // Todo ツールチップ表示 #MIEC-47
            var this_ = $(this);
            var parent_ = this_.parent();
            var colorName = parent_.find('input').attr('title');
            if (!!colorName) {
                this_.parents('dl').next('p').css('visibility','visible');
                this_.parents('dl').next('p').text(colorName);
            } else {
                this_.parents('dl').next('p').css('visibility','visible');
            }
        });
        $('.' + eventClass.form.colorParent1 + ' dd img, .' + eventClass.form.colorParent2 + ' dd img').on('mouseout blur', function(){
            // Todo ツールチップ非表示 #MIEC-47
            var this_ = $(this);
            var parent_ = this_.parents('dl');
            var colorName = parent_.find('.active input').attr('title');
            if (!!colorName) {
                parent_.next('p').text(colorName)
            } else {
                parent_.next('p').css('visibility','hidden');
            }
        });

        /*$('.' + eventClass.navi.navWrap + '> li > a').on('click', function(){
            o.toggleOpenSidenav($(this));
            return false;
        });*/

        $('.' + eventClass.form.colorPallet + ' li').on('keydown', function(e){
            if( e.which == 13 ){
                o.controllColorPallet($(this));
            }
        });

        $('.' + eventClass.form.colorPallet + ' input').on('change', function(e){
            if(e.which == 13 || e.type === 'change'){
                o.controllColorPallet($(this));
            }
        });

        //$('.' + eventClass.form.aside + ' input, .' + eventClass.form.colorPallet + ' input').on('change', function(){
            //$(this).closest('form').submit();
            //o.searchItemForm();
        //});

        $('.' + eventClass.dialog.modal.openTrigger + ', .' + eventClass.dialog.modal.closeTrigger ).on('click', function(){
            if($('.' + eventClass.button.alertMes + ':visible').length){
                return false;
            }
            o.appearDialogWindow($(this));
            return false;
        });

        $('.' + eventClass.form.allCheck).on('click keydown',function(e){
            var this_ = $(this);
            if(e.which == 13 || e.type === 'click') {
                if(this_.attr('checked')){
                    this_.parents('tr').find('td input:checkbox').attr('checked','checked');
                } else {
                    this_.parents('tr').find('td input:checkbox').attr('checked',false);
                }
            }
        });

        // 以下共通
        $('.' + eventClass.button.btnUp).on('click keydown', function(e){
            if(e.which == 13 || e.type === 'click'){
                o.caliculateAmount($(this));
                return false;
            }
        });
        $('.' + eventClass.button.btnDown).on('click keydown', function(e){
            if(e.which == 13 || e.type === 'click'){
                o.caliculateAmount($(this));
                return false;
            }
        });

        $('li', '.' + eventClass.gnavi.navWrap).on('mouseenter focusin mouseleave focusout', function(e){
            //グローバルナビ
			o.showSubGlobalNav($(this), e.type);
        });

		// トップタブUI
//		var exTab = $('.ex-tab');
//		exTab.each(function(){
//			var elem_ = $(this);
//			var tabBtn_ = elem_.find('.tab-category a');
//			tabBtn_.on('click',function(){
//				var this_ = $(this);
//				var index_ = tabBtn_.index(this);
//				var target_ = elem_.find('.ex-tab-target');
//				target_.hide();
//				$(target_[index_]).show();
//				tabBtn_.removeClass('current');
//				this_.addClass('current');
//				return false;
//			});
//		});

		// トップカルーセル
		var $topCarousel = $("#index-cate-visual ul");
		if($topCarousel.length){

		var $lastItem = $("ul li:last", "#index-cate-visual").remove();
		$("#index-cate-visual ul").prepend($lastItem);

			$topCarousel.carouFredSel({
				circular: true,
				infinite: true,
				auto: 4000,
				scroll: {
					items: 1,
					pauseOnHover: true,
					onBefore: function(oldItems) {
						$("#index-cate-visual ul li").find("img").animate({opacity:0.3}, 200);
					},
					onAfter: function(oldItems2){
						$("#index-cate-visual ul li").find("img").filter(":eq(1)").animate({opacity:1}, 200);
					},
					duration: 1000
				},
				prev: {
					button: ".prev",
					key: "left"
				},
				next: {
					button: ".next",
					key: "right"
				},
				pagination: {
					container: ".index-cate-thumb",
					items: 1,
					anchorBuilder: false

				},
				items: {
					width: 765,
					height: 240
				}
			});
		}


// カテゴリトップカルーセル
var $categoryCarousel = $("ul.carousel-main", "#cate-carousel");
if ($categoryCarousel.length) {
$categoryCarousel.carouFredSel({
circular: true,
infinite: true,
auto: 4000,
scroll: {
items: 1,
pauseOnHover: true,
duration: 1000
},
prev: {
button: ".prev",
key: "left"
},
next: {
button: ".next",
key: "right"
},
pagination: {
container: ".carousel-thumb",
items: 1,
anchorBuilder: false
}
});
} 
		// 商品詳細カルーセル
		var $itemsCarousel = $(".item-carousel");
		$itemsCarousel.each(function(){
			var this_ = $(this);
			var carousel_ = this_.find('ul.crs-items');
			var liLength_ = carousel_.find('li').length;
			var pages_ = Math.ceil(liLength_ / 6) - 1; // カルーセルのページ数
			var carouselFunc_ = function(){
				if(this_.length){
					carousel_.carouFredSel({
						circular: false,
						infinite: false,
						auto: false,
						scroll: {
							items: 6,
							pauseOnHover: true,
							onAfter: function(pos){
								var pos_ = Math.ceil( (carousel_.triggerHandler('currentPosition') + 6) / 6) - 1;
								if (pos_ == 0) {
									this_.find('.prev').addClass('disabled');
								} else if (pos_ == pages_) {
									this_.find('.next').addClass('disabled');
								} else {
									this_.find('.disabled').removeClass('disabled');
								}
							}
						},
						prev: {
							key: "left"
						},
						next: {
							key: "right"
						}
					});
					this_.find('.prev').click(function(){
						carousel_.trigger('prev')
						return false;
					});
					this_.find('.next').click(function(){
						carousel_.trigger('next')
						return false;
					});
				}
			};
			if ($.browser.msie) {
				carouselFunc_();
			} else {
				this_.find('img').first().load(function(){
					carouselFunc_();
				});
			}
		});

		// 商品詳細画像カルーセル
 		var $itemsCarousel = $(".item-img-carousel");
		$itemsCarousel.each(function(){
			var this_ = $(this);
			var carousel_ = this_.find('ul.crs-items-product');
			var liLength_ = carousel_.find('li').length;
			var pages_ = Math.ceil(liLength_ / 7); // カルーセルのページ数
			if (pages_ == 1) {
				this_.find('.prev-product').hide();
				this_.find('.next-product').hide();
			}
			var carouselFuncx_ = function(){
				if(this_.length){
					carousel_.carouFredSel({
						circular: false,
						infinite: false,
						auto: false,
						scroll: {
							items: 7,
							onAfter: function(pos){
								var pos_ = Math.ceil( (carousel_.triggerHandler('currentPosition') + 7) / 7) - 1;
								if (pos_ == 0) {
									this_.find('.prev-product').addClass('disabled');
								} else if (pos_ + 1 == pages_) {
									this_.find('.next-product').addClass('disabled');
								} else {
									this_.find('.disabled').removeClass('disabled');
								}
							}
						},
						prev: {
							key: "left",
						},
						next: {
							key: "right",
						}
					});

					this_.find('.prev-product').click(function(){
						carousel_.trigger('prev')
						return false;
					});
					this_.find('.next-product').click(function(){
						carousel_.trigger('next')
						return false;
					});
				}
			};
			if ($.browser.msie) {
				carouselFuncx_();
			} else {
				this_.find('img').first().load(function(){
					carouselFuncx_();
				});
			}
		});

		// A-PC-081 Favorite
		$('.list-favorite').each(function(){
			var this_ = $(this);
			var list_ = this_.find('.ex-list-favorite');
			var favs_ = list_.find('li');
			var trigger_ = this_.find('> li > a,> li > button');
			var addBtn_ = this_.find('.ex-list-favorite-add');
			var alert_ = this_.find('.ex-alert');
			var mouseoutFlag_ = false;
			var funcAddFav_;
			var timeout_;

			list_.hide();
			alert_.hide();

			trigger_.click(function(){
				list_.slideToggle('fast');
				return false;
			});

			addBtn_.click(function(){
//				var newListName_ = window.prompt('新しいお気に入りリスト名','');
				var newListName_ = '新しいリスト';
				var message_ = '「' + newListName_ + '」に追加しました'
				if (!!newListName_) {
					funcAddFav_(message_);
				}
				list_.find('ul').append('<li class="active"><a href="#"><span class="ex-list-favorite-status">非公開</span><span class="newName"></span></a></li>');
				list_.find('li').last().find('.newName').text(newListName_);
				return false;
			});

			list_.on('mouseout',function(){
				mouseoutFlag_ = true;
				timeout_ = setTimeout(function(){
					if(mouseoutFlag_) {
						list_.fadeOut('slow')
					}
				},2000);
			});

			list_.on('mouseover',function(){
				mouseoutFlag_ = false;
				clearTimeout(timeout_);
			});

			list_.delegate('li','click',function(e){
				var this_ = $(this);
				var message_ = '';
				if (this_.hasClass('active')) {
					message_ = '「' + this_.find('span').last().text() + '」に登録済みです'
				} else {
					message_ = '「' + this_.find('span').last().text() + '」に追加しました'
					this_.addClass('active');
				}
				funcAddFav_(message_)
				return false;
			})

			funcAddFav_ = function(message_){
				alert_.text(message_);
				alert_.show();
				setTimeout(function(){
					alert_.fadeOut('slow');
				},1000);
			}
		});

		// A-PC-081
		$('form.validate-cond').each(function(){
			var this_ = $(this);
			var require_ = this_.find('.ex-validate-require');
			var requireInput_ = require_.find('input');
			var requireInputLabel_ = require_.find('label');
			var requireSelect_ = require_.find('select');
			var btnCart_ = this_.find('.gray10,.btn-cart1')
			var btnFitting_ = this_.find('.gray9,.btn-fitting')
			var btns_ = this_.find('.gray10 button,.gray9 button');
			var funcCheck_ = function(){
				var flag_ = true;
				require_.each(function(){
					var this_ = $(this);
					if (flag_) {
						if(this_.find('input')[0]) {
							flag_ = !!this_.find('input').filter(':checked').val();
						} else if (this_.find('select')[0]) {
							flag_ = !!this_.find('select').val();
						}
					}
				});
				if (flag_) {
					funcToggleAlert_('hide');
					btns_.css({'cursor':'pointer','opacity':''});
					btns_.attr('disabled',false);
					btnCart_.removeAttr('class').addClass('btn-cart1');
					btnFitting_.removeAttr('class').addClass('btn-fitting');
				} else {
					funcToggleAlert_('show');
					btns_.css({'cursor':'default','opacity':'1'});
					btns_.attr('disabled',true);
					btnCart_.removeAttr('class').addClass('gray10');
					btnFitting_.removeAttr('class').addClass('gray9');
				}
			}
			var funcToggleAlert_ = function(flag_) {
					this_.find('.ex-validate-alert').each(function(){
						var alert_ = $(this);
						if (flag_ === 'hide') {
							alert_.hide();
						} else if (flag_ === 'show') {
							alert_.show();
						}
					});
			}
			//init
			funcCheck_();
			//event
			requireSelect_.on('change',function(){
				funcCheck_();
			});

			if (!$.support.leadingWhitespace) { // IE8以下
				requireInputLabel_.on('click',function(e){
					$(this).find("input").attr("checked", "checked");
					funcCheck_();
				});
			} else {
				requireInput_.on('change',function(){
					funcCheck_();
				});
			}
		});


    });
    // レイアウトセット
    $(function () {
        $('div.box-sort dd:nth-child(2)').addClass('first-child');
        $('.nav-global .child li:last-child').addClass('last-child');
    });

    $(function () {
    // 高さ揃え実行
        $('.section-search .section').not('.page-link').equalizeHeight();
        $('.col2-3 > .col').equalizeHeight({ items_per_row: 2, group_by_parent : 'div' });
        $('.col2-4 > .col').equalizeHeight({ items_per_row: 2, group_by_parent : 'div' });
        $('.col3-2 > .col').equalizeHeight({ items_per_row: 3, group_by_parent : 'div' });
    });

    // ポップアップ
    $(function () {

		$('.popup')
		.leftClick(function(){
			this.clickFlag = false;
			var url = $(this).attr('href');
			url = url.replace(/\/miguide/, "/miguide/popup");
			window.open(url, 'popup', 'scrollbars=yes,menubar=no,toolbar=no,location=no,directories=no,resizable=yes,status=yes,width=522,height=600');
			return false;
		})
		.wheelClick(function(){
			this.clickFlag = true;
			return true;
		})
		.rightClick(function(){
			this.clickFlag = true;
			return true;
		})
		.click(function(){
			if (this.clickFlag) {
				this.clickFlag = false;
				return true;
			} else {
				return false;
			}
		});

    });

})(jQuery);

/**
 *	jQuery.fn.equalizeHeight
 */
(function ($) {
    $.fn.equalizeHeight = function (options) {
        var settings = {
            items_per_row : false,//要素を何個セットで高さ揃えをするか。falseのままだと全要素の高さが揃います。
            delay : 1000,//何ミリ秒置きに高さ揃えのjavascriptを実行するか（ブラウザの文字サイズ変更に対応するため、一定間隔で実行されます。）
            group_by_parent : false
        };
        if (options) {
            jQuery.extend(settings, options);
        };
        if ($("#js_etalon").length) {
            var etalon = $('#js_etalon').get(0);
        } else {
            var etalon = $('body').append('<span id="js_etalon_wrapper" style="height:0px;overflow:hidden;display:block;"><span id="js_etalon">&nbsp;</span></span>').find('#js_etalon').get(0);
        };

        //要素をグループ毎に配列に追加する関数を定義
        var _add = function (array, item) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == item) {
                    return;
                };
            };
            array.push(item);
        };

        var nodes = this;
        var groups = [];
        var hidden_groups = [];
        var images_to_load = [];
        //関数：要素をグルーピングする
        var _set_height = function () {
            for (var i = 0; i < groups.length; i++) {
                var max_height = 0;
                var vert_padding = groups[i][0].currentStyle ? parseInt(groups[i][0].currentStyle["paddingTop"]) + parseInt(groups[i][0].currentStyle["paddingBottom"]) : parseInt(document.defaultView.getComputedStyle(groups[i][0], null).getPropertyValue("padding-top")) + parseInt(document.defaultView.getComputedStyle(groups[i][0], null).getPropertyValue("padding-bottom"));
                for (var j = 0; j < groups[i].length; j++) {
                    groups[i][j].style.height = "auto";
                    max_height = Math.max(groups[i][j].offsetHeight - vert_padding, max_height);
                };
                for (var j = 0; j < groups[i].length; j++) {
                    groups[i][j].style.height = max_height + "px";
                };
            };
        };

        //関数：実行前の初期化
        var _init = function () {
            var cur_group = 0;
            var count = 0;
            var cur_parent = null;
            var prev_parent = null;
            groups[cur_group] = [];
            var group_inc = false;
            for (var i = 0; i < nodes.length; i++) {
                if (settings.group_by_parent) {
                    cur_parent = $(nodes[i]).parents(settings.group_by_parent)[0];
                    if (i > 0 && cur_parent != prev_parent && !group_inc) {
                        groups[++cur_group] = [];
                        count = 0;
                    };
                    prev_parent = cur_parent;
                };
                if (settings.items_per_row) {
                    nodes[i].className += " nb" + parseInt(count % settings.items_per_row + 1);
                    if (!(count % settings.items_per_row) && count > 0) {
                        groups[++cur_group] = [];
                        count = 0;
                        group_inc = true;
                    };
                };
                groups[cur_group][count++] = nodes[i];
                group_inc = false;
            };
            for (var i = 0; i < groups.length; i++) {
                if (!groups[i][0].offsetHeight) {
                    var cur_node = groups[i][0];
                    while (cur_node.style.display !== "none") {
                        cur_node = cur_node.parentNode;
                    };
                    hidden_groups.push(cur_node);
                };
                for (var j = 0; j < groups[i].length; j++) {
                    var imgs = groups[i][j].getElementsByTagName('img');
                    for (var k = 0; k < imgs.length; k++) {
                        _add(images_to_load, imgs[k].src);
                    };
                };
            };
        };

        //高さ揃え実行部分
        if (nodes.length) {
            _init();
            var base_size = etalon.offsetHeight;
            var interval = setInterval(function () {
                var current_size = etalon.offsetHeight;
                if (current_size !== base_size) {
                    base_size = current_size;
                    _set_height();
                };
                for (var i = 0; i < hidden_groups.length; i++) {
                    if (hidden_groups[i].style.display !== "none") {
                        _set_height();
                        hidden_groups = [];
                        for (var j = 0; j < groups.length; j++) {
                            if (!groups[j][0].offsetHeight) {
                                var cur_node = groups[j][0];
                                while (cur_node.style.display !== "none") {
                                    cur_node = cur_node.parentNode;
                                };
                                hidden_groups.push(cur_node);
                            };
                        };
                    };
                };
            }, settings.delay);
            _set_height();
            if (images_to_load.length) {
                var dummy_images = [];
                var loaded_images = 0;
                for (var i = 0; i < images_to_load.length; i++) {
                    dummy_images[i] = document.createElement('img');
                    dummy_images[i].onload = function () {
                        loaded_images++;
                        if (loaded_images === images_to_load.length) {
                            _set_height();
                        };
                    };
                    dummy_images[i].src = images_to_load[i];
                };
            };
        };
        return this;
    };
})(jQuery);



// A-PC-081
// カウンセリングサンプル JS
(function($){
$(function(){
	$('.ex-counseling-01').each(function(){
		var elem_ = $(this);
		var question_ = elem_.find('.ex-counseling-01-01');
		question_.find('.imp-next').click(function(){ // 次へボタンクリック
			var this_ = $(this);
			var elem_ = this_.parents('.ex-counseling-01');// レイヤー表示関数が div を複製するため親を取得しなおす必要がある（レイヤー表示側のデバグは危険）
			var question_ = elem_.find('.ex-counseling-01-01');// 上記同様再取得
			var contents_ = elem_.find('.section-lightbox-inner');
			var radio_ = question_.find(':radio:checked');
			var values_ = 0;
			radio_.each(function(){
				values_ += parseInt($(this).val(),10);
			})

			if (values_) {
				contents_.hide();
				contents_.filter('.ex-counseling-01-02').show();
				console.log(values_)
			} else {
				contents_.hide();
				contents_.filter('.ex-counseling-01-03').show();
				console.log(values_,"a")
			}
			return false;

		})

	});
});
})(jQuery);
