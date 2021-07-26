import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {Table} from 'primeng/table';
import {User} from '../../services/models/users.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @ViewChild('dt')
  dt!: Table;
  @Input() usersData: User[] = [];
  @Input() usersDataLoading: boolean = false;
  @Input() maxRowsNumber: number = 0;
  @Input() totalRecords: number = 0;
  @Output() editUserEmitter: EventEmitter<User> = new EventEmitter();
  @Output() deleteUserEmitter: EventEmitter<User> = new EventEmitter();
  @Output() addBonusEmitter: EventEmitter<User> = new EventEmitter();
  @Output() viewAndDeleteBonusEmitter: EventEmitter<User> = new EventEmitter();
  @Output() viewDetailsEmitter: EventEmitter<User> = new EventEmitter();
  @Output() changeMaxRowNumberEmitter: EventEmitter<number> =
    new EventEmitter();
  @Output() changeFirstValueEmitter: EventEmitter<number> = new EventEmitter();
  @Input() first: number = 0;
  public cols: {field: string; header: string}[] = [];
  constructor() {}

  ngOnInit(): void {
    this.cols = [
      {field: 'image', header: 'სურათი'},
      {field: 'identificationNumber', header: 'პირადი ნომერი'},
      {field: 'name', header: 'სახელი'},
      {field: 'lastName', header: 'გვარი'},
      {field: 'sex', header: 'სქესი'},
      {field: 'mobileNumber', header: 'მობილური ნომერი'},
      {field: 'address', header: 'იურიდიული მისამართი'},
      {field: 'action', header: 'ქმედება'},
    ];
  }

  ngAfterViewInit() {
    this.dt.firstChange.subscribe((data) => {
      this.changeFirstValueEmitter.emit(data);
    });
  }

  public editUser(rowData: User) {
    this.editUserEmitter.emit(rowData);
  }
  public deleteUser(rowData: User) {
    this.deleteUserEmitter.emit(rowData);
  }
  public addBonus(rowData: User) {
    this.addBonusEmitter.emit(rowData);
  }
  public viewAndDeleteBonus(rowData: User) {
    this.viewAndDeleteBonusEmitter.emit(rowData);
  }
  public viewDetails(rowData: User) {
    this.viewDetailsEmitter.emit(rowData);
  }
  changeMaxRowNumber(num: number) {
    this.changeMaxRowNumberEmitter.emit(num);
  }
}
