import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';
import { TooltipService } from './core/services/tooltip.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TooltipComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-list';
  tooltipService = inject(TooltipService)
}
