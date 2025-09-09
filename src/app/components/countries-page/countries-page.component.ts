import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CountriesService } from '../../core/services/countries.service';
import { CurrencyService } from '../../core/services/currency.service';
import { UiCountry, CurrencyOption } from '../../core/models/country.model';
import { PreviewPanelComponent } from '../perview-panel/preview-panel.component';
import { CountryDialogComponent } from '../country-dialog/country-dialog.component';

@Component({
  selector: 'app-countries-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    TagModule,
    ConfirmDialogModule,
    CountryDialogComponent,
    PreviewPanelComponent,
  ],
  templateUrl: './countries-page.component.html',
  styleUrls: ['./countries-page.component.scss'],
})
export class CountriesPageComponent implements OnInit {
  private countriesSvc = inject(CountriesService);
  private currencySvc = inject(CurrencyService);
  private messages = inject(MessageService);
  private confirm = inject(ConfirmationService);

  loading = signal<boolean>(true);
  all = signal<UiCountry[]>([]);
  currencies = signal<CurrencyOption[]>([]);
  showDialogPreview = signal<boolean>(false);

  private _selected = signal<UiCountry | null>(null);
  get selected() {
    return this._selected();
  }
  set selected(value: UiCountry | null) {
    this._selected.set(value);
  }

  private _rows = signal<number>(10);
  get rows() {
    return this._rows();
  }
  set rows(value: number) {
    this._rows.set(value);
  }

  rowsPerPageOptions = [10, 25, 50, 100];
  showDialog = signal<boolean>(false);

  ngOnInit(): void {
    this.countriesSvc.fetchAll().subscribe((list) => {
      this.all.set(list);
      this.loading.set(false);
    });

    this.currencySvc.fetchAll().subscribe((list) => {
      this.currencies.set(list);
    });
  }

  onRowClick(country: UiCountry) {
    this.selected = country;
    console.log('Selected after click:', this.selected);
    this.showDialogPreview.set(true);
  }


  openUpdate(row?: UiCountry) {
    if (row) {
      this.selected = row;
    }
    if (!this.selected) {
      this.messages.add({
        severity: 'warn',
        summary: 'No selection',
        detail: 'Please select a row to update.',
      });
      return;
    }
    this.showDialog.set(true);
  }

  onDelete(row: UiCountry) {
    this.confirm.confirm({
      message: `Delete "${row.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.all.set(this.all().filter((x) => x.id !== row.id));
        if (this.selected?.id === row.id) {
          this.selected = null;
        }
        this.messages.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Row removed.',
        });
      },
    });
  }


  onSaved(updated: UiCountry) {
    this.all.set(this.all().map((x) => (x.id === updated.id ? updated : x)));
    this.selected = updated;
    this.showDialog.set(false);
    this.messages.add({
      severity: 'success',
      summary: 'Saved',
      detail: 'Changes applied.',
    });
  }
}