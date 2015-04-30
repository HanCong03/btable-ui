angular.module('app').config(function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'l10n/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('zh-CN');
});