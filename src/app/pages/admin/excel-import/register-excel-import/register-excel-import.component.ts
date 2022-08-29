import { Component, OnInit } from "@angular/core";
import { ExcelRegisterItem } from "src/app/core/models/dto/register-excel-import-dto";
import { ExcelRegistertDto } from "src/app/core/models/dto/register-excel-list-dto";
import { ApiStoreService } from "src/app/core/services/api-store-service";
import * as XLSX from 'xlsx';



@Component({
    selector: 'app-register-excel-import',
    templateUrl: './register-excel-import.component.html',
    styleUrls: ['./register-excel-import.component.css']
})

export class RegisterExcelImportComponent implements OnInit {


    //#region File Upload
    data: any[] = [];
    headers: any[] = [];
    //#endregion

    saveButtonDisabled: boolean = true;

    excelRegisterArray = new Array();
    excelRegisterItemDto: ExcelRegisterItem = new ExcelRegisterItem();
    excelRegisterDto: ExcelRegistertDto = new ExcelRegistertDto();



    //#region Register Excel Example

    AdSoyad!: string;
    TcNo!: string;
    DogumTarihi!: string;

    registerExcelExample = [
        { AdSoyad: 'Okan Bozok', TcNo: '12312312311', DogumTarihi: '03.05.1994' },
        { AdSoyad: 'Fatih Cihan', TcNo: '12312312322', DogumTarihi: '15.05.1993' },
        { AdSoyad: 'Haktan Akdag', TcNo: '12312312333', DogumTarihi: '12.05.1987' },
        { AdSoyad: 'Hakan Öz', TcNo: '12312312344', DogumTarihi: '21.05.1995' },
        { AdSoyad: 'İrem Akın', TcNo: '12312312345', DogumTarihi: '27.05.1990' },
        { AdSoyad: 'Melis Akay', TcNo: '12312312346', DogumTarihi: '01.05.1991' },
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
        // file.target.value = '';
    }

    excelExport() {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.registerExcelExample);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sicil Kayıt');
        XLSX.writeFile(wb, 'ornek-sicil-kayit-listesi.xlsx');
    }

    saveRegisterExcel() {
        this.data.forEach(element => {
            this.excelRegisterItemDto = new ExcelRegisterItem();
            this.excelRegisterItemDto.fullName = element[0]
            this.excelRegisterItemDto.identificationNumber = element[1]
            this.excelRegisterItemDto.dateOfBirth = element[2]           

            this.excelRegisterArray.push(this.excelRegisterItemDto)
        });

      

        this.excelRegisterDto.excelRegisterItems = this.excelRegisterArray;
        console.log(this.excelRegisterDto);
        this.apiStoreService.generateODataStore('Register/RegisterExcelUpload').insert(this.excelRegisterDto).then(res => {

        })
    }


}
