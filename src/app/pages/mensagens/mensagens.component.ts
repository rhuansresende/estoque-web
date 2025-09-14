import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MensagemModel} from '../../model/mensagem.model';
import {TipoMensagemModel} from '../../model/tipo-mensagem.model';
import {MensagemService} from '../../services/mensagem.service';
import {SnackbarService} from '../../services/snackbar.service';
import {
  MensagemFormDialogComponent
} from '../../components/dialogs/mensagem-form-dialog-component/mensagem-form-dialog.component';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'estoque-mensagens.component',
  standalone: false,
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss'
})
export class MensagensComponent implements AfterViewInit {

  formulario: FormGroup;
  tiposMensagem = Array<TipoMensagemModel>();
  maxDate: Date = new Date();

  painelPesquisaAberto = true;
  painelMensagensAberto = true;

  displayedColumns: string[] = [
    'titulo',
    'mensagem',
    'tipo',
    'dataCriacao',
    'acoes'
  ];

  dataSource = new MatTableDataSource<MensagemModel>([]);

  totalRegistros = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _fb: FormBuilder,
    private service: MensagemService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {
    this.formulario = this._fb.group({
      titulo: this._fb.control(null),
      tipoMensagem: this._fb.control(null),
      dataCriacao: this._fb.control(new Date())
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getTipoMensagens();
    this.getMensagens();
  }

  getTipoMensagens() {
    this.service.consultarTipoMensagens().subscribe({
      next: (res) => this.tiposMensagem = res,
      error: (err) => this.snackbarService.show(err.error.message)
    });
  }

  getMensagens() {
    this.service.consultarMensagens(
      this.pageIndex,
      this.pageSize,
      this.formulario.get('titulo')?.value,
      this.formulario.get('tipoMensagem')?.value,
      this.formulario.get('dataCriacao')?.value).subscribe({
      next: (page) => {
        this.dataSource.data = page.content;
        this.totalRegistros = page.totalElements;
      },
      error: (err) => this.snackbarService.show(err.error.message)
    })
  }

  lerMensagem(mensagem: MensagemModel) {
    const dialogRef = this.dialog.open(MensagemFormDialogComponent, {
      width: '90%',
      maxWidth: '600px',
      minWidth: '300px',
      data: mensagem
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbarService.show("Mensagem lida com sucesso!", "success");
        this.getMensagens();
      }
    });
  }

  excluirMensagem(mensagem: MensagemModel) {
    this.service.excluirMensagem(mensagem).subscribe({
      next: () => {
        this.snackbarService.show("Mensagem excluída com sucesso!", "success");
        this.getMensagens();
      },
      error: (err) => this.snackbarService.show(err.error.message)
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMensagens();
  }

  limpar() {
    this.formulario.reset({
      titulo: null,
      tipoMensagem: null,
      dataCriacao: new Date()
    });
    this.getMensagens();
  }
}
