import { ApiService } from '@angular-ngrx-nx/api/src/api.service';
import { ArticleListConfig, Article } from '@angular-ngrx-nx/home/src/+state/home.interfaces';
import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HomeService {
	constructor(private apiService: ApiService) { }

	query(config: ArticleListConfig): Observable<any> {
		const params = new URLSearchParams();

		Object.keys(config.filters)
			.forEach((key) => {
				params.set(key, config.filters[key]);
			});

		return this.apiService.get(
			'/articles' + ((config.type === 'FEED') ? '/feed' : ''),
			params
		);
	}
}
