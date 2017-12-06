import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules

// services
import { RequesterService } from './services/requester.service';

// components
import { AppComponent } from './app.component';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	providers: [
		RequesterService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
