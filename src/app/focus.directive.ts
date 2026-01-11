import { Directive, AfterViewInit, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appAutofocus]' })
export class AutoFocusDirective implements AfterViewInit {
  private el = inject(ElementRef);


  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
