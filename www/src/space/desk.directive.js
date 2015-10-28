(function() {
	"use strict";
	
	angular	
		.module("app.space")
		.directive("room", room);

	function desk() {

		function toggleClass(className, ele) {
			if(ele.hasClass(className)) {
				ele.removeClass(className);
			}
			else {
				ele.addClass(className)
			}
		}

		function link(scope, ele, attrs) {

			scope.$on("deskAvailability", function() {
				var currentEle = angular.element(ele[0].firstChild);
				if(attrs.avail === 'true') {
					toggleClass("avail", currentEle);					
				}
				else {
					toggleClass("un-avail", currentEle);
					
				}
			})
		}

		return {
			restrict: 'E',
			templateUrl: 'src/space/templates/room.html',
			link: link
		}
		
	}
})();