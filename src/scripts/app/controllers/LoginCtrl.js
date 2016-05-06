/**
 * Created by jenish on 06-05-2016.
 */

import mCtrls from './_mCtrls';

mCtrls.controller('LoginCtrl', ['$scope', '$state', 'UserService', function ($scope, $state, UserService) {
    $scope.username = '';
    $scope.password = '';
    $scope.errors = [];


    function disableLoginButton(message) {
        if (typeof message !== 'string') {
            message = 'Attempting login...';
        }
        $('#login-form-submit-button').prop('disabled', true).prop('value', message);
    }

    function enableLoginButton(message) {
        if (typeof message !== 'string') {
            message = 'Submit';
        }
        $('#login-form-submit-button').prop('disabled', false).prop('value', message);
    }

    function onSuccessfulLogin() {
        $state.go('main');
    }

    function onFailedLogin(error) {
        if (typeof error === 'string' && $scope.errors.indexOf(error) === -1) {
            $scope.errors.push(error);
        }
        enableLoginButton();
    }

    $scope.login = function () {
        disableLoginButton();
        UserService.authenticate($scope.username, $scope.password, onSuccessfulLogin, onFailedLogin);
    };
}]);

mCtrls.controller('LogoutCtrl', ['$state', 'UserService', function ($state, UserService) {
    UserService.removeAuthentication();
    $state.go('main');
}]);
