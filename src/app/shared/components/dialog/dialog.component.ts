import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public pets: any[];
  public petId: any[];

  constructor(
    public generalService: GeneralService,
    public api: ApiService,
    ) { }

  ngOnInit(): void {
        this.api.getPets().subscribe((data) => {
        this.pets = data.filter((pets) => pets.id == this.generalService.getPetId);
      });
  }

}
