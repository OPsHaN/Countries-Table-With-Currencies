
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CurrencyOption } from '../models/country.model';

const CurrencyApi = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private http = inject(HttpClient);

  fetchAll(): Observable<CurrencyOption[]> {
    return this.http.get<Record<string, string>>(CurrencyApi).pipe(
      map(rec => Object.entries(rec)
        .map(([code, name]) => ({ code, name }))
        .sort((a, b) => a.code.localeCompare(b.code))
      ),
      catchError(err => {
        console.error('Currency API error', err);
        return of([]);
      })
    );
  }
}
