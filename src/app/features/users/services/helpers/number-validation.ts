import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkNumberLength(val: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let v: string = control.value;

    if (v && v.length !== val) {
      return { numberValue: true };
    }

    return null;
  };
}
