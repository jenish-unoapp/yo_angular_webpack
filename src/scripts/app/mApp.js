import angular from 'angular';
import ngTouch from 'angular-touch';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import mAnimations from './animations/_loader';
import mCtrls from './controllers/_loader';
import mDirectives from './directives/_loader';
import mServices from './services/_loader';


/**
 * Register main angular app
 */
var mApp = angular.module('mApp', [ngTouch, ngSanitize, uiRouter, mAnimations, mCtrls, mDirectives, mServices])
    .constant('appConfig', {
        'url': "http://localhost:9000",
        'port': "80"
    })
    .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
        'ngInject';

        $stateProvider
            .state('login', {
                templateUrl: 'tpls/views/login.html',
                controller: 'LoginCtrl'
            })
            .state('logout', {
                controller: 'LogoutCtrl'
            })
            .state('main', {
                url: '/xyz',
                templateUrl: 'tpls/views/main.html',
                controller: 'MainCtrl'
            })
            .state('home', {
                url: '/',
                templateUrl: 'tpls/views/home.html',
                controller: 'MyCtrl'
            })
            .state('page1', {
                url: '/page1',
                templateUrl: 'tpls/views/page1.html',
                controller: 'MyCtrl'
            })
            .state('page1.detail', {
                url: '/detail',
                templateUrl: 'tpls/views/detail.html',
                controller: 'DetailCtrl'
            });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    });

export default mApp;
