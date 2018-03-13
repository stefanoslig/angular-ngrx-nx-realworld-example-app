import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TokenInterceptorService } from './token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActionsService } from './actions.service';
import { LocalStorageJwtService } from './local-storage-jwt.service';

@NgModule({
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
export class CoreModule {
	constructor(
		@Optional()
		@SkipSelf()
		parentModule: CoreModule
	) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import it in the AppModule only');
		}
	}
}
