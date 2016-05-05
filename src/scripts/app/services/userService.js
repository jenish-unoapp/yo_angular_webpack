/**
 * Created by jenish on 04-05-2016.
 */

import mServices from './_mServices';

mServices.service('UserService', function User() {
    var userData = {
        isAuthenticated: false,
        username: '',
        bearerToken: '',
        expirationDate: null
    };

    this.getUserData = function(){
        return userData;
    }
});
