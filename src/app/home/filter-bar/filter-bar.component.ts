import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { FilterRequestLodingDTO } from 'src/app/DTO/lodging.dto';
import { FilterService } from 'src/app/services/filter.service';
import { LodgingService } from 'src/app/services/lodging.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterBarComponent implements OnInit {
  //form variables
  myControl = new FormControl('');
  myForm!: FormGroup;

  //filter variables
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  @Output() filtersApplied = new EventEmitter<FilterRequestLodingDTO>();

  //filter data
  passengersMinValue = 1;
  currentDate = new Date();

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private lodgingService: LodgingService
  ) {
    this.myForm = this.fb.group({
      destination: [''],
      fromDate: [''],
      toDate: [{ value: '', disabled: true }, [this.toDateValidator]],
      capacity: ['', this.passengersValidator],
    });
  }

  ngOnInit() {
    this.onChipRemove();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this._filter(value || ''))
    );
  }

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    let formData: Record<string, string | null> = {};
    const form = $event.target as HTMLFormElement;

    const formElements = form.querySelectorAll('input');

    this.setNull(formElements, formData);
    //for chips in side filter
    this.filterService.updateFilterData(formData);

    this.filtersApplied.emit(formData);
  }

  private _filter(value: string): Observable<string[]> {
    return this.lodgingService.searchLodgingsCountrys(value || '').pipe(
      tap((res: string[]) => {
        this.options = res.map((country: string) => country);
      }),
      map(() =>
        this.options.filter((option) =>
          option.toLowerCase().includes(value?.toLowerCase() ?? '')
        )
      )
    );
  }

  /// Validators
  passengersValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value === '' || value > 0) {
      return null;
    } else {
      return { invalidPassengers: true };
    }
  }

  toDateValidator(control: AbstractControl) {
    const fromDateValue = control.parent?.get('fromDate')?.value;
    const toDateValue = control.value;

    if (!fromDateValue || !toDateValue) {
      // Si alguno de los campos no tiene valor, no se realiza la validación
      return null;
    }

    // Se convierten los valores de los campos a Date
    const fromDate = new Date(fromDateValue);
    const toDate = new Date(toDateValue);

    if (toDate <= fromDate) {
      return { toDateInvalid: true };
    }

    return null;
  }

  enableToDate() {
    this.myForm.get('toDate')?.enable();
  }

  private setNull(
    formElements: NodeListOf<HTMLInputElement>,
    formData: Record<string, string | null>
  ) {
    formElements.forEach((input) => {
      formData[input.name] = input.value === '' ? null : input.value;
    });
  }

  onChipRemove() {
    this.filterService.getFilterData().subscribe((data) => {
      this.myForm.patchValue({
        destination: data.destination ?? '',
        fromDate: this.convertDate(data.fromdate) ?? '',
        toDate: this.convertDate(data.todate) ?? '',
        capacity: data.capacity ?? '',
      });

      data.fromdate
        ? this.enableToDate()
        : this.myForm.controls['toDate'].disable();

      this.myForm.controls['capacity'].setErrors(null);
      //setear ninguna opcion seleccionada en el autocomplete de destino
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        switchMap((value) => this._filter(''))
      );
    });
  }

  convertDate(dateStr: string | undefined) {
    if (!dateStr) {
      return null;
    }
    const parts = dateStr.split('/'); // Separa la cadena en partes (["15", "5", "2023"])
    const day = parseInt(parts[0], 10); // Convierte el día en un número entero (15)
    const month = parseInt(parts[1], 10) - 1; // Convierte el mes en un número entero y resta 1 (4, porque los meses en JS van de 0 a 11)
    const year = parseInt(parts[2], 10); // Convierte el año en un número entero (2023)
    const date = new Date(year, month, day); // Crea el objeto de fecha (15 de mayo de 2023)
    return date;
  }
}
