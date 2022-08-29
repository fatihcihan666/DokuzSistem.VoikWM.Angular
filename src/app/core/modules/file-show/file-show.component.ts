import { Component, Output, Input, EventEmitter } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-show',
  templateUrl: './file-show.component.html',
    styles: [`
    .background {
        background-repeat: no-repeat;
        background-attachment: inherit;
        background-size: auto 100%;
        background-position: center;
        height: -webkit-fill-available;
        z-index: 2;
    }
    .img-default {
        max-height: 95vh;
        max-width: 95vw;
    }
    `]
})

export class FileShowComponent {
    popupVisible: boolean = false;

    imageContent!: string;
    pdfBlobUri!: string;

    width!: string;
    height!: string;

    selectedValue: string | null = null;
    @Output() valueChange = new EventEmitter();
    @Input()
    get value(): string | null { return this.selectedValue; }
    set value(val: string | null) {
        this.selectedValue = val;
        if (!this.selectedValue) {
            this.popupVisible = false;
            this.extensionChange.emit(null);
        } else {
            this.checkExtension();
            this.popupVisible = true;
        }
        this.valueChange.emit(this.selectedValue);
    };

    selectedExtension: string | null = null;
    @Output() extensionChange = new EventEmitter();
    @Input()
    get extension(): string | null { return this.selectedExtension; }
    set extension(val: string | null) {
        this.selectedExtension = val;
        this.extensionChange.emit(this.selectedExtension);
        this.checkExtension();
    };

    @Input() title: string = 'Dosya Gösterim';

    constructor() { }

    checkExtension() {
        if (!this.selectedExtension) {
            this.popupVisible = false;
        } else if (this.selectedExtension.indexOf('png') >= 0 || this.selectedExtension.indexOf('jpg') >= 0 || this.selectedExtension.indexOf('jpeg') >= 0) {
            const img = new Image();
            this.selectedValue ? img.src = `${environment.imagePath}/q_65,w_600/${this.selectedValue}` : null;
            img.onload = () => {
                if (img.height > window.innerHeight) {
                    this.height = (window.innerHeight + 110) + 'px';
                    this.width = (((window.innerHeight / img.height) * img.width) + 50) + 'px';
                    this.imageContent = `${environment.imagePath}/q_65,w_600/${this.selectedValue}`;
                } else {
                    this.height = (img.height + 110) + 'px';
                    this.width = (img.width + 50) + 'px';
                    this.imageContent = `${environment.imagePath}/q_65,w_600/${this.selectedValue}`;
                }
            }
            this.pdfBlobUri = '';
        } else {
            notify('Bu dosya formatı henüz desteklenmemektedir.', 'error',6000);
        }
    }

    close() {
        this.imageContent = '';
        this.pdfBlobUri = '';
        this.selectedValue = null;
        this.selectedExtension = null;
        this.valueChange.emit(this.selectedValue);
        this.extensionChange.emit(this.selectedExtension);
    }
}