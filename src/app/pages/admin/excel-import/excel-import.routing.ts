import { Routes } from "@angular/router";
import { AuthGuardService } from "src/app/core/services/auth-guard.service";
import { JobDefinitionExcelImportComponent } from "./job-definition-excel-import/job-definition-excel-import.component";
import { PersonnelExcelImportComponent } from "./personnel-excel-import/personnel-excel-import.component";
import { PersonnelUnitExcelImportComponent } from "./personnel-unit-excel-import/personnel-unit-excel-import.component";
import { RegisterExcelImportComponent } from "./register-excel-import/register-excel-import.component";
import { TitleExcelImportComponent } from "./title-excel-import/title-excel-import.component";
import { UnitExcelImportComponent } from "./unit-excel-import/unit-excel-import.component";



export const ExcelImportRoutes: Routes = [
    {
        path: 'birim-excel-aktarim',
        component: UnitExcelImportComponent,
        data: { title: 'Bİrİm Aktarım', breadcrumb: ['Ana Sayfa', 'Excel Aktarım', 'Birim Aktarım'] },
        canActivate: [AuthGuardService]
    },
    {
        path: 'is-tanimi-excel-aktarim',
        component: JobDefinitionExcelImportComponent,
        data: { title: 'İş Tanımı Aktarım', breadcrumb: ['Ana Sayfa', 'Excel Aktarım', 'İş Tanımı Aktarım'] },
        canActivate: [AuthGuardService]
    },
    {
        path: 'unvan-excel-aktarim',
        component: TitleExcelImportComponent,
        data: { title: 'Unvan Aktarım', breadcrumb: ['Ana Sayfa', 'Excel Aktarım', 'Unvan Aktarım'] },
        canActivate: [AuthGuardService]
    },
    {
        path: 'sicil-kayit-excel-aktarim',
        component: RegisterExcelImportComponent,
        data: { title: 'Sicil Kayıt Aktarım', breadcrumb: ['Ana Sayfa', 'Excel Aktarım', 'Sicil Kayit Aktarım'] },
        canActivate: [AuthGuardService]
    },
    {
        path: 'personel-kayit-excel-aktarim',
        component: PersonnelExcelImportComponent,
        data: { title: 'Personel Kayıt Aktarım', breadcrumb: ['Ana Sayfa', 'Excel Aktarım', 'Personel Kayit Aktarım'] },
        canActivate: [AuthGuardService]
    },
    {
        path: 'personel-birim-excel-aktarim',
        component: PersonnelUnitExcelImportComponent,
        data: { title: 'Personel Birim Aktarım', breadcrumb: ['Ana Sayfa', 'Excel Aktarım', 'Personel Birim Kayit Aktarım'] },
        canActivate: [AuthGuardService]
    },
]