(function() {
	"use strict";
	
	angular	
		.module("app.space")
		.directive("room", room);

	function room() {

		function toggleClass(className, ele) {
			if(ele.hasClass(className)) {
				ele.removeClass(className);
			}
			else {
				ele.addClass(className)
			}
		}

		function link(scope, ele, attrs) {

			if(attrs.adminmode === "true") {
				scope.adminmode = true;
				scope.usermode = false;
			}
			else if(attrs.usermode === "true"){
				scope.usermode = true;
				scope.adminmode = false;
			}

			var currentEle = angular.element(ele[0].firstChild);

			if(attrs.adminmode === "true") {
				currentEle.addClass("avail");
				//toggleClass("avail", currentEle);
			}

			else if(attrs.usermode === "true" && attrs.avail === "true") {
				//toggleClass("avail", currentEle);
				currentEle.addClass("avail")
			}

			else {
				currentEle.addClass("un-avail");
				//toggleClass("un-avail", currentEle);
			}


			scope.$on("indicateStatus", function() {
				var currentEle = angular.element(ele[0].firstChild);
				if(attrs.avail === "true") {
					currentEle.removeClass("un-avail")
					currentEle.addClass("avail");
				}
				else if(attrs.avail === "false"){
					currentEle.removeClass("avail");
					currentEle.addClass("un-avail");
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