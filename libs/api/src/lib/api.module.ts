import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService],
})
export class ApiModule {}
