import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private router: Router
  ) { }

  /*Spinner loading*/
  async loading() {
    return await this.loadingController.create({
      message: 'Loading...',
      spinner: 'circular'
    });
  }

  /*Modal message*/
  async toast(options: ToastOptions) {
    const toast = await this.toastController.create(options);
    toast.present();
  }

  /*Navigate by url*/
  routerLink(url: string): Promise<boolean> {
    return this.router.navigateByUrl(url)
  }

  /*Save value in localstorage*/
  saveInLocalStorga(key: string, value: any): void {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  /*Get value in localstorage*/
  getItemLocalStorga(key: string): string {
    return JSON.parse(localStorage.getItem(key));
  }

  /*Remove value in localstogare*/
  deleteItemLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  /*Clean localstogare*/
  cleanLocalStorage() {
    localStorage.clear();
  }

  /*Open Modal*/
  async presentModal(options: ModalOptions) {
    const modal = await this.modalController.create(options);
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) return data;
  }

  /*Close Modal*/
  dismissModal(data?: any) {
    return this.modalController.dismiss(data);
  }

}
