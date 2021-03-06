import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {AddNewUserComponent} from 'src/app/features/users/components/add-new-user/add-new-user.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  constructor(public dialogService: DialogService, private router: Router) {}

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'მომხმარებლების სია',
        icon: 'pi pi-table',
        command: () => this.router.navigateByUrl('/users'),
      },
      {
        label: 'მომხმარებელი',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'დამატება',
            icon: 'pi pi-fw pi-user-plus',
            command: () => this.router.navigateByUrl('/users/add-user'),
          },
        ],
      },
    ];
  }
}
