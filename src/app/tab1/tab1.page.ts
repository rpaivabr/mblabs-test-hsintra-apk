import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  options: BarcodeScannerOptions;
  encodeText = '';
  encodedData: any = {};
  scannedData: any = {};
  today: Date = new Date();
  ingresso: any = {};

  constructor(public scanner: BarcodeScanner,
              public firestore: FirestoreService) { }

  ngOnInit() {
  }

  scan() {
    this.options = { prompt: 'Scan your barcode' };
    this.scanner.scan().then((data) => {
      this.firestore.getById(data.text, 'ingressos').subscribe(ingresso => {
        this.ingresso = ingresso;
        this.firestore.getById(ingresso.evento, 'eventos').subscribe(evento => this.ingresso.evento = evento);
        this.firestore.getById(ingresso.usuario, 'usuarios').subscribe(usuario => this.ingresso.usuario = usuario);
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  encode() {
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodeText).then((data) => {
      this.encodedData = data;
    }, (err) => {
      console.log('Error: ', err);
    });
  }


}


