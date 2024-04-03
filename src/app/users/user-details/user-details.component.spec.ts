import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UserDetailsComponent } from "./user-details.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UserDetailsComponent", () => {

  let fixture: ComponentFixture<UserDetailsComponent>;
  let component: UserDetailsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UserDetailsComponent]
    });

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
