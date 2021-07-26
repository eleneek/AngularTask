import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {bonusTemplate} from '../../services/helpers/add-bonus-form-template';
import {Bonus} from '../../services/models/users.interface';
import {UsersState} from '../../store';
import {getUsers, refreshUpdateUser, updateUser} from '../../store/actions';
import {selectUpdateUserLoaded} from '../../store/selectors/user.selector';

@Component({
  selector: 'app-add-bonus',
  templateUrl: './add-bonus.component.html',
  styleUrls: ['./add-bonus.component.scss'],
})
export class AddBonusComponent implements OnInit, OnDestroy {
  public bonusForm: FormGroup;
  public bonusTempaleForm = [...bonusTemplate];
  private destroyed$ = new Subject<void>();
  public submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private store: Store<UsersState>,
    public config: DynamicDialogConfig
  ) {
    this.bonusForm = this.fb.group({
      bonusId: [null, [Validators.required]],
      userNumber: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.addControls();
    this.store
      .select(selectUpdateUserLoaded)
      .pipe(
        takeUntil(this.destroyed$),
        tap((data) => {
          if (data) {
            this.ref.close();
            this.store.dispatch(refreshUpdateUser());
            this.store.dispatch(getUsers());
            this.bonusForm.reset();
            console.log();

            this.bonusTempaleForm = bonusTemplate;
          }
        })
      )
      .subscribe();
  }

  onDropChange(name: string) {
    this.submitted = false;
    if (
      this.bonusForm.get('bonusType')?.value.name === 'Money' &&
      name === 'bonusType'
    ) {
      this.bonusTempaleForm.push({
        type: 'select',
        name: 'currency',
        value: '',
        options: [
          {name: 'GEL', value: 'GEL'},
          {name: 'USD', value: 'USD'},
        ],
        placeholder: 'აირჩიეთ ვალუტა',
        label: 'ვალუტა',
        error: 'გთხოვთ, აირჩიოთ ვალუტა',
      });
      this.addControls();
    } else {
      if (!this.bonusForm.contains('currency')) {
        this.bonusForm.removeControl('currency');
      }
    }
  }

  addControls() {
    this.bonusTempaleForm.forEach((el) => {
      if (!this.bonusForm.contains(el.name)) {
        this.bonusForm.addControl(
          el.name,
          new FormControl(el.value, [Validators.required])
        );
      }
    });
  }

  close() {
    this.ref.close();
  }
  submit() {
    this.submitted = true;
    let bonuses: Bonus[] = [];
    this.bonusForm.get('bonusId')?.setValue(new Date().getUTCMilliseconds());
    this.bonusForm.get('userNumber')?.setValue(new Date().getUTCMilliseconds());
    if (this.bonusForm.invalid) return;
    if (this.config.data.bonuses && this.config.data.bonuses.length) {
      bonuses = [...this.config.data.bonuses, this.bonusForm.value];
    } else {
      bonuses = [{...this.bonusForm.value}];
    }
    const user = {
      ...this.config.data,
      bonuses,
    };

    this.store.dispatch(updateUser({user}));
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
