import { Component, OnDestroy, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Subscription } from 'rxjs';
import { SignalRService } from 'src/app/core/services/signalr.service';
import { interval } from 'rxjs';
import DataSource from 'devextreme/data/data_source';
import { AuthService } from 'src/app/core/services/auth.service';
import notify from 'devextreme/ui/notify';
// import { environment } from 'src/environments/environment.prod';
// import { DataStatus, DataStatusDataSource, MonthlyDataSource } from 'src/app/core/models/shared/base-entity.model';
// import { RoleEnum } from 'src/app/core/models/entities/users/operation-claim.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyMxRecord } from 'dns';
import { EnumCondition, EnumDelegate, EnumPeriod } from 'src/app/core/models/entities/job-analysis.model';
import { ApiStoreService } from 'src/app/core/services/api-store-service';
import { DataStatus } from 'src/app/core/models/shared/base-entitiy.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [SignalRService, HubConnectionBuilder]
})
export class AdminHomeComponent implements OnInit, OnDestroy {

  personnelCount: any;
  unitCount: any;
  titleCount: any;
  jobDefinitionCount: any;
  jobAnalysisCount: any;
  jobAnalysisHighScorePersonnelCount: any;

  dailyPeriodCount: any;
  weeklyPeriodCount: any;
  monthlyPeriodCount: any;

  dailyPeriodInfoProcessCount: any;
  dailyPeriodInfoActivityCount: any;

  weeklyPeriodInfoProcessCount: any;
  weeklyPeriodInfoActivityCount: any;

  monthlyPeriodInfoActivityCount: any;
  monthlyPeriodInfoProcessCount: any;

  royalPersonnelCount: any;
  proxyPersonnelCount: any;

  constructor(private apiStoreService: ApiStoreService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.getPersonnelCount();
    this.getUnitCount();
    this.getTitleCount();
    this.getJobDefinitionCount();

    this.getJobAnanlySis();
    this.getJobAnanlySisHighScorePersonnelCount();

    this.getDailyPeriodInfoProcessCount();
    this.getDailyPeriodInfoActivityCount();

    this.getWeeklyPeriodInfoActivityCount();
    this.getWeeklyPeriodInfoProcessCount();

    this.getMonthlyPeriodInfoProcessCount();
    this.getMonthlyPeriodInfoActivityCount();

    this.getRoyalPersonnelCount();
    this.getProxyPersonnelCount();
  }
  ngOnDestroy(): void {
  }

  //#region General Definition Counts

  getPersonnelCount() {
    new DataSource({
      store: this.apiStoreService.storePersonnel,
      select: ['id'],
      filter: ['status', '=', DataStatus[DataStatus.Active]]
    }).load().then(res => {
      this.personnelCount = res.length;
    })
  }

  getUnitCount() {
    new DataSource({
      store: this.apiStoreService.storeUnit,
      select: ['id'],
      filter: ['status', '=', DataStatus[DataStatus.Active]]
    }).load().then(res => {
      this.unitCount = res.length;
    })
  }

  getTitleCount() {
    new DataSource({
      store: this.apiStoreService.storeTitle,
      select: ['id'],
      filter: ['status', '=', DataStatus[DataStatus.Active]]
    }).load().then(res => {
      this.titleCount = res.length;
    })
  }

  getJobDefinitionCount() {
    new DataSource({
      store: this.apiStoreService.storeJobDefinition,
      select: ['id'],
      filter: ['status', '=', DataStatus[DataStatus.Active]]
    }).load().then(res => {
      this.jobDefinitionCount = res.length;
    })
  }

  getJobAnanlySis() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['id'],
      filter: ['status', '=', DataStatus[DataStatus.Active]]
    }).load().then(res => {
      this.jobAnalysisCount = res.length;
    })
  }

  getJobAnanlySisHighScorePersonnelCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['id', 'calculatedCompetence'],
      filter: [['status', '=', DataStatus[DataStatus.Active]], 'and', ['calculatedCompetence', '>', 44]]
    }).load().then(res => {
      this.jobAnalysisHighScorePersonnelCount = res.length;
    })
  }
  //#endregion General Definition Counts

  //#region Daily Period
  getDailyPeriodInfoActivityCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['id'],
      filter: [['period', '=', EnumPeriod[EnumPeriod.Daily]], 'and', ['condition', '=', EnumCondition[EnumCondition.Activity]]]
    }).load().then(res => {
      this.dailyPeriodInfoActivityCount = res.length;
    })
  }

  getDailyPeriodInfoProcessCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['id', 'condition'],
      filter: [['period', '=', EnumPeriod[EnumPeriod.Daily]], 'and', ['condition', '=', EnumCondition[EnumCondition.Process]]]
    }).load().then(res => {
      this.dailyPeriodInfoProcessCount = res.length;
    })
  }
  //#endregion Daily Period

  //#region Weekly Period

  getWeeklyPeriodInfoActivityCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['period', 'id', 'condition'],
      filter: [['period', '=', EnumPeriod[EnumPeriod.Weekly]], 'and', ['condition', '=', EnumCondition[EnumCondition.Activity]]]
    }).load().then(res => {
      this.weeklyPeriodInfoActivityCount = res.length;
    })
  }

  getWeeklyPeriodInfoProcessCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['id', 'condition', 'period'],
      filter: [['period', '=', EnumPeriod[EnumPeriod.Weekly]], 'and', ['condition', '=', EnumCondition[EnumCondition.Process]]]
    }).load().then(res => {
      this.weeklyPeriodInfoProcessCount = res.length;
    })
  }

  //#endregion Weekly Period

  getMonthlyPeriodInfoProcessCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['period', 'id'],
      filter: [['period', '=', EnumPeriod[EnumPeriod.Monthly]], 'and', ['condition', '=', EnumCondition[EnumCondition.Process]]]
    }).load().then(res => {
      this.monthlyPeriodInfoProcessCount = res.length;
    })
  }

  getMonthlyPeriodInfoActivityCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['period', 'id'],
      filter: [['period', '=', EnumPeriod[EnumPeriod.Monthly]], 'and', ['condition', '=', EnumCondition[EnumCondition.Activity]]]
    }).load().then(res => {
      this.monthlyPeriodInfoActivityCount = res.length;
    })
  }


  getProxyPersonnelCount() { //vekaleten
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['delegate', 'id'],
      filter: [['delegate', '=', 'Vekalet'], 'and', ['status', '=', DataStatus[DataStatus.Active]]]
    }).load().then(res => {
      this.proxyPersonnelCount = res.length;
    })
  }

  getRoyalPersonnelCount() {
    new DataSource({
      store: this.apiStoreService.storeJobAnalysis,
      select: ['delegate', 'id'],
      filter: [['delegate', '=', 'Asil'], 'and', ['status', '=', DataStatus[DataStatus.Active]]]
    }).load().then(res => {
      this.royalPersonnelCount = res.length;
    })
  }

}
