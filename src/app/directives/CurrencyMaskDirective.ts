import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: false
})
export class CurrencyMaskDirective implements OnInit {

  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit() {
    // Formata valor inicial do FormControl
    const valorInicial = this.control.control?.value;
    if (valorInicial !== null && valorInicial !== undefined) {
      this.formatarInput(valorInicial);
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value: string = this.el.nativeElement.value;

    // Remove tudo que não seja número
    const digits = value.replace(/\D/g, '');
    if (!digits) {
      this.el.nativeElement.value = '';
      this.control.control?.setValue(null, { emitEvent: false });
      return;
    }

    const numberValue = parseFloat(digits) / 100;
    this.formatarInput(numberValue);
  }

  private formatarInput(value: number) {
    const formatted = value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    this.el.nativeElement.value = 'R$ ' + formatted;
    this.control.control?.setValue(this.el.nativeElement.value, { emitEvent: false });
  }

  @HostListener('blur')
  onBlur() {
    if (!this.el.nativeElement.value) {
      this.el.nativeElement.value = '';
      this.control.control?.setValue(null, { emitEvent: false });
    }
  }

  @HostListener('focus')
  onFocus() {
    if (this.el.nativeElement.value) {
      this.el.nativeElement.value = this.el.nativeElement.value.replace('R$ ', '');
    }
  }
}
