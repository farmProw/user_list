import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone:true,
})
export class ButtonComponent {
  @Output() click = new EventEmitter<Event>();
  disabled = input(false,{transform:booleanAttribute})
  onClick(event: Event): void {
      this.click.emit(event);
  }
}
