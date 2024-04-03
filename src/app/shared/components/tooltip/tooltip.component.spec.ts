import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TooltipComponent } from "./tooltip.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TooltipComponent", () => {

  let fixture: ComponentFixture<TooltipComponent>;
  let component: TooltipComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TooltipComponent]
    });

    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
