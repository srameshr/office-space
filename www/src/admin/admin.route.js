(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'menu.admin',
                config: {
                    url: '/admin',
                    views: {
                    	'tab-admin': {
                    		templateUrl: 'src/admin/templates/admin.html',
                            controller: 'AdminCtrl as vm',
                            resolve: {
                                meetingRoomsData: function(adminService) {
                                    return adminService.getMeetingRooms();
                                }
                            }
                    	}
                    }
                }
            }
        ];
    }
})();