
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiCountry, UiCountry } from '../models/country.model';

const Fields = 'name,independent,status,currencies,capital,region,subregion,languages,continents';
const ApiUrl = `https://restcountries.com/v3.1/all?fields=${Fields}`;

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private http = inject(HttpClient);

  fetchAll(): Observable<UiCountry[]> {
    return this.http.get<ApiCountry[]>(ApiUrl).pipe(
      map(list => list.map((c, idx) => this.loadUi(c, idx))),
      catchError(err => {
        console.error('Countries API error', err);
        return of([]);
      })
    );
  }

  private loadUi(c: ApiCountry, idx: number): UiCountry {
    const id = `${c.name?.common ?? 'N/A'}-${idx}`;
    const currencyCode = c.currencies ? Object.keys(c.currencies)[0] ?? null : null;
    const currencyName = currencyCode ? c.currencies![currencyCode]?.name ?? null : null;
    const capital = (c.capital ?? []).join(', ');
    const languages = c.languages ? Object.values(c.languages).join(', ') : '';
    const continents = (c.continents ?? []).join(', ');
    return {
      id,
      name: c.name?.common ?? 'N/A',
      officialName: c.name?.official ?? 'N/A',
      independent: c.independent ?? null,
      status: c.status ?? null,
      currencyCode,
      currencyName,
      capital,
      region: c.region ?? '',
      subregion: c.subregion ?? '',
      languages,
      continents,
      _raw: c
    };
  }
}
