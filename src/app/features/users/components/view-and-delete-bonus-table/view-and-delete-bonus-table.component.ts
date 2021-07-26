import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bonus} from '../../services/models/users.interface';

@Component({
  selector: 'app-view-and-delete-bonus-table',
  templateUrl: './view-and-delete-bonus-table.component.html',
  styleUrls: ['./view-and-delete-bonus-table.component.scss'],
})
export class ViewAndDeleteBonusTableComponent implements OnInit {
  cols: {field: string; header: string}[] = [];
  selectedBonuses: Bonus[] = [];
  @Input() bonusesData: Bonus[] = [];
  @Input() maxRowsNumber: number = 0;
  @Input() totalRecords: number = 0;
  @Output() deleteBonusEmitter: EventEmitter<Bonus[]> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.cols = [
      {field: 'userNumber', header: 'მომხმარებლის ნომერი'},
      {field: 'bonusType', header: 'ბონუსის ტიპი'},
      {field: 'bonusAmount', header: 'ბონუსის რაოდენოდა'},
      {field: 'currency', header: 'ვალუტა'},
    ];
  }

  deleteBonus() {
    this.deleteBonusEmitter.emit(this.selectedBonuses);
  }
}
