import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function notEmptyValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const length = control.value?.trim().length ?? 0;
    return  length > 0 ? null : {notEmpty: {value: control.value}};
  };
}
