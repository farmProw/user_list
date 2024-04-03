import { Component, OnInit, computed, effect, inject, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from "../../core/services/user.service";
import { CommonModule } from "@angular/common";
import { UserFormComponent } from "../user-form/user-form.component";
import { UserDetailsPageEnum } from '../../shared/enums/user.enum';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [CommonModule, UserFormComponent],
  standalone: true,
})
export class UserDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  router = inject(Router);
  userID = toSignal(this.activatedRoute.paramMap);
  urlSegments = this.activatedRoute?.snapshot?.url;
  pageType!: UserDetailsPageEnum;

  constructor() {}

  ngOnInit() {
    this.pageType = this.urlSegments.some(
      (segment) => segment.path === 'create'
    )
      ? UserDetailsPageEnum.Create
      : UserDetailsPageEnum.Edit;
  }

  filteredUser = computed(() =>{
     if(this.pageType != UserDetailsPageEnum.Edit){
       return undefined
     }
   return this.userService
      .getUsers()
      .find((user) => user.id == Number(this.userID()?.get('id')))
  }
  );
  closeHandler() {
    this.router.navigate(['../../'])
  }
}

