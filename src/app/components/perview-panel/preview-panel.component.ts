
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { UiCountry } from '../../core/models/country.model';

@Component({
  selector: 'app-preview-panel',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './preview-panel.component.html',
  styleUrls: ['./preview-panel.component.scss']
})
export class PreviewPanelComponent {
  @Input() country: UiCountry | null = null;
}
