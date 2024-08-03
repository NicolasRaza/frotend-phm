import { LodgingService } from './../services/lodging.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Lodging } from '../domain/lodging';
import { FilterRequestLodingDTO } from '../DTO/lodging.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../domain/user';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private lodgingService: LodgingService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  lodgings!: Lodging[];
  error!: boolean;
  //pagination options
  length = 0;
  pageSize = 12;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;
  userLoged!: User;
  //spinner options
  homeLoading = true;

  //filter options
  filters: FilterRequestLodingDTO = {
    destination: undefined,
    fromdate: undefined,
    todate: undefined,
    capacity: undefined,
    userId: undefined,
  };
  minScore = 0;

  handlePageEvent(e: PageEvent) {
    this.homeLoading = true;
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.resetPageAndUpdate();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  ngOnInit() {
    this.authService
      .currentUser()
      .then((user) => {
        if (user) {
          this.userLoged = user;
          this.filters.userId = user.id;
        }
      })
      .catch((err) => {
        console.log('Error', err);
      })
      .finally(() => {
        this.resetPageAndUpdate();
      });
  }

  lodgingsToShow() {
    return this.lodgings;
  }

  setScoreFilter(score: number) {
    this.minScore = score;
    this.resetPageAndUpdate();
  }

  onFiltersApplied(filters: FilterRequestLodingDTO) {
    //add user id to filters
    filters.userId = this.userLoged.id;
    this.filters = filters;
    console.log(this.filters);
    this.resetPageAndUpdate();
  }

  resetPageAndUpdate() {
    this.pageIndex = 0;
    let condition =
      (this.filters.destination == undefined ||
        this.filters.destination == null) &&
      (this.filters.capacity == undefined || this.filters.capacity == null) &&
      (this.filters.fromdate == undefined || this.filters.fromdate == null) &&
      (this.filters.todate == undefined || this.filters.todate == null) &&
      this.minScore == 0 &&
      (this.filters.userId != undefined || this.filters.userId != null);
    if (condition) {
      this.getRecommendations();
    } else {
      this.updateLodgings();
    }
  }

  updateLodgings() {
    console.log('updateLodgings');
    this.error = false;
    this.homeLoading = true;
    this.lodgingService
      .getLodgings(this.pageIndex, this.pageSize, this.filters, this.minScore)
      .subscribe(
        (lodgingsData) => {
          this.lodgings = lodgingsData.lodgings;
          this.length = lodgingsData.totalElements;
          this.homeLoading = false;
        },
        (error) => {
          const errorMessage =
            error.error.message || 'Servicio no disponible momentáneamente';
          this.error = true;
          this.openSnackBar(errorMessage, 'error-snackbar');
          this.homeLoading = false;
        }
      );
  }

  getRecommendations() {
    console.log('getRecommendations');
    this.error = false;
    this.homeLoading = true;
    this.lodgingService
      .getRecommendations(this.pageIndex, this.pageSize, this.filters)
      .subscribe(
        (lodgingsData) => {
          this.lodgings = lodgingsData.lodgings;
          this.length = lodgingsData.totalElements;
          this.homeLoading = false;
        },
        (error) => {
          const errorMessage =
            error.error.message || 'Servicio no disponible momentáneamente';
          this.error = true;
          this.openSnackBar(errorMessage, 'error-snackbar');
          this.homeLoading = false;
        }
      );
  }

  private openSnackBar(message: string, clase: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [clase],
    });
  }
}
