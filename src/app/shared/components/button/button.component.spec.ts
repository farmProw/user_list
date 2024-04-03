import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ButtonComponent } from "./button.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ButtonComponent", () => {

  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ButtonComponent]
    });

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
