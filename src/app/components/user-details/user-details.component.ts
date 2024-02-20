import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BackgroundComponent} from '../background/background.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {NgIf, TitleCasePipe} from '@angular/common';
import {Photo} from '@capacitor/camera';
import {PhotoService} from '../../service/photo.service';
import {UserDetail} from '../../service/firestore.service';
import {FireStorageService} from '../../service/fire-storage.service';

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
    TitleCasePipe
  ],
  standalone: true
})
export class UserDetailsComponent {
  @Input()
  headerText = '';
  @Input()
  saveButtonText = '';
  @Input()
  user!: UserDetail;
  @Output()
  saveDetails = new EventEmitter<UserDetail>();

  isModalOpen = false;
  dateOfBirth: Date | undefined;
  today = new Date().toISOString();
  months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
  formGroup: FormGroup;
  photo?: Photo;

  constructor(
    private photoService: PhotoService,
    private fireStorageService: FireStorageService) {
    this.formGroup = this.createForm();
  }

  private createForm() {
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

  async saveUserDetails() {
    if (this.photo) {
      const imageUrl = await this.fireStorageService.saveProfilePhoto(this.photo, this.user.uid!);
      this.formGroup.get('profilePhoto')!.setValue(imageUrl);
    }
    this.saveDetails.emit(this.formGroup.value)
  }
}
