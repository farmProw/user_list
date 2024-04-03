
import { Component, OnInit, OnDestroy, effect, inject, input, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CommonModule],
})
export class UserListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  activeLink = input.required<string | null | undefined>();
  userService = inject(UserService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  userID = signal(0);
  path = signal(window.location.href);
  users: User[] = [];
  constructor() {
    effect(() => {
      this.users = this.userService.getUsers();
    });
  }

  ngOnInit() {
    this.users = this.userService.getUsers();

    const childID = (this.activatedRoute as any).firstChild?.snapshot?.params?.id;
    this.userID.set(childID)

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlArray = event.url.split('/')
        const id = Number(urlArray[urlArray.length - 1])
        this.userID.set(id)
      }
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId);
    this.users = this.users.filter((user) => user.id !== userId);
  }
  createUser() {
    this.router.navigate(['create', this.users?.length + 1], {
      relativeTo: this.activatedRoute,
    });
  }
  navigateTo(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
