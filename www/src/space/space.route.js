(function() {
    'use strict';

    angular
        .module('app.space')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'menu.space',
                config: {
                    url: '/space',
                    views: {
                    	'tab-users': {
                    		templateUrl: 'src/space/templates/space.html',
                    		controller: "SpaceCtrl as vm",
                    		resolve: {
                    			roomsAvailData: function(spaceService) {
                    				return spaceService.getMeetingRooms();
                    			} 
                    		}
                    	}
                    }
                }
            }
        ];
    }
})();