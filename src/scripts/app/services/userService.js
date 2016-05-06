/**
 * Created by jenish on 04-05-2016.
 */

import mServices from './_mServices';

mServices.service('UserService', ['$http', 'appConfig', function ($http, appConfig) {
    var userData = {
        isAuthenticated: false,
        username: '',
        authToken: '',
        expirationDate: null
    };

    var setHttpAuthHeader = function () {
        $http.defaults.headers.common.Authorization = userData.authToken;
    };

    var clearUserData = function () {
        userData.isAuthenticated = false;
        userData.username = '';
        userData.authToken = '';
        userData.expirationDate = null;
    };

    this.removeAuthentication = function() {
        clearUserData();
        $http.defaults.headers.common.Authorization = null;
    };

    this.getUserData = function () {
        return userData;
    };

    this.authenticate = function (username, password, successCallback, errorCallback) {
        var config = {
            method: 'POST',
            url: appConfig.url + '/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'username=' + username + '&password=' + password
        };

        $http(config)
            .success(function (data) {
                userData.isAuthenticated = true;
                userData.username = data.userName;
                userData.authToken = data.access_token;
                userData.expirationDate = new Date(data['.expires']);
                setHttpAuthHeader();
                if (typeof successCallback === 'function') {
                    successCallback();
                }
            })
            .error(function (data) {
                if (typeof errorCallback === 'function') {
                    if (data.error_description) {
                        errorCallback(data.error_description);
                    } else {
                        errorCallback('Unable to contact server; please, try again later.');
                    }
                }
            });
    };


}]);
