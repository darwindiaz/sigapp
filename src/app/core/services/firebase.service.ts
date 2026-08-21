import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  collection,
  query,
  Firestore,
  updateDoc,
  WhereFilterOp,
  where,
} from '@angular/fire/firestore';
import {
  uploadString,
  ref,
  getDownloadURL,
  Storage,
} from '@angular/fire/storage';
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { sanitizeFirestoreData } from '../utils/firestore-data.util';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private firestorage = inject(Storage);

  /*Autenticacion*/
  signIn(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  getAuth() {
    return this.auth;
  }

  /*DB*/
  async getCollection<T>(path: string): Promise<T[]> {
    const collectionRef = collection(this.firestore, path);
    const collectionQuery = query(collectionRef);
    const querySnapshot = await getDocs(collectionQuery);

    return querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as T[];
  }

  async getCollectionWhere<T>(
    path: string,
    field: string,
    operator: WhereFilterOp,
    value: unknown,
  ): Promise<T[]> {
    const collectionRef = collection(this.firestore, path);
    const collectionQuery = query(collectionRef, where(field, operator, value));
    const querySnapshot = await getDocs(collectionQuery);

    return querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    })) as T[];
  }

  setDocument(path: string, data: any): Promise<void> {
    const sanitizedData = sanitizeFirestoreData(data);

    return setDoc(doc(this.firestore, path), sanitizedData);
  }

  async getDocument(path: string): Promise<any> {
    return await getDoc(doc(this.firestore, path));
  }

  addDocument(path: string, data: any): Promise<any> {
    const sanitizedData = sanitizeFirestoreData(data);

    return addDoc(collection(this.firestore, path), sanitizedData);
  }

  updateDocument(path: string, data: Partial<unknown>): Promise<void> {
    const sanitizedData = sanitizeFirestoreData(data);

    return updateDoc(doc(this.firestore, path), sanitizedData);
  }

  /*Almacenamiento */
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(this.firestorage, path), data_url, 'data_url').then(
      (img) => {
        return getDownloadURL(ref(this.firestorage, path));
      },
    );
  }
}
