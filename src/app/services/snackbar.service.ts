import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CustomSnackbarComponent, SnackType } from "../components/snackbar/custom-snackbar/custom-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private readonly snackBar: MatSnackBar
  ) {}

  show(message: string = 'Sistema temporariamente indisponivel. Favor tente novamente!',
       type: SnackType = 'error',
       duration: number = 5000) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snack-bar-container']
    });
  }

  success(message: string, duration?: number) { this.show(message, 'success', duration); }
  error(message: string, duration?: number) { this.show(message, 'error', duration); }
  warning(message: string, duration?: number) { this.show(message, 'warning', duration); }
}
