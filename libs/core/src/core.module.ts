import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenInterceptorService } from './token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
	imports: [CommonModule],
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptorService,
		multi: true
	}]
})
export class CoreModule { }
