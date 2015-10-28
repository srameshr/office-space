(function() {
    'use strict';

    angular
        .module('app.menu')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/app');
    }

    function getStates() {
        return [
            {
                state: 'menu',
                config: {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'src/menu/templates/menu.html'
                }
            }
        ];
    }
})();