import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UserFormComponent } from "./user-form.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UserFormComponent", () => {

  let fixture: ComponentFixture<UserFormComponent>;
  let component: UserFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UserFormComponent]
    });

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
