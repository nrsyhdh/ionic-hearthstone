import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
	providedIn: "root",
})
export class ToasterService {
	constructor(public toastController: ToastController) {}

	async presentToast() {
		const toast = await this.toastController.create({
			message: "",
			duration: 2000,
		});
		toast.present();
	}

	async presentErrorToast(message: string) {
		const toast = await this.toastController.create({
			message,
			position: "middle",
			duration: 3000,
			color: "danger",
			// cssClass: "toast-error",
			// buttons: [
			// 	{
			// 		text: "Done",
			// 		role: "cancel",
			// 	},
			// ],
		});
		toast.present();
	}
}
