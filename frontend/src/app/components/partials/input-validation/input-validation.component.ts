import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
  required: 'Should not be empty',
  email: 'Email is not valid',
  minLength: 'Field is too short',
  notMatch: 'Password and confirm does not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss']
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;
  public errorMessages: Array<string> = [];

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });

    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  public checkValidation(): void {
    const errors: ValidationErrors | null = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }
}
