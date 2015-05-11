angular.module('app').config(function($translateProvider) {
    $translateProvider.translations('zh-CN', _zhCN);

    $translateProvider.preferredLanguage('zh-CN');
});