import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ApiService } from './api.service';

@NgModule({
	imports: [CommonModule, HttpModule],
	providers: [ApiService]
})
export class ApiModule { }
