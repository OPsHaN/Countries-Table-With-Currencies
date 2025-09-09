import { Routes } from '@angular/router';
import { CountriesPageComponent } from './components/countries-page/countries-page.component';

export const routes: Routes = [
  { path: '', component: CountriesPageComponent },
  { path: '**', redirectTo: '' }
];
