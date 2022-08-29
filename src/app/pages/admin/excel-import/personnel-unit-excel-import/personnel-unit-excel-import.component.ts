import { Component, OnInit } from "@angular/core";
import * as XLSX from 'xlsx';



@Component({
    selector: 'app-personnel-unit-excel-import',
    templateUrl: './personnel-unit-excel-import.component.html',
    styleUrls: ['./personnel-unit-excel-import.component.css']
})

export class PersonnelUnitExcelImportComponent implements OnInit {


    saveButtonDisabled: boolean = true;

    //#region File Upload
    data: any[] = [];
    headers: any[] = [];
    //#endregion 

    fullName!: string;
    identitiyNumber!: string;
    dateOfBirth!: string;

    register = [
        { fullName: 'Okan Bozok', identitiyNumber: '12312312311', dateOfBirth: '04.05.1994' },
        { fullName: 'Fatih Cihan', identitiyNumber: '12312312322', dateOfBirth: '04.05.1993' },
        { fullName: 'Haktan Akdag', identitiyNumber: '12312312333', dateOfBirth: '04.05.1987' },
    ];



    constructor() { }

    ngOnInit(): void {

    }

    fileExcelUpload(file: any) {
        const target: DataTransfer = <DataTransfer>(file.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {

            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            console.log(this.data, 'data');
            this.headers = this.data.splice(0, 1);
            console.log(this.headers, 'headers');
        };
        reader.readAsBinaryString(target.files[0]);
        file.target.value = '';
    }

    excelExport() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.register);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sicil Kayıt');
        XLSX.writeFile(wb, 'ornek-sicil-kayit-listesi.xlsx');
    }

    savePersonnelUnitExcel() {

    }

}