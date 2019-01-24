import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collection: AngularFirestoreCollection<any>;
  private doc: AngularFirestoreDocument<any>;

  constructor(private db: AngularFirestore) {}

  getAll(path: string): Observable<any[]> {
    this.collection = this.db.collection(path);
    return this.collection
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as any;
            const uid = a.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }

  getEventsByDate(): Observable<Event[]> {
    this.collection = this.db.collection('eventos', ref => ref.orderBy('data'));
    return this.collection
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as Event;
            const uid = a.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }

  getTasksByData(data: string, path: string): Observable<any[]> {
    return this.getAll(path).pipe(
      map(objs => {
        return objs.filter(obj => obj.data === data);
      })
    );
  }

  getAllByEmail(email: string, path: string): Observable<any[]> {
    return this.getAll(path).pipe(
      map(objs => {
        return objs.filter(obj => obj.email === email);
      })
    );
  }

  getById(id: string, path: string): Observable<any> {
    return this.getAll(path).pipe(
      map(objs => {
        return objs.filter(obj => obj.uid === id)[0];
      })
    );
  }

  getByEmail(email: string, path: string): Observable<any> {
    return this.getAll(path).pipe(
      map(objs => {
        return objs.filter(obj => obj.email === email)[0];
      })
    );
  }

  getByData(data: string, path: string): Observable<any> {
    return this.getAll(path).pipe(
      map(objs => {
        return objs.filter(obj => obj.data === data)[0];
      })
    );
  }

  getByAuthUid(uid: string): Observable<User> {
    return this.getAll('usuarios').pipe(
      map(objs => {
        return objs.filter(obj => (obj.authUid === uid))[0];
      })
    );
  }

  getByAdmin(uid: string): Observable<User> {
    return this.getAll('usuarios').pipe(
      map(objs => {
        return objs.filter(obj => (obj.authUid === uid && obj.perfil === 'admin'))[0];
      })
    );
  }

  add(obj: any, path: string): Observable<void> {
    this.doc = this.db.doc<any>(`${path}/${obj.uid}`);
    return from(this.doc.set(obj));
  }

  update(obj: any, path: string): Observable<void> {
    this.doc = this.db.doc<any>(`${path}/${obj.uid}`);
    return from(this.doc.update(obj));
  }

  deleteById(id: string, path: string): Observable<void> {
    this.doc = this.db.doc<any>(`${path}/${id}`);
    return from(this.doc.delete());
  }

  getUid(): string {
    return this.db.createId();
  }

}
