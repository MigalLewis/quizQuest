import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BackgroundComponent } from "../../../components/background/background.component";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterModule, BackgroundComponent]
})
export class RegisterComponent implements OnInit {
  isModalOpen: boolean;
  dateOfBirth: Date | undefined;
  today: string;
  months: string[];

  constructor() {
    this.isModalOpen = false;
    this.today = new Date().toISOString();
    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
  }

  ngOnInit() {}

  nextScreen() {}

  selectImage() {}

  setOpen(isOpen: boolean) {}

  setDateOfBirth(date: any) {
    this.dateOfBirth = new Date(date.detail.value);
  }
}
