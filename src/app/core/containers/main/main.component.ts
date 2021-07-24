import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AddNewUserComponent } from 'src/app/users/components/add-new-user/add-new-user.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(public dialogService: DialogService) {}

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'მომხმარებელი',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'დამატება',
            icon: 'pi pi-fw pi-user-plus',
            command: () => this.addUser(),
          },
        ],
      },
    ];
  }

  addUser() {
    const ref = this.dialogService.open(AddNewUserComponent, {
      header: 'მომხმარებლის დამატება',
      width: '70%',
    });
  }
}
