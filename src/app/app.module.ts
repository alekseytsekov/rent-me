import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
//import { FormsModule } from '@angular/forms';

// modules
import { AppRoutesModule } from './core/app.routes.module';
import { AppCommonModule } from './core/app.common.module';
import { AuthModule } from './components/auth/auth.module';

// services
import { RequesterService } from './core/requester.service';
import { AuthManager } from './utils/auth.manager';
import { AuthGuard } from './core/auth.guard.service';


// components
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		NgbModule.forRoot(),
		BrowserModule,
		HttpClientModule,
		//FormsModule,
		AppRoutesModule,
		AppCommonModule,
		AuthModule
	],
	providers: [
		RequesterService,
		AuthManager,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
