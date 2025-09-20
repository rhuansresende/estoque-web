import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";

export type SnackType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'estoque-custom-snackbar',
  standalone: false,
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    protected snack: MatSnackBarRef<CustomSnackbarComponent>
  ) {}

  getIcon(type: SnackType) {
    switch(type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}
