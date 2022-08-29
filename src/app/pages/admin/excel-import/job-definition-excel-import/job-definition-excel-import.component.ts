import { Component, OnInit } from "@angular/core";
import { ExcelJobDefinitionItem } from "src/app/core/models/dto/job-definition-excel-import-dto";
import { ExcelJobDefinitiontDto } from "src/app/core/models/dto/job-definition-excel-list-dto";
import { ApiStoreService } from "src/app/core/services/api-store-service";
import * as XLSX from 'xlsx';



@Component({
    selector: 'app-job-definition-excel-import',
    templateUrl: './job-definition-excel-import.component.html',
    styleUrls: ['./job-definition-excel-import.component.css']
})

export class JobDefinitionExcelImportComponent implements OnInit {

    //#region File Upload
    data: any[] = [];
    headers: any[] = [];
    //#endregion 

    excelJobDefinitionArray = new Array();

    excelJobDefinitionItemDto: ExcelJobDefinitionItem = new ExcelJobDefinitionItem();
    excelJobDefinitionDto: ExcelJobDefinitiontDto = new ExcelJobDefinitiontDto();

    saveButtonDisabled: boolean = true;


    //#region Job Definition Excel Export Example 

    BirimKodu!: string;
    IsTanimKodu!: string;
    IsTanimi!: string;

    jobDefinitionExcelExample = [
        { BirimKodu: 'Hİ', IsTanimKodu: 'Hİ-1', IsTanimi: '	Basılı Yayınlar ve Diğer Medya Analizleri' },
        { BirimKodu: 'Hİ', IsTanimKodu: 'Hİ-2', IsTanimi: 'İletişim Hatlarını Oluşturma' },
        { BirimKodu: 'PAZ', IsTanimKodu: 'PAZ-1', IsTanimi: 'Reklam ve Halkla İlişkiler Çalışmalarını Yürütmek' },
        { BirimKodu: 'İK', IsTanimKodu: 'İK-1', IsTanimi: 'Cv İnceleme' },
        { BirimKodu: 'İK', IsTanimKodu: 'İK-2', IsTanimi: 'Motivasyon Yönetimi' },
        { BirimKodu: 'LOJ', IsTanimKodu: 'LOJ-1', IsTanimi: 'Ürünleri Sevkiyata Hazır Hale Getirmek' },
        { BirimKodu: 'LOJ', IsTanimKodu: 'LOJ-2', IsTanimi: 'Depo Faaliyetlerinin Koordinasyonu' },
    ];

    //#endregion

    constructor(private apiStoreService: ApiStoreService) { }

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
            this.headers = this.data.splice(0, 1);
            this.saveButtonDisabled = false;
        };
        reader.readAsBinaryString(target.files[0]);
        file.target.value = '';
    }

    excelExport() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.jobDefinitionExcelExample);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Is Tanimi');
        XLSX.writeFile(wb, 'ornek-is-tanimi-listesi.xlsx');
    }

    saveJobDefinitionExcel() {
        this.data.forEach(element => {
            this.excelJobDefinitionItemDto = new ExcelJobDefinitionItem();
            this.excelJobDefinitionItemDto.unitCode = element[0]
            this.excelJobDefinitionItemDto.jobDefinitionCode = element[1]
            this.excelJobDefinitionItemDto.jobDefinitionName = element[2]

            this.excelJobDefinitionArray.push(this.excelJobDefinitionItemDto)
            this.excelJobDefinitionDto.excelJobDefinitionItems = this.excelJobDefinitionArray;
        });
        console.log(this.excelJobDefinitionItemDto);
        this.excelJobDefinitionDto.excelJobDefinitionItems = this.excelJobDefinitionArray;
        this.apiStoreService.generateODataStore('JobDefinition/JobDefinitionExcelUpload').insert(this.excelJobDefinitionDto).then(res => {

        })
    }

}