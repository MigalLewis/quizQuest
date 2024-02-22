import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BackgroundComponent} from '../background/background.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DatePipe, NgIf, TitleCasePipe} from '@angular/common';
import {Photo} from '@capacitor/camera';
import {PhotoService} from '../../service/photo.service';
import {UserDetail} from '../../service/firestore.service';
import {FireStorageService} from '../../service/fire-storage.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [
    BackgroundComponent,
    FormsModule,
    IonicModule,
    NgIf,
    ReactiveFormsModule,
    TitleCasePipe,
    DatePipe
  ],
  standalone: true
})
export class UserDetailsComponent {
  @Input()
  headerText = '';
  @Input()
  saveButtonText = '';
  @Input()
  user!: Observable<UserDetail>;
  @Output()
  saveDetails = new EventEmitter<UserDetail>();
  uid!: string;
  isModalOpen = false;
  dateOfBirth: Date | undefined;
  today = new Date().toISOString();formGroup: FormGroup;
  photo?: Photo;

  constructor(
    private photoService: PhotoService,
    private fireStorageService: FireStorageService) {
    this.formGroup = this.createForm();
  }

  ngOnInit() {
    this.user?.subscribe(user => {
      this.uid = user.uid!;

      this.formGroup.get('name')?.patchValue(user.name)
      this.formGroup.get('surname')?.patchValue(user.surname)
      this.formGroup.get('profilePhoto')?.patchValue(user.profileImageUrl)

      if (user.dateOfBirth) {
        this.formGroup.get('dateOfBirth')?.patchValue(user.dateOfBirth)
        this.dateOfBirth = new Date(user.dateOfBirth);
      }
    });
  }

  private createForm() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      profilePhoto: new FormControl('')
    });
  }

  selectImage() {
    this.photoService.takePhoto()
      .then(photo => this.photo = photo);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setDateOfBirth(date: any) {
      this.dateOfBirth = new Date(date.detail.value);
      this.formGroup.patchValue({
        dateOfBirth: this.dateOfBirth
      });
  }

  async saveUserDetails() {
    const user: UserDetail = {
      uid: this.uid,
      name: this.formValue.name,
      surname: this.formValue.surname,
      dateOfBirth: this.dateOfBirth?.toString()
    }

    if (this.photo) {
      user.profileImageUrl = await this.fireStorageService.saveProfilePhoto(this.photo, this.uid);
    }

    this.saveDetails.emit(user)
  }

  private get formValue() {
    return this.formGroup.value;
  }
}
