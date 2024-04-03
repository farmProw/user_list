import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserTypeEnum } from '../../shared/enums/user.enum';
import { Router } from '@angular/router';
import { TooltipService } from './tooltip.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  router = inject(Router)
  tooltipService = inject(TooltipService)
  private users: WritableSignal<User[]> = signal([
    new User(
      1,
      'qwerty',
      'Vitalii',
      'Ploshchynskyi',
      'qwerty@123.gmail.com',
      UserTypeEnum.Admin,
      '12345678',
      '12345678'
    ),
    new User(
      2,
      'qwerty2',
      'Vitalii2',
      'Ploshchynskyi2',
      'qwerty@345.gmail.com',
      UserTypeEnum.Admin,
      '12345678',
      '12345678'
    ),
    new User(
      3,
      'qwerty3',
      'Vitalii3',
      'Ploshchynskyi3',
      'qwerty@567.gmail.com',
      UserTypeEnum.Admin,
      '12345678',
      '12345678'
    ),
  ]);

  getUsers(): User[] {
    return this.users();
  }

  saveUser(user: User) {
    const ID = user.id;
    this.users.update(prev=>prev.map((item) => {
      if(item.id == ID){
        return {
          ...item,...user
        }
      }
      return item
    }));
    this.tooltipService.openTooltip()
    this.tooltipService.setContentTooltip('User edited')

  }
  createUser(user: User) {
    user.id = this.users().length + 1;
    this.users.update((prev) => [...prev, user]);
    this.router.navigate(['../../']);
    this.tooltipService.openTooltip()
    this.tooltipService.setContentTooltip('User created')

  }

  deleteUser(userId: number) {
    this.users.update(prev=>prev.filter((user) => user.id !== userId));
    this.tooltipService.openTooltip()
    this.tooltipService.setContentTooltip('User delated')
    this.router.navigate(['../../'])
  }
}
