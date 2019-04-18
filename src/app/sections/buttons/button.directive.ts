import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective {

  constructor(private el: ElementRef) {
    // el.nativeElement.class = 'button mat-button main primary';
  }

  /** Color palette of the button */
  @Input() color: 'primary' | 'secondary';
  /** Design  of the button */
  @Input() design: 'main' | 'stroke' | 'basic' | 'white' = 'main';
  /** Disable state of the button */
  @Input() disabled: boolean = false;

  @HostBinding('class')
  elementClass = 'button mat-button main primary';
}
