
import config from './../config/config';

const validator = {
    isNullOrEmpty : function (text) {
        if (typeof text !== 'string') {
            return true;
        }

        if (config.godMode) {
            return false;
        }

        let rgx = /^\s*$/;
        if (rgx.test(text)) {
            return true;
        }

        return false;
    },
    isStringValid : function (someString, minLength = 1) {
        
        if (typeof someString !== 'string') {
            return false;
        }

        if (config.godMode) {
            return true;
        }

        if (this.isNullOrEmpty(someString)) {
            return false;
        }

        let rgx = /^\s*$/;
        if (rgx.test(someString)) {
            return false;
        }

        return true;
    },
    isEmailValid : function (email) {
        if (typeof email !== 'string') {
            return false;
        }

        if (this.isNullOrEmpty(email)) {
            return false;
        }

        // dev/god mode ON :)
        if (config.godMode) {
            return true;
        }

        let rgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!rgx.test(email)) {
            return false;
        }

        return true;
    },
    isPasswordValid : function (password, minPassLength = 3, shouldContainDigit = false, shouldContainUpperCase = false) {
        
        if (typeof password !== 'string') {
            return false;
        }

        if (this.isNullOrEmpty(password)) {
            return false;
        }

        if (config.godMode) {
            return true;
        }

        if (password.length < minPassLength) {
            return false;
        }

        if (shouldContainDigit) {
           let digitRgx = /\d+/;

           if (!digitRgx.test(password)) {
               return false;
           }
        }

        if (shouldContainUpperCase) {
            let upperRgx = /[A-Z]+/;

            if (!upperRgx.test(password)) {
                return false;
            }
        }

        let rgx = /[a-zA-Z0-9\.-_]+/;
        
        if(!rgx.test(password)){
            return false;
        }

        return true;
    },
    isPasswordValidOnRegister : function (password, rePassword, minPassLength = 3, shouldContainDigit = false, shouldContainUpperCase = false) {
        
        if (typeof password !== 'string') {
            return false;
        }

        if (password !== rePassword) {
            return false;
        }

        if (config.godMode) {
            return true;
        }

        if (this.isNullOrEmpty(password)) {
            return false;
        }
        
        if (password.length < minPassLength) {
            return false;
        }
        
        if (shouldContainDigit) {
           let digitRgx = /\d+/;

           if (!digitRgx.test(password)) {
               return false;
           }
        }

        if (shouldContainUpperCase) {
            let upperRgx = /[A-Z]+/;

            if (!upperRgx.test(password)) {
                return false;
            }
        }

        return true;
    }
};

export default validator;