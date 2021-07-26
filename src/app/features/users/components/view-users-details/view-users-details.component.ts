import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {User} from '../../services/models/users.interface';

@Component({
  selector: 'app-view-users-details',
  templateUrl: './view-users-details.component.html',
  styleUrls: ['./view-users-details.component.scss'],
})
export class ViewUsersDetailsComponent implements OnInit {
  userData: User;
  constructor(public config: DynamicDialogConfig) {
    this.userData = config.data;
  }

  ngOnInit(): void {}
}
