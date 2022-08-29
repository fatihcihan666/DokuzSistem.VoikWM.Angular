import { Component, OnInit } from "@angular/core";
import { ExcelTitleItem } from "src/app/core/models/dto/title-excel-import-dto";
import { ExcelTitletDto } from "src/app/core/models/dto/title-excel-list-dto";
import { ApiStoreService } from "src/app/core/services/api-store-service";
import * as XLSX from 'xlsx';


@Component({
    selector: 'app-title-excel-import',
    templateUrl: './title-excel-import.component.html',
    styleUrls: ['./title-excel-import.component.css']
})

export class TitleExcelImportComponent implements OnInit {

    data: any[] = [];
    headers: any[] = [];
    excelTitleArray: any[] = [];


    excelTitleItemDto: ExcelTitleItem = new ExcelTitleItem();
    excelTitletDto: ExcelTitletDto = new ExcelTitletDto();

    saveButtonDisabled: boolean = true;

    //#region Title Excel Export Example

    UnvanKodu!: string;
    UnvanAdi!: string;

    titleExcelExample = [
        { UnvanKodu: 'CEO', UnvanAdi: 'CEO' },
        { UnvanKodu: 'MUD', UnvanAdi: 'Müdür' },
        { UnvanKodu: 'TEK', UnvanAdi: 'Tekniker' },
        { UnvanKodu: 'SEF', UnvanAdi: 'Şef' },
        { UnvanKodu: 'ISC', UnvanAdi: 'İşçi' },
        { UnvanKodu: 'UZM', UnvanAdi: 'Uzman' },
    ];

    //#endregion

    ngOnInit(): void {

    }

    constructor(private apiStoreService: ApiStoreService) { }

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
            this.headers = this.data.splice(0, 1);
            this.saveButtonDisabled = false;
        };
        reader.readAsBinaryString(target.files[0]);
        // file.target.value = '';
    }

    excelExport() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.titleExcelExample);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Unvanlar');
        XLSX.writeFile(wb, 'ornek-unvan-listesi.xlsx');
    }

    saveTitleExcel() {
        this.data.forEach(element => {
            this.excelTitleItemDto = new ExcelTitleItem();
            this.excelTitleItemDto.titleCode = element[0]
            this.excelTitleItemDto.titleName = element[1]
            this.excelTitleArray.push(this.excelTitleItemDto);
            this.excelTitletDto.excelTitleItems = this.excelTitleArray;
        });
        this.excelTitletDto.excelTitleItems = this.excelTitleArray;
        console.log(this.excelTitletDto);
        this.apiStoreService.generateODataStore('Title/TitleExcelUpload').insert(this.excelTitletDto).then(res => {
        })
    }
}
