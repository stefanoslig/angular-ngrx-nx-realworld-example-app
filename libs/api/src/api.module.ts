import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@angular-ngrx-nx/core';

@NgModule({
	imports: [CommonModule, HttpClientModule, CoreModule],
	providers: [ApiService],
	exports: [CoreModule]
})
export class ApiModule { }
