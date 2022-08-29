import { Injectable } from '@angular/core';
import { ODataService } from './odata.service';

@Injectable({
  providedIn: 'root',
})
export class ApiStoreService {


  storeLog = this.odataService.generateODataStore('Log');

  //#region Users
  storeUser = this.odataService.generateODataStore('User');
  storeUserOperationClaim = this.odataService.generateODataStore('UserOperationClaim');
  storeOperationClaim = this.odataService.generateODataStore('OperationClaim');
  //#endregion Users

  //#region General Definitions
  storeCity = this.odataService.generateODataStore('City');
  storeDistrict = this.odataService.generateODataStore('District');
  storeUnit = this.odataService.generateODataStore('Unit');
  storePersonnel = this.odataService.generateODataStore('Personnel');
  storeRegister = this.odataService.generateODataStore('Register');
  storeTitle = this.odataService.generateODataStore('Title');
  storeAddress = this.odataService.generateODataStore('Address');
  storeJobDefinition = this.odataService.generateODataStore("JobDefinition");
  storePersonnelUnit = this.odataService.generateODataStore("PersonnelUnit");
  storeJobAnalysis = this.odataService.generateODataStore("JobAnalysis");
  storeStatuRule = this.odataService.generateDataSource("StatuRule");
  //#endregion General Definitions

  constructor(private odataService: ODataService) { }


  public generateODataStore = (
    path: string,
    ...props: any[]
  ) =>
    this.odataService.generateODataStore(
      path,
      'id',
      props
    );

  public generateDataSource = (content: object) =>
    this.odataService.generateDataSource(content);

}
