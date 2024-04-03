import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './../../core/services/user.service';
import {
  Component,
  EventEmitter,
  Output,
  effect,
  inject,
  input,
} from '@angular/core';
import { User } from '../../shared/models/user.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  UserDetailsPageEnum,
  UserTypeEnum,
} from '../../shared/enums/user.enum';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TooltipComponent } from '../../shared/components/tooltip/tooltip.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    TooltipComponent
  ],
})
export class UserFormComponent {
  UserDetailsPageEnum = UserDetailsPageEnum;
  UserTypeEnum = UserTypeEnum;
  user = input.required<User | undefined>();
  users = input.required<User[]>();
  pageType = input.required<UserDetailsPageEnum>();
  toggle = { isOpen: false }
  userForm: FormGroup;
  userService = inject(UserService);
  @Output() closeHandler = new EventEmitter();
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        user_type: [UserTypeEnum.Admin, [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('password', 'repeatPassword'),
      }
    );
    this.checkUniqueUsername();
  }

  checkUniqueUsername() {
    const username = toSignal(this.userForm.get('username')?.valueChanges!);
    effect(() => {
      const isExistUser = this.users().some(
        (user) => user.username === username()
      );
      if (isExistUser&&this.pageType() === UserDetailsPageEnum.Create) {
        this.userForm.get('username')?.setErrors({
          userExist: true,
        });
      }
    });
  }

  getErrorText(error: ValidationErrors | null | undefined) {
    if (error?.['required']) {
      return 'Field is required';
    } else if (error?.['email']) {
      return 'Incorrect email';
    } else if (error?.['mustMatch']) {
      return 'Passwords do not match';
    } else if (error?.['userExist']) {
      return 'This username is already in use';
    } else if (error?.['minlength']) {
      let requiredLength = error?.['minlength'].requiredLength;
      return `Password must be at least ${requiredLength} characters long`;
    }
    return '';
  }

  onSubmit() {

  }
  effectForm = effect(() => {
    const user = this.user();
    if (user) {
      this.userForm.setValue({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_type: user.user_type,
        password: user.password,
        repeatPassword: user.repeatPassword,
      });
    }
  });
  mustMatch(passwordKey: string, passwordConfirmationKey: string) {
    return (formGroup: FormGroup) => {
      const passwordInput = formGroup.controls[passwordKey];
      const passwordConfirmationInput =
        formGroup.controls[passwordConfirmationKey];
      if (
        passwordConfirmationInput.errors &&
        (!passwordConfirmationInput.errors as any).mustMatch
      ) {
        return;
      }
      if (passwordInput.value !== passwordConfirmationInput.value) {
        passwordConfirmationInput.setErrors({ mustMatch: true });
      } else {
        passwordConfirmationInput.setErrors(null);
      }
    };
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId);
    this.userForm.reset();
  }
  saveUser() {
    if (this.userForm.invalid) return;
    const user = this.user();
    const value = this.userForm.value;
    if (user) {
      value.id = user.id;
    }
    this.userService.saveUser(this.userForm.value)

  }
  createUser(event: Event) {
    event.stopPropagation();
    if (this.userForm.invalid) return;
    this.userService.createUser(this.userForm.value);
    this.userForm.reset();
  }
}
