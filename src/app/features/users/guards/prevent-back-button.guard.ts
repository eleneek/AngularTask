import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import {DialogService} from 'primeng/dynamicdialog';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';
import {NavigateService} from '../services/navigate.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class PreventBackButtonGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  constructor(
    private dialogService: DialogService,
    private navigateServ: NavigateService
  ) {}
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.navigateServ.canNavigate);

    if (!this.navigateServ.canNavigate) {
      this.dialogService.open(ConfirmDialogComponent, {
        header: 'გასვლა',
        width: '40%',
      });
    }

    return this.navigateServ.canNavigate;
  }
}
