import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from '../services/firestore.service';
import { AlertController } from '@ionic/angular';
import { Ticket } from '../models/ticket';
import { Event } from '../models/event';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  options: BarcodeScannerOptions;
  today: Date = new Date();
  ticket: Ticket;
  event: Event;

  constructor(public scanner: BarcodeScanner,
              public firestore: FirestoreService,
              public alertCtrl: AlertController) { }

  ngOnInit() {
    this.firestore.getEventsByDate().subscribe(events => {
      this.event = events.filter(event => event.data.toDate().toDateString() === this.today.toDateString())[0];
    });
  }

  scan() {
    this.options = { prompt: 'Aponte para o QRCode do ingresso' };
    this.scanner.scan().then((data) => {
      this.firestore.getById(data.text, 'ingressos').subscribe(ticket => {
        this.ticket = ticket;
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  useTicket() {
    if (this.ticket.situacao === 'utilizado') {
      this.presentAlert('Ingresso já foi utilizado!');
      this.ticket = undefined;
      return;
    }
    if (this.ticket.evento.uid !== this.event.uid) {
      this.presentAlert('Ingresso não pertence a este evento!');
      this.ticket = undefined;
      return;
    }
    this.ticket.situacao = 'utilizado';
    this.firestore.update(this.ticket, 'ingressos').subscribe(() => this.ticket = undefined);
  }

  cancelTicket() {
    this.ticket = undefined;
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
        subHeader: 'Acão Inválida',
        message,
        buttons: ['OK']
    });
    await alert.present();
  }

}


