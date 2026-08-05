import { inject, Injectable } from '@angular/core';
import { addDoc, getDoc, setDoc, doc, collection, Firestore } from '@angular/fire/firestore';
import { getStorage, uploadString, ref, getDownloadURL, Storage } from '@angular/fire/storage';
import { Auth, UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../models/user.models';
import { UtilsService } from './utils.service';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private firestorage = inject(Storage);
  private utilsService = inject(UtilsService);

  /*Autenticacion*/
  signIn(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  singOut() {
    this.auth.signOut();
    this.utilsService.cleanLocalStorage();
    this.utilsService.routerLink('/auth')
  }

  getAuth() {
    return this.auth;
  }

  /*DB*/
  setDocument(path: string, data: any): Promise<void> {
    return setDoc(doc(this.firestore, path), data);
  }

  async getDocument(path: string): Promise<any> {
    return await getDoc(doc(this.firestore, path));
  }

  addDocument(path: string, data: any): Promise<any> {
    return addDoc(collection(this.firestore, path), data);
  }

  /*Almacenamiento */
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(this.firestorage, path), data_url, 'data_url').then((img) => {
      return getDownloadURL(ref(this.firestorage, path));
    });
  }
}
