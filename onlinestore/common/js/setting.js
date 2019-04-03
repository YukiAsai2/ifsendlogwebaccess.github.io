jQuery(document).ready(function ($) {
	$('html').imagesLoaded(function () {
		// Main slideshow
		$('.slider-for').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: '.slider-nav',
			centerMode: true,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 5000
		});
		$('.slider-nav').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: '.slider-for',
			focusOnSelect: true
		});
		$('.slider-nav .slick-slide').removeClass('slick-active'); // remove active class from all thumbnail slides
		$('.slider-nav .slick-slide').eq(0).addClass('slick-active'); // set active class to first thumbnail slides
		$('.slider-for').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			var mySlideNumber = nextSlide;
			$('.slider-nav .slick-slide').removeClass('slick-active');
			$('.slider-nav .slick-slide').eq(mySlideNumber).addClass('slick-active');
		});
	});
});

jQuery(document).ready(function ($) {
	$('html').imagesLoaded(function () {
		// Main slideshow
		$('.cat-slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: '.cat-slider-nav',
			autoplay: true,
			autoplaySpeed: 5000
		});
		$('.cat-slider-nav').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: '.cat-slider-for',
			focusOnSelect: true
		});
		$('.cat-slider-nav .slick-slide').removeClass('slick-active'); // remove active class from all thumbnail slides
		$('.cat-slider-nav .slick-slide').eq(0).addClass('slick-active'); // set active class to first thumbnail slides
		$('.cat-slider-for').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			var mySlideNumber = nextSlide;
			$('.cat-slider-nav .slick-slide').removeClass('slick-active');
			$('.cat-slider-nav .slick-slide').eq(mySlideNumber).addClass('slick-active');
		});
	});
});

jQuery(document).ready(function ($) {
	$('html').imagesLoaded(function () {
		// Main slideshow
		var intervalID = setInterval(function(){
		$('.item-slider').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			autoplay: true,
			autoplaySpeed: 5000
		});
			if(jQuery('.item-slider').size()>1){
				clearInterval(intervalID);
			}
		},500);
	});
});


// Active slick slideshow
jQuery(function ($) {
	$('.item-list.slideshow-enable').slick({
		dots: true
	});
	$('.page-sp .slideshow .slider-mobile').slick({
		dots: true
	});
});

// Smooth scroll top
jQuery(function ($) {
	jQuery('a.scroll[href^=#]').click(function () {
		var headerHight = 0;
		var win = $(window).width();
		if (win < 980) {
			headerHight = 60;
		}
		var speed = 400;
		var href = jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - headerHight;
		jQuery('body,html').animate({scrollTop: position}, speed, 'swing');
		return false;
	});
});

jQuery(function ($) {
	// User dropdown menu
	$('.tools-header .top-row .user-menu').click(function () {
		$(this).toggleClass('activated');
	});
	$('html').on('click', function (e) {
		if (!$(e.target).is('.user-menu-dropdown') && $(e.target).closest('.user-menu').length == 0) {
			$('.tools-header .top-row .user-menu').removeClass('activated');
		}
	});
	// Chat information menu
	$('.tools-header .top-row .messages-menu').click(function () {
		$('#chat-dropdown-menu').addClass('activated');
		$('#chat-dropdown-menu .close-button').click(function () {
			$('#chat-dropdown-menu').removeClass('activated');
		});
	});
	// Link categories dropdown menu
	$('.page-sp .items-category .link-group .link-group-label').click(function (e) {
		e.preventDefault();
		$(this).toggleClass('activated');
	});
	// Modal
	$('.modal-sp .modal-content-sp .close-button').click(function () {
		$('.modal-sp').removeClass('displayed');
		$('#modal-information').removeClass('displayed');
		$('#modal-main-menu').removeClass('displayed');
	});
	$('#main-header-sp .messages-menu').click(function (e) {
		e.preventDefault();
		$('.modal-sp').addClass('displayed');
		$('#modal-information').addClass('displayed');
	});
	$('#main-header-sp .menu-button').click(function () {
		$('.modal-sp').addClass('displayed');
		$('#modal-main-menu').addClass('displayed');
	});
});