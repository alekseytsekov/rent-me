import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PropertyService } from './property.service';
import { AuthManager } from './../../utils/auth.manager';

import { Property } from './../../models/property/property.model';
import { PropertyDto } from './../../models/property/propertyDto.model';
import { PropertyType } from './../../models/property/property-type.model';

import validator from './../../utils/validator';

class ImageDto {
    
    constructor(public id : string, public url : string) {
        
    }
}

@Component({
    selector: '',
    templateUrl : './property-form.component.html',
    styleUrls : [
        './property-form.component.css'
    ],
    providers : [ 
        //UserDto,
        //AuthService,
        AuthManager,
        PropertyDto,
        PropertyService
     ]
})
export class PropertyFrom implements OnInit{

    private hasError : boolean;
    private errorMessage : string;

    private chosenRooms;
    private roomTypes;
    private propertyTypes ;//: PropertyType[]
    private images;

    private maxImages : number;
    private imageMap : Map<string, ImageDto>;
    //private selectRoom : string;
    

    constructor(
        private router : Router, 
        private authManager : AuthManager, 
        private propertyDto : PropertyDto,
        private propertyService : PropertyService
    ){

        this.hasError = false;
        this.errorMessage = '';
        this.chosenRooms = [];
        this.roomTypes = [];
        this.propertyTypes = [];
        this.images = [];
        this.maxImages = 5;
        this.imageMap = new Map();

        this.processAddProperty = this.processAddProperty.bind(this);
    }

    ngOnInit(): void {
        if(!this.authManager.isAuthenticated()){
            this.router.navigate(['/']);
        }

        this.getPropTypes();
        this.getRoomTypes();

        this.images.push(this.getImageDto());
    }

    async getRoomTypes() {
        this.roomTypes = await this.propertyService.getRoomTypes();
    }

    async getPropTypes() {
        this.propertyTypes = await this.propertyService.getPropertyTypes();
    }

    addImage(){
        if(this.images.length < this.maxImages){
            this.images.push(this.getImageDto())
        }

        //console.log(this.imageMap)
    }

    setImageUrl(e) : void {
        
        if(this.imageMap.has(e.target.id)){
            this.imageMap.get(e.target.id).url = e.target.value;
        }
    }

    getImageDto() : ImageDto {

        let img = new ImageDto('img' + this.images.length, '');
        this.imageMap.set(img.id, img);
        return img;
    }

    addRoom(){
        //console.log();

        let chosenRoom = {};

        for(let i = 0; i <= this.roomTypes.length; i++){
            if(this.propertyDto.selectRoom === this.roomTypes[i]._id){
                chosenRoom = this.roomTypes[i];
                break;
            }
        }

        this.chosenRooms.push(chosenRoom);
        //console.log(this.chosenRooms);
    }

    removeRoom(e) {
        let removedRoomId = e.target.getAttribute('roomid');

        let newRooms = [];

        let hasMatch = false;

        for(let i = 0; i < this.chosenRooms.length; i++){
            if(hasMatch || this.chosenRooms[i]._id !== removedRoomId ){
                newRooms.push(this.chosenRooms[i]);
            } 
            
            if(!hasMatch && this.chosenRooms[i]._id === removedRoomId) {
                hasMatch = true;
            }
        }

        this.chosenRooms = newRooms;
    }

    submit() : void {
        console.log('submit');
        console.log(this.propertyDto);
        console.log(this.images);
        console.log(this.chosenRooms);

        if(!this.validateForm(this.propertyDto, this.images, this.chosenRooms)){
            return;
        };

        let roomIds = [];

        for(let room of this.chosenRooms){
            roomIds.push(room._id);
        }

        let newProperty = new Property(
            this.authManager.getAuth().id,
            [],
            roomIds,
            [],
            [],
            [],
            this.propertyDto.price,
            this.propertyDto.description,
            this.propertyDto.name,
            this.propertyDto.propertyTypeId,
            this.propertyDto.country,
            this.propertyDto.city,
            this.propertyDto.address
        );

        this.propertyService.addProperty(newProperty, this.processAddProperty);
        
    }

    processAddProperty(res, err){
        if(err){
            console.log(err);
            this.router.navigate(['/badrequest']);
            return;
        }

        this.router.navigate(['/property/my']);
    }

    validateForm(baseForm, images, rooms){
        if(!validator.isStringValid(baseForm.propertyTypeId, 4)){
            this.setError('Property type is invalid!');
            return false;
        }

        if(!validator.isStringValid(baseForm.description, 4)){
            this.setError('Description should be at least 4 character long!');
            return false;
        }

        if(isNaN(baseForm.price) || (!isNaN(baseForm.price) && Number(baseForm.price) < 0)){
            this.setError('Price should be positive number!');
            return false;
        }

        if(!validator.isStringValid(baseForm.phone, 5)){
            this.setError('Phone should be at least 5 character long!');
            return false;
        }

        if(!validator.isStringValid(baseForm.country, 1)){
            this.setError('Country name should be at least 1 character long!');
            return false;
        }

        if(!validator.isStringValid(baseForm.city, 1)){
            this.setError('City should be at least 1 character long!');
            return false;
        }

        if(!validator.isStringValid(baseForm.address, 3)){
            this.setError('Address should be at least 3 character long!');
            return false;
        }

        if(rooms.length < 1){
            this.setError('Property should contain some rooms!');
            return false;
        }

        return true;
    }

    setError(text){
        this.hasError = true;
        this.errorMessage = text;
    }

    hideError() : void{
        this.hasError = false;
        this.errorMessage = '';
    }
}