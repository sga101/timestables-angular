import { ElementRef, Injector, runInInjectionContext } from '@angular/core';
import { AutoFocusDirective } from './focus.directive';

describe('FocusDirective', () => {
  it('should create an instance', () => {
    const providers = [ { provide: ElementRef, useValue: null} ]
    const injector = Injector.create({providers})
    const directive = runInInjectionContext(injector, ()=> new AutoFocusDirective());
    expect(directive).toBeTruthy();
  });
});
