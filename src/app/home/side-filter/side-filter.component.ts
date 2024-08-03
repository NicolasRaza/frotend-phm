import { Component, EventEmitter, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FilterRequestLodingDTO } from 'src/app/DTO/lodging.dto';
import { FilterService } from 'src/app/services/filter.service';

interface Chip {
  label: string;
}
@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss'],
})
export class SideFilterComponent {
  chips: Chip[] = [];
  filters!: FilterRequestLodingDTO;

  @Output() selectedOptionChange = new EventEmitter<number>();
  @Output() filterRemove = new EventEmitter<FilterRequestLodingDTO>();
  ///score filter
  options = [
    { label: '5 puntos', value: 5 },
    { label: '4 o más puntos', value: 4 },
    { label: '3 o más puntos', value: 3 },
    { label: '2 o más puntos', value: 2 },
    { label: '1 o más puntos', value: 1 },
    { label: 'Todos', value: 0 },
  ];

  defaultOption: number = this.options[5].value;
  selectedOption: number = this.defaultOption;
  onOptionChange($event: MatRadioChange) {
    this.selectedOptionChange.emit($event.value);
  }
  ///

  ///chips
  getChipsFromData(data: any): Chip[] {
    const chips: Chip[] = [];

    for (const key in data) {
      if (data[key]) {
        //ignore userId
        if (key === 'userId') continue;
        const label = `${key}: ${data[key]}`;

        const chip = { label };
        chips.push(chip);
      }
    }

    return chips;
  }

  removeChip(chip: Chip) {
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips.splice(index, 1);

      const filters = this.filters;
      for (const key in filters) {
        if (filters[key] === chip.label.split(':')[1].trim()) {
          filters[key] = null;
          break;
        }
      }
      this.filterDataService.updateFilterData(filters);
      this.filterRemove.emit(filters);
    }
  }

  ///

  constructor(private filterDataService: FilterService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios del BehaviorSubject para actualizar los chips
    this.filterDataService.getFilterData().subscribe((data) => {
      this.filters = data;
      this.chips = this.getChipsFromData(data);
    });
  }
}
