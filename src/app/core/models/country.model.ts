
export interface ApiName {
  common: string;
  official: string;
}

export interface ApiCurrencyInfo {
  name: string;
  symbol?: string;
}

export interface ApiCountry {
  name: ApiName;
  independent?: boolean;
  status?: string;
  currencies?: Record<string, ApiCurrencyInfo>;
  capital?: string[];
  region?: string;
  subregion?: string;
  languages?: Record<string, string>;
  continents?: string[];
}

export interface UiCountry {
  id: string;
  name: string;
  officialName: string;
  independent: boolean | null;
  status: string | null;
  currencyCode: string | null;
  currencyName: string | null;
  capital: string;
  region: string;
  subregion: string;
  languages: string;
  continents: string;
  _raw: ApiCountry;
}

export interface CurrencyOption {
  code: string;
  name: string;
}
