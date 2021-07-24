import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]',
})
export class AlphabetOnlyDirective {
  regexStr = '^[a-zA-Z]*$';

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: { key: string }) {
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: KeyboardEvent) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value
        .replace(/[^A-Za-z ]/g, '')
        .replace(/\d+/g, '');
      event.preventDefault();
    }, 100);
  }
}
