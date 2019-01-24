import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  today = new Date();
  event: Event;

  constructor(private firestore: FirestoreService) {}

  ngOnInit() {
    this.firestore.getEventsByDate().subscribe(events => {
      this.event = events.filter(event => event.data.toDate().toDateString() === this.today.toDateString())[0];
    });
  }

}
