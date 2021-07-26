import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-items-per-page',
  templateUrl: './items-per-page.component.html',
  styleUrls: ['./items-per-page.component.scss'],
})
export class ItemsPerPageComponent implements OnInit, OnChanges {
  @Input() dataLength: number = 0;
  @Input() maxRowNumber: number = 0;
  @Input() itemsPerPageOpts: number[] = [];
  @Input()
  selectedNumber!: SelectItem;
  numbersChoice: SelectItem[] = [];
  @Input() dataLoaded: boolean = false;

  @Output() changeMaxRowNumber: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  ngOnChanges() {
    this.numbersChoice = [];
    this.selectedNumber = {
      label: `აჩვენე 1 - ${this.maxRowNumber} ${this.dataLength}-დან`,
      value: this.maxRowNumber,
    };
    if (this.itemsPerPageOpts && this.itemsPerPageOpts.length) {
      this.itemsPerPageOpts.forEach((el) => {
        const newItem = {
          label: `აჩვენე 1 - ${el} ${
            this.dataLength ? this.dataLength : 0
          }-დან`,
          value: el,
        };
        this.numbersChoice.push(newItem);
      });
    }
  }
  changeRowNumber() {
    this.changeMaxRowNumber.emit(this.selectedNumber.value);
  }
}
