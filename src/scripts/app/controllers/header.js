/**
 * Created by jenish on 04-05-2016.
 */

import mCtrls from './_mCtrls';

mCtrls.controller('HeaderCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.user = UserService.getUserData();
}]);
