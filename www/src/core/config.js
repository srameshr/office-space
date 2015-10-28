(function() {
    'use strict';

    angular
        .module('app.core')
        .config(configure);

    /* @ngInject */
    function configure ($compileProvider, $logProvider, $ionicConfigProvider, toastrConfig) {

        $compileProvider.debugInfoEnabled(false); 

        //Toastr config
        angular.extend(toastrConfig, {
            autoDismiss: true,
            maxOpened: 2,    
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            preventOpenDuplicates: false,
        });
        
        $ionicConfigProvider.views.transition("none");
        $ionicConfigProvider.views.maxCache(0);
        
        // turn debugging off/on (no info or warn) but you still get error messages
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }
})();