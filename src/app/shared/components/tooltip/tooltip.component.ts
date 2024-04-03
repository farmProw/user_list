import { animate, state, style, transition, trigger } from "@angular/animations";
import { CommonModule } from "@angular/common";
import { Component, HostBinding, Input, OnChanges, OnInit, } from "@angular/core";

@Component({
  selector: "app-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"],
  imports: [CommonModule],
  standalone: true,
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0%)' })),
      state('out', style({ transform: 'translateX(120%)' })),
      transition('in <=> out', animate('300ms ease-in-out')),
    ]),
  ]
})

export class TooltipComponent implements OnInit, OnChanges {

  @Input() tooltipColor: string = '#28a745';
  @Input() set isOpen(value: { isOpen: boolean }) {
    this.openModal = value.isOpen
    this.slideInOutState = value ? 'in' : 'out';
    if (value) {
      setTimeout(() => this.closeTooltip(), 1500);
    }
  }
  openModal = false
  @HostBinding('@slideInOut') slideInOutState = 'out';

  ngOnInit() {
    this.slideInOutState = this.openModal ? 'in' : 'out';
  }

  ngOnChanges() {
    this.slideInOutState = this.openModal ? 'in' : 'out';
    if (this.openModal) {
      setTimeout(() => this.closeTooltip(), 1500);
    }
  }

  closeTooltip() {
    this.openModal = false;
    this.slideInOutState = 'out';
  }
}
