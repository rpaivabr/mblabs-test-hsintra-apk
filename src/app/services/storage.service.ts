import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    imageRef: AngularFireStorageReference;

    constructor(private storage: AngularFireStorage) { }

    uploadFile(file, objId, path: string): Observable<string> {
        this.imageRef = this.storage.ref(`${path}/${objId}`);
        return from(this.storage.upload(`${path}/${objId}`, file)).pipe(
            switchMap(() => {
                return this.imageRef.getDownloadURL();
            })
        );
    }
}
