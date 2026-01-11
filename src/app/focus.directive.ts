import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutofocus]',
    standalone: false
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
