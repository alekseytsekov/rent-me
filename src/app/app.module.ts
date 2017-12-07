import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// modules
import { AppRoutesModule } from './core/app.routes.module';
import { AppCommonModule } from './core/app.common.module';
import { AuthModule } from './components/auth/auth.module';

// services
import { RequesterService } from './core/requester.service';

// components
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutesModule,
		AppCommonModule,
		AuthModule
	],
	providers: [
		RequesterService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
