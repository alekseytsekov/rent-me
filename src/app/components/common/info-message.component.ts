import { Component, OnInit } from '@angular/core';

import observer from './../../utils/observer';
import actions from './../../utils/actionName';

@Component({
    selector:'info-message',
    templateUrl : './info-message.component.html',
    styleUrls : ['./info-message.component.css']
})
export class InfoMessageComponent implements OnInit {
    
    private isSuccess : boolean;
    private isInfo : boolean;
    private isError : boolean;

    private message : string;

    constructor(){
        this.isSuccess = false;
        this.isInfo = false;
        this.isError = false;
        this.message = '';

        this.showError = this.showError.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.callHideWithTimeout = this.callHideWithTimeout.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    ngOnInit() {
        observer.addFunc(actions.SHOW_ERROR, this.showError);
        observer.addFunc(actions.SHOW_INFO, this.showInfo);
        observer.addFunc(actions.SHOW_SUCCESS, this.showSuccess);
    }

    showSuccess(message : string, withTimeout : boolean = false){
        this.message = message;
        this.isSuccess = true;

        if(withTimeout) {
            this.callHideWithTimeout();
        }
    }

    showInfo(message : string, withTimeout : boolean = false){

        console.log(message);
        console.log(withTimeout)

        this.message = message;
        this.isInfo = true;
        
        if(withTimeout) {
            this.callHideWithTimeout();
        }
    }

    showError(message : string, withTimeout : boolean = false){
        this.message = message;
        this.isError = true;

        if(withTimeout) {
            this.callHideWithTimeout();
        }
    }

    callHideWithTimeout() {
        setTimeout(this.hideMessage, 2000);
    }

    hideMessage(){
        this.message = '';
        this.isSuccess = false;
        this.isInfo = false;
        this.isError = false;
    }
}