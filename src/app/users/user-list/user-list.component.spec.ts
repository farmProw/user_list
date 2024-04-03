import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UserListComponent } from "./user-list.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UserListComponent", () => {

  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UserListComponent]
    });

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
