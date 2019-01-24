import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  events = [];
  today = new Date();

  constructor(private firestore: FirestoreService,
              private router: Router) {
  }

  ngOnInit() {
    this.firestore.getEventsByDate().subscribe(events => this.events = events);
  }

  checkToday(data) {
    const eventDate: Date = data.toDate();
    return this.today.toDateString() === eventDate.toDateString();
  }

  goCredential(data) {
    const eventDate: Date = data.toDate();
    if (this.today.toDateString() === eventDate.toDateString()) {
      this.router.navigateByUrl('/tabs/tab1');
    }
  }

}
