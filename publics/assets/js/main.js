
(function ($) {
 "use strict";

/*
  ACTIVE MENU OF PAGE
================================== */
	var pgurl = window.location.href.substr(window.location.href
	.lastIndexOf("/")+1);
	var aActive = $('ul li a');
	aActive.each(function(){
		if($(this).attr("href") === pgurl || $(this).attr("href") === '' )
		$(this).addClass("active");
	})
	
/*
  Mobile Dropdown Submenu
================================== */
	var DsaHit = $('.dropdown-submenu a.hit');
	DsaHit.on("click", function(e){
		$(this).next('ul').toggle();
		e.stopPropagation();
		e.preventDefault();
		return false;
	});
  
/*
  Courses Searching
================================== */
	var sToggle = $('.search-toggle');
	var closeA = $('.close-search');
	var closeB = $('.courses-searching button');
	var cLoseSearch = closeA.add(closeB);
	sToggle.on('click', function(){
		$('body').toggleClass('search-active');
        return false;
	});
	cLoseSearch.on('click', function(){
		$('body').removeClass('search-active');
        return false;
	});
	
/*
  STICKY
================================== */
	var WinD = $(window);
	var NSpace = 48;
	var MSpace = 113;
	WinD.on('scroll',function() { 
		var AcSticky = $('#active-sticky');   
		var scroll = WinD.scrollTop();
		var AESticky = AcSticky;
		if (scroll < NSpace) {
			AESticky.removeClass("is-sticky");
		}
		else{
			AESticky.addClass("is-sticky");
		}
        return false; 
	});
	// Mobile Responsive Query
	if (WinD.width() <= 767){
		WinD.on('scroll',function() {
			var AcSticky = $('#active-sticky');   
			var scroll = WinD.scrollTop();
			var AESticky = AcSticky;
			if (scroll < MSpace) {
				AESticky.removeClass("is-sticky");
			}
			else{
				AESticky.addClass("is-sticky");
			}
			return false; 
		});
	}
	
/*
  PROGRESS WITH WAYPOINT ACTIVE
================================== */
	var ProWey = $('.skill-progress');
    if (ProWey.length > 0) {
        ProWey.waypoint(function () {
			// element 
			jQuery('.skill-bar').each(function() {
				jQuery(this).find('.progress-content').animate({
					width:jQuery(this).attr('data-percentage')
				},2000);
				
				jQuery(this).find('.progress-mark').animate(
				{left:jQuery(this).attr('data-percentage')},
				{
					duration: 2150,
					step: function(now, fx) {
						var data = Math.round(now);
						jQuery(this).find('.percent').html(data + '%');
					}
				});  
			
			});
		}, {offset: '90%'});
	}

/*
 SWIPER SLIDER ACTIVE
================================ */
    var swiper = new Swiper('#mainslider', {
      spaceBetween: 30,
      effect: 'fade',
	  speed: 1000,
	  loop: true,
	  autoplay: {
		delay: 5000,
	  },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
		
    });
	
/*
 SLICK SLIDER ACTIVE
================================ */
	var mAinSlide= $('#mainslider-2');
	mAinSlide.slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: false,
		speed: 500,
		prevArrow: '<i class="prev zmdi zmdi-chevron-left"></i>',
		nextArrow: '<i class="next zmdi zmdi-chevron-right"></i>'
	});
	
	var oNeItem= $('#oneitem');
	oNeItem.slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		dots: false,
		speed: 500,
	});
	var oNeItemdot= $('#oneitem-dot');
	oNeItemdot.slick({
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		dots: true,
		speed: 500,
	});
	
/*
SLICK CAROUSEL AS NAV
===================================*/
	var InterFS = $('#testimonial');
	InterFS.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
        dots: false,
        centerPadding: '545px',
        arrows: false,
        responsive: [
			{
			  breakpoint: 1500,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '250px',
			  }
			},
			{
			  breakpoint: 1280,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '180px',
			  }
			},
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '130px',
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '80px',
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '40px',
			  }
			}
		]
    });
/*
 CounterUp ACTIVE
================================ */
	$('.counter').counterUp({
		delay: 50,
		time: 3000
	});
	
/*
 ISOTOPE ACTIVE
================================ */
	var gAllMli = $('.gallery-menu li');
	gAllMli.on('click', function() {
		var gAllGrid = $('.gallery-grid');
		gAllMli.removeClass("active");
		$(this).addClass("active");
		var selector = $(this).attr('data-filter');
		gAllGrid.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'swing',
				queue: false
			}
		});
	});
/*
 VENOBOX ACTIVE
================================ */
	var VenBOx = $('.venobox');
	VenBOx.venobox();
	var VenBOxv = $('.venoboxvid');
	VenBOxv.venobox();
	
/*
 MAIL CHIMP AJAX ACTIVE
================================ */
	// Mailchimp
	var mCForm = $('#mc-form');
	mCForm.ajaxChimp({
		callback: mailchimpCallback,
		//Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
		url: "http://regaltheme.us16.list-manage.com/subscribe/post?u=9779a0e5298ed51ec0ff0a92b&amp;id=5466926a9f"
	});
	function mailchimpCallback(resp) {
		if (resp.result === 'success') {
			alert(resp.msg);

		} else if(resp.result === 'error') {
			alert(resp.msg);
		}
		return false;
	}
	
/*
	CONTACT FORM VALIDATIONS SETTINGS
========================================*/
	var CTForm = $('#contact_form');
    CTForm.validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function(error, element) {
            error.insertBefore(element);
        },
        messages: {
            name: "What's your name?",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        },
					
        highlight: function(element) {
            $(element)
            .text('').addClass('error')
        },                    
					
        success: function(element) {
            element
            .text('').addClass('valid')
        }
    });   

/*
	CONTACT FORM SCRIPT
========================================*/
 	var CTSubmit = $('#contact_submit');
    CTForm.submit(function() {
        // submit the form
        if($(this).valid()){
           CTSubmit.button('loading'); 
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactnumber: $('#contact_number').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function() {
                   CTSubmit.button('reset');
                   CTSubmit.button('complete');
                },
                error: function() {
					CTSubmit.button('reset');
					CTSubmit.button('error');
                }
            });
        // return false to prevent normal browser submit and page navigation 
        } else {
            CTSubmit.button('reset')
        }
        return false; 
    });

/*
SCROLLUP
================================== */
	$.scrollUp({
		scrollText: '<i class="zmdi zmdi-chevron-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});
/*
Window Load Function
================================== */
	WinD.on('load', function(){
		
		// isotope fitRows grid
		var IsoFit = $('.fitRows-grid');
		IsoFit.isotope({
			itemSelector: '.grid-item',
			// layout mode options
			layoutMode: 'fitRows'
		});
		// isotope masonry grid
		var IsoGriddoload = $('.masonry-grid');
		IsoGriddoload.isotope({
			itemSelector: '.grid-item',
			// layout mode options
			masonryHorizontal: {
				rowHeight: 100
		}
		});
	});
	
})(jQuery);