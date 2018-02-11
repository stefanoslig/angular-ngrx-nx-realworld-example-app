import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenInterceptorService } from './token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionsService } from './actions.service';
import { LocalStorageJwtService } from './local-storage-jwt.service';

@NgModule({
	imports: [CommonModule],
	providers: [
		TokenInterceptorService,
		LocalStorageJwtService,
		ActionsService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		}
	]
})
export class CoreModule { }
