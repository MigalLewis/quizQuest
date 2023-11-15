import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.page.html',
  styleUrls: ['./report-issue.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    RouterModule
  ]
})
export class ReportIssuePage implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
  }

}
