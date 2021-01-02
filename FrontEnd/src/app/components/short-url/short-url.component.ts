import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService, private _clipBoardService: ClipboardService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  ngOnInit(): void {
  }

  procesarUrl() {

    // Validar si la url es vacia ''
    if (this.nombreUrl === '') {
      this.error('Por favor ingrese una URL.');

      return;
    }
    this.urlProcesada = false;
    this.loading = true;
    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);
  }

  copy() {
    this._clipBoardService.copyFromContent(this.urlShort);
    alert('Contenido copiado!');
  }

  obtenerUrlShort() {
    this._shortUrlService.getUrlShort(this.nombreUrl).subscribe(data => {
      this.loading = false;
      this.urlProcesada = true;
      this.urlShort = data.link;
    }, error => {
      this.loading = false;
      this.nombreUrl = '';
      console.log(error);
      if (error.error.description === 'The value provided is invalid.') {
        this.error('La URL ingresada es inválida.');
      }
    })
  }

  error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;

    // Mostramos error por 4 segundos
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }

}
