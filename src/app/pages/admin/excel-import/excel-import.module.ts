import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoreModule } from "src/app/core/modules/core.module";
import { ExcelImportRoutes } from "./excel-import.routing";
import { JobDefinitionExcelImportComponent } from "./job-definition-excel-import/job-definition-excel-import.component";
import { PersonnelExcelImportComponent } from "./personnel-excel-import/personnel-excel-import.component";
import { PersonnelUnitExcelImportComponent } from "./personnel-unit-excel-import/personnel-unit-excel-import.component";
import { RegisterExcelImportComponent } from "./register-excel-import/register-excel-import.component";
import { TitleExcelImportComponent } from "./title-excel-import/title-excel-import.component";
import { UnitExcelImportComponent } from "./unit-excel-import/unit-excel-import.component";


@NgModule({
    declarations: [
        UnitExcelImportComponent,
        TitleExcelImportComponent,
        JobDefinitionExcelImportComponent,
        RegisterExcelImportComponent,
        PersonnelExcelImportComponent,
        PersonnelUnitExcelImportComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(ExcelImportRoutes)
    ]
})

export class ExcelImportModule { }

