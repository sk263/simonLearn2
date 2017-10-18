$(document).ready(function(){

	var triggers = $('[data-mobile-menu-trigger]');
	var content = $('[data-mobile-menu-item]');
	
	triggers.on('click', function(){

		console.log('testing')

		var self = $(this);
		var triggerValue = self.data('mobile-menu-trigger');
		var target = $('[data-mobile-menu-item="' + triggerValue + '"]');
		
		// var screenWidth = $(window).width();

		if (target.hasClass('active-mobile') || self.hasClass('active-mobile')) {
			target.removeClass('active-mobile');
			self.removeClass('active-mobile');
		} else {
			triggers.removeClass('active-mobile');
			content.removeClass('active-mobile');
			target.addClass('active-mobile');
			self.addClass('active-mobile');
			// $('.active-mobile').width(screenWidth);
		}

	});

});

