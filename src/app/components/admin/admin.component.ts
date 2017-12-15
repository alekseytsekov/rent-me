import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from './../../core/common.service';
import { AuthManager } from './../../utils/auth.manager';

import observer from './../../utils/observer';
import actions from './../../utils/actionName';
import config from './../../config/config';

import { User } from './../../models/auth/user.model';

@Component({
    selector:'',
    templateUrl : './admin.component.html',
    styleUrls : ['./admin.component.css'],
    providers : [
        CommonService,
        AuthManager
    ]
})
export class AdminComponent implements OnInit {

    private users : {}[]

    constructor(
        private commonService : CommonService,
        private authManager : AuthManager,
        private router : Router
    ){
        this.users = [];
        this.getUserIdsCallback = this.getUserIdsCallback.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.accessDenied = this.accessDenied.bind(this);
        this.adminStatusCallback = this.adminStatusCallback.bind(this);
    }

    ngOnInit() {

        observer.addFunc(actions.ADMIN_ACCESS_DENIED, this.accessDenied);

        this.hasPermission();
    }

    accessDenied(hasAccess){
        
        if(!hasAccess){
            
            observer.executeFunc(actions.SHOW_ERROR, 'Access denied!');
            this.router.navigate(['/logout']);
            return;
        } else {
            observer.addFunc(actions.ADMIN_GET_USERS, this.getUsers);
            this.commonService.getUserIds(this.getUserIdsCallback);
        }
    }

    async hasPermission(){
        
        let user = await this.commonService.getUserById(this.authManager.getAuth().id);

        const isAdmin = user['isAdmin'];

        observer.executeFunc(actions.ADMIN_ACCESS_DENIED, isAdmin);
    }

    getUserIdsCallback(userIdModel, err) {
        if(err) {
            observer.executeFunc(actions.SHOW_ERROR, err.message);
            console.log(err);
            return;
        }
        
        observer.executeFunc(actions.ADMIN_GET_USERS, userIdModel);
    }

    async getUsers(userIdModel) {

        for(let i = 0; i < userIdModel.length; i++){
            let user = await this.commonService.getUserById(userIdModel[i].userId);
            
            console.log(user['roleIds']);

            if(user['roleIds'].indexOf(config.adminRole) >= 0){
                user['isAdmin'] = true;
            } else {
                user['isAdmin'] = false;
            }
            this.users.push(user);
        }

    }

    setCommentStatus() {

    }

    setBannedStatus() {

    }

    setAdminStatus(bool, id){

        let currentUser = this.getCurrentUser(id) as User;

        if(currentUser){
            if(bool){

                currentUser.roleIds.push(config.adminRole);

                delete currentUser['isAdmin'];
                
                this.commonService.updateUser(currentUser, this.adminStatusCallback);
            } else {
                let temp = [];

                for(let i = 0; i < currentUser.roleIds.length; i++){
                    if(currentUser.roleIds[i] !== config.adminRole){
                        temp.push(currentUser.roleIds[i])
                    }
                }
                
                currentUser['roleIds'] = temp;

                delete currentUser['isAdmin'];
                this.commonService.updateUser(currentUser, this.adminStatusCallback);
            }
        }
    }

    getCurrentUser(userId){
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]['_id'] === userId){
                return this.users[i];
            }
        }

        return false;
    }

    adminStatusCallback(res, err) {
        if(err){
            observer.executeFunc(actions.SHOW_ERROR, "Cannot update user admin status!");
            console.log(err);
            return;
        }

        let currentUser = this.getCurrentUser(res['_id']) as User;

        if(currentUser){

            //console.log(currentUser.roleIds.indexOf(config.adminRole));

            let isAdmin = currentUser.roleIds.indexOf(config.adminRole) >= 0;

            currentUser['isAdmin'] = isAdmin;
        }

        //console.log(res);
    }
}