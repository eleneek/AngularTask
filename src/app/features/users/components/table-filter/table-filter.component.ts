import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FiltersForm} from '../../services/models/filters.interface';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
})
export class TableFilterComponent implements OnInit {
  @Output() applyFilterEmmiter: EventEmitter<FiltersForm> = new EventEmitter();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      lastName: [''],
      identificationNumber: [''],
      mobileNumber: [''],
    });
  }

  ngOnInit(): void {}
  search() {
    this.applyFilterEmmiter.emit(this.filterForm.value);
  }
}
