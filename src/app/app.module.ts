import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpAddEditComponent } from './component/emp-add-edit/emp-add-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import { FormAuthComponent } from './auth/form-auth/form-auth.component';
import { MaterialModule } from './module/material.module';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment.prod';
import { DecodedState } from './services/storeNgxs/states/user.state';
import { TokenState } from './services/storeNgxs/states/token.state';
import { GuardService } from './services/guard.service';
import { LOCAL_STORAGE_ENGINE, NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { DialogWindowAddManagerComponent } from '../app/component/dialog-window-add-manager/dialog-window-add-manager.component';
import { InterceptorService } from './services/interceptor.service';
import { EmpState } from './services/storeNgxs/states/empState.state';

import { EmployeeComponent } from './component/employee/employee.component';
import { DashboardsComponent } from './component/dashboards/dashboards.component';
import { SettingsComponent } from './component/settings/settings.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { BreadCrumbComponent } from './component/bread-crumb/bread-crumb.component';
import { LayoutComponent } from './component/layout/layout.component';
import {SideNavModule} from '../app/component/sidenav/sidenav.module';

import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './component/bookmark/bookmark.component';
import { ManagersComponent } from './component/managers/managers.component';

const routes: Routes = [
	{path: 'home', component: DashboardsComponent},
	{path: 'bookmark', component: BookmarkComponent},
	{path: 'settings', component: SettingsComponent},
	{path: 'settings', component: SettingsComponent},
	{path: 'employee', component: EmployeeComponent},
	{path: 'manager', component: ManagersComponent},

]

@NgModule({
	declarations: [
		AppComponent,
		EmpAddEditComponent,
		AuthComponent,
		FormAuthComponent,
		
		EmployeeComponent,
		DashboardsComponent,
		SettingsComponent,
		DialogWindowAddManagerComponent,
		ToolbarComponent,
		BreadCrumbComponent,
		LayoutComponent,
  BookmarkComponent,
  ManagersComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule, 
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		MaterialModule,
		MatToolbarModule,
		NgxsModule.forRoot([DecodedState, TokenState, EmpState], {
			developmentMode: !environment.production
		}),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsStoragePluginModule.forRoot({
			key: "myToken",	
		}),
		SideNavModule,
  		RouterModule.forRoot(routes)
		
	],
	exports: [FormsModule, ReactiveFormsModule],
	providers: [
		GuardService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true 
		}
	],
	bootstrap: [AppComponent], 
})
export class AppModule { 

	

}
