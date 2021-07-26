import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {NavigateService} from '../../services/navigate.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private ref: DynamicDialogRef,
    private navigateServ: NavigateService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  close() {
    this.ref.close();
  }

  navigate() {
    this.navigateServ.canNavigate = true;
    this.router.navigateByUrl('/users');
    this.close();
  }
}
