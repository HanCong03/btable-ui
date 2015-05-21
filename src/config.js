angular.module('app').config([
    '$translateProvider',

    function($translateProvider) {
        $translateProvider.translations('zh-CN', _zhCN);

        $translateProvider.preferredLanguage('zh-CN');
    }
]);