
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CurrencyOption, UiCountry } from '../../core/models/country.model';

@Component({
  selector: 'app-country-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    DialogModule, ButtonModule, InputTextModule, InputSwitchModule,
    DropdownModule, ChipsModule, DragDropModule
  ],
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.scss']
})
export class CountryDialogComponent implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() visible = false;
  @Input() country: UiCountry | null = null;
  @Input() currencies: CurrencyOption[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<UiCountry>();

  form = this.fb.group({
    name: ['', Validators.required],
    officialName: [''],
    independent: [false],
    status: [''],
    currencyCode: [''],
    capital: [''],
    region: [''],
    subregion: [''],
    languages: [''],
    continents: ['']
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['country'] && this.country) {
      this.form.reset({
        name: this.country.name,
        officialName: this.country.officialName,
        independent: this.country.independent ?? false,
        status: this.country.status ?? '',
        currencyCode: (this.country.currencyCode || '')?.toLowerCase(),
        capital: this.country.capital,
        region: this.country.region,
        subregion: this.country.subregion,
        languages: this.country.languages,
        continents: this.country.continents
      });
    }
  }

  onCancel() {
    this.close.emit();
  }

  onSave() {
    if (!this.country) return;
    if (this.form.invalid) return;

    const v = this.form.getRawValue();
    const updated: UiCountry = {
      ...this.country,
      name: v.name!,
      officialName: v.officialName || '',
      independent: !!v.independent,
      status: v.status || null,
      currencyCode: v.currencyCode ? v.currencyCode.toUpperCase() : null,
      currencyName: v.currencyCode
        ? this.currencies.find(c => c.code === v.currencyCode)?.name || null
        : null,
      capital: v.capital || '',
      region: v.region || '',
      subregion: v.subregion || '',
      languages: v.languages || '',
      continents: v.continents || ''
    };
    console.log('Updated country:', updated);

    this.saved.emit(updated);
  }
}