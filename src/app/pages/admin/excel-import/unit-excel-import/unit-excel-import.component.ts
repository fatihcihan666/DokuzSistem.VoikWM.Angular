import { Component, OnInit } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import * as XLSX from 'xlsx';
import { ExcelUnitItem } from "src/app/core/models/dto/unit-excel-import-dto";
import { ExcelUnitDto } from "src/app/core/models/dto/unit-excel-list-dto";
import { ApiStoreService } from "src/app/core/services/api-store-service";



@Component({
    selector: 'app-unit-excel-import',
    templateUrl: './unit-excel-import.component.html',
    styleUrls: ['./unit-excel-import.component.css']
})


export class UnitExcelImportComponent implements OnInit {

    data: any[] = [];
    headers: any[] = [];

    excelUnitArray = new Array();
    excelUnitItemDto: ExcelUnitItem = new ExcelUnitItem();
    excelUnitDto: ExcelUnitDto = new ExcelUnitDto();

    saveButtonDisabled: boolean = true;
    myExcel!: Observable<any>;



    //#region Unit Excel Example
    BirimAd!: string;
    BirimKod!: string;
    BagliBirimKod!: string;

    unitExcelExample = [
        { BirimAd: 'Genel Müdür', BirimKod: 'GM', BagliBirimKod: '-' },
        { BirimAd: 'Halkla İlişkiler', BirimKod: 'Hİ', BagliBirimKod: 'GM' },
        { BirimAd: 'Pazarlama', BirimKod: 'PAZ', BagliBirimKod: 'GM' },
        { BirimAd: 'İnsan Kaynakları', BirimKod: 'İK', BagliBirimKod: 'GM' },
        { BirimAd: 'Lojistik', BirimKod: 'LOJ', BagliBirimKod: 'GM' },
    ];

    //#endregion


    ngOnInit(): void {

    }

    constructor(private apiStoreService: ApiStoreService) { }

    fileExcelUpload(event: any) {
        const file: any = (event.target as HTMLInputElement).files?.item(0);
        const target: DataTransfer = <DataTransfer>(event.target);
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
        // event.target.value = '';
    }



    readFile(file: File, subscriber: Subscriber<any>) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            subscriber.next(fileReader.result);
            subscriber.complete();
        }
        fileReader.onerror = (error) => {
            subscriber.error(error);
            subscriber.complete();
        }
    }

    saveUnitExcel() {
        this.data.forEach(element => {
            this.excelUnitItemDto = new ExcelUnitItem();
            this.excelUnitItemDto.unitName = element[0]
            this.excelUnitItemDto.unitCode = element[1]
            this.excelUnitItemDto.relatedUnitCode = element[2]
            this.excelUnitArray.push(this.excelUnitItemDto)
        });
        debugger;
        console.log(this.excelUnitDto);
        this.excelUnitDto.excelUnitItems = this.excelUnitArray;
        this.apiStoreService.generateODataStore('Unit/UnitExcelUpload').insert(this.excelUnitDto).then(res => {

        })
    }

    excelExport() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.unitExcelExample);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Birimler');
        XLSX.writeFile(wb, 'ornek-birim-listesi.xlsx');
    }



    // convertToBase64(file: File) {
    //     this.myExcel = new Observable((subscriber: Subscriber<any>) => {
    //         this.readFile(file, subscriber)
    //     });
    //     this.myExcel.subscribe((data) => {
    //         this.myExcel = data;
    //         this.saveUnitExcel();
    //     });
    // }


}
