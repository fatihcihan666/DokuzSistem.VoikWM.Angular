import { Component, Output, Input, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { environment } from 'src/environments/environment';
import { ApiStoreService } from '../../services/api-store-service';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;
  fileName!: string;

  popupValue!: string | null;
  popupExtension!: string | null;
  popupVisible: boolean = false;
  environment = environment;

  selectedValue: string | null = '';
  @Output() valueChange = new EventEmitter<any>();
  @Input()
  get value() { return this.selectedValue; }
  set value(val) {
    this.selectedValue = val;
    if (val) {
      this.fileName = 'Görsel';
    } else {
      this.fileName = '';
    }
  };

  @Input() accept: string = 'image/x-png,image/jpeg,image/jpg';
  @Input() popupTitle: string = 'Görseli Hazırla';
  @Input() required: boolean = false;
  @Input() requiredMessage: string = 'Gerekli';
  @Input() aspectRatio: number = 3 / 4;
  @Input() enableAspectRatio: boolean = false;
  @Input() quality: number = 1;
  @Input() format: 'png' | 'jpeg'| 'bmp' | 'webp' | 'ico' = 'jpeg';
  @Input() popupWidth: number | string = 400;
  @Input() popupHeight: number | string = 527;

  constructor(private apiStoreService: ApiStoreService) {
  }

  clear() {
    this.selectedValue = null;
    this.valueChange.emit(this.selectedValue);
  }

  fileChangeEvent(event: any): void {
    if (event.target.files[0]) {
      this.fileName = event.target.files[0].name;
    }
    this.imageChangedEvent = event;
    this.popupVisible = true;
  }

  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.cropperReady = true;
  }

  saveCroppedImage() {
    this.imageInput.nativeElement.value = '';

    this.base64ImageCompressor(this.croppedImage, this.quality, this.format).then(croppedImage => {
      environment.isLoading = true;
      this.apiStoreService.generateODataStore('docs/images/upload').insert({ image: croppedImage }).then(res => {
        if (res.fileName) {
          this.selectedValue = res.fileName;
          this.valueChange.emit(res.fileName);
          this.popupVisible = false;
          environment.isLoading = false;;
        } else {
          environment.isLoading = false;;
          notify('Yükleme sırasında bir hata oluştu. Resim sisteme yüklenemedi.', 'error', 6000);
        }
      })
    })
  }

  showFile() {
    if (this.selectedValue && this.accept) {
      this.popupValue = this.selectedValue;
      this.popupExtension = this.accept;
    }
  }

  close() {
    if (!this.selectedValue) {
      this.fileName = '';
    }
    this.imageInput.nativeElement.value = '';
    this.popupVisible = false;
  }

  base64ImageCompressor(img: string, quality?: number, type?: string): Promise<string> {
    return new Promise(resolve => {
      const image = new Image();
      image.src = img;
      image.onload = () => {
        const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d');

        if (image.width > 1920) {
          const parameter = 1920 / image.width;
          canvas.width = Math.round(parameter * image.width);
          canvas.height = Math.round(parameter * image.height);
        } else {
          canvas.width = image.width;
          canvas.height = image.height;
        }

        if (!type || 'jpg,jpeg'.indexOf(type) > -1) {
          ctx!.fillStyle = 'white'
          ctx?.fillRect(0, 0, canvas.width, canvas.height)
        }

        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        fetch(canvas.toDataURL(`image/${type ? type : 'jpeg'}`, (quality ? quality : 0.5))).then(res => {
          resolve(res.url);
        });
      }
    })
  }

}