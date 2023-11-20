import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BackgroundComponent } from "../../../components/background/background.component";
import { FirestoreService, UserDetail } from "src/app/service/firestore.service";
import { PhotoService } from "src/app/service/photo.service";
import { Photo } from "@capacitor/camera";
import { FireStorageService } from "src/app/service/fire-storage.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule, BackgroundComponent]
})
export class RegisterComponent implements OnInit {
  isModalOpen: boolean;
  dateOfBirth: Date | undefined;
  today: string;
  months: string[];
  formGroup: FormGroup;
  photo?: Photo;

  constructor(
    private firestoreService: FirestoreService,
    private photoService: PhotoService,
    private fireStorageService: FireStorageService) {
    this.isModalOpen = false;
    this.today = new Date().toISOString();
    this.months = [ "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
    this.formGroup = this.createForm();
  }

  ngOnInit() {}

  selectImage() {
    this.photoService.takePhoto()
      .then(photo => this.photo = photo);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setDateOfBirth(date: any) {
    if (date) {
      this.dateOfBirth = new Date(date.detail.value);
      this.formGroup.patchValue({
        dateOfBirth: {
          day:  this.dateOfBirth?.getDate(),
          month: this.months[this.dateOfBirth!.getMonth()],
          year: this.dateOfBirth?.getFullYear()
        }
      });
    }
  }

  createForm() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dateOfBirth: new FormGroup({
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required)
      }),
      profilePhoto: new FormControl('')
    });
  }

  async saveUser() {
    if(this.photo) {
      const imageUrl = await this.fireStorageService.saveProfilePhoto(this.photo);
      this.formGroup.get('profilePhoto')!.setValue(imageUrl);
    }
    this.firestoreService.saveUser(this.formGroup.value);
  }
}