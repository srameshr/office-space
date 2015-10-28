(function() {
	"use strict";
	angular
		.module("app", 
			[
				'ionic',
				'ngCordova',
				'ngDraggable',
				'angularMoment',
				'toastr',
				'logger',
				'router',
				'exceptions',
				'app.core',
				'app.menu',
				'app.space',
				'app.admin'
				
			]
		)
		.run(run);

	function run($ionicPlatform) {
		Parse.initialize("ZWj2HKufUqSezYuBBibYjENFSiWd00kRRnxc6zJN", "udXw8Xd2hZXpe4eveyofZKPXmPrvcvBcfNKk1yWe");
	}
})();