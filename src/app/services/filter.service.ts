import { Injectable } from '@angular/core';
import { FilterRequestLodingDTO } from '../DTO/lodging.dto';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private dataSubject = new BehaviorSubject<FilterRequestLodingDTO>({
    destination: undefined,
    fromdate: undefined,
    todate: undefined,
    capacity: undefined,
  });
  constructor() {}

  getFilterData() {
    return this.dataSubject.asObservable();
  }

  updateFilterData(data: FilterRequestLodingDTO) {
    this.dataSubject.next(data);
  }
}
