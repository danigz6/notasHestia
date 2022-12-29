import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function dateValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const length = control.value?.toString().trim().length ?? 0;
    return  length > 0 ? null : {notEmpty: {value: control.value}};
  };
}
