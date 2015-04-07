$(document).ready(function() {

    $(".glyphs").owlCarousel({
	    navigation : true, // Show next and prev buttons
	    slideSpeed : 300,
	    paginationSpeed : 400,
	    singleItem:true,

	    // "singleItem:true" is a shortcut for:
	    items : 1,
	    loop: true,
		nav: true,
	    // itemsDesktop : false,
	    // itemsDesktopSmall : false,
	    // itemsTablet: false,
	    // itemsMobile : false
    });


    // Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	// Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});


	// Menu active on menu test
	var selector = '.menu-test li a';

	$(selector).on('click', function(){
	    $(selector).removeClass('active');
	    $(this).addClass('active');
	    return false;
	});

	// Change class on textarea for test font weights
	$('.menu-test .fw-300 a').on('click', function(){
	    $('#text_control').removeClass().addClass('fw-300');
	});
	$('.menu-test .fw-400 a').on('click', function(){
	    $('#text_control').removeClass().addClass('fw-400');
	});
	$('.menu-test .fw-500 a').on('click', function(){
	    $('#text_control').removeClass().addClass('fw-500');
	});
	$('.menu-test .fw-600 a').on('click', function(){
	    $('#text_control').removeClass().addClass('fw-600');
	});
	$('.menu-test .fw-700 a').on('click', function(){
	    $('#text_control').removeClass().addClass('fw-700');
	});

	// Change text size
	  $("#fader_font_size").on("input",function () {
            $('#text_control').css("font-size", $(this).val() + "px");
    });


	// Fix header on scroll to the top
	var stickyHeaderTop = $('.site-nav').offset().top;

	var stickyHeader = function(){
		var scrollTop = $(window).scrollTop();
		if (scrollTop > stickyHeaderTop) {
	    	$('body').addClass('sticky');
		} else {
	    	$('body').removeClass('sticky');
		}
	};

	stickyHeader();

	$(window).scroll(function() {
	    stickyHeader();
	});

	// Scroll to sections
	/*
	function scrollMenu(){
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	        if (target.length) {
	            $('html,body').animate({
	                scrollTop: target.offset().top - 56
	            }, 800);
	            return false;
	            }
	        }
	    });
	}
	scrollMenu();
	*/

	// Cache selectors
	var lastId,
	topMenu = $(".site-nav"),
	topMenuHeight = topMenu.outerHeight() - 20,
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	var href = $(this).attr("href"),
	offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight + 5;
	$('html, body').stop().animate({
		scrollTop: offsetTop
		}, 800);
			e.preventDefault();
	});
	// Bind to scroll
	$(window).scroll(function(){
		// Get container scroll position
		var fromTop = $(this).scrollTop()+topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
			return this;
		});
		// Get the id of the current element
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
			.parent().removeClass("active")
			.end().filter("[href=#"+id+"]").parent().addClass("active");
		}
	});

});