import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { User } from 'src/app/core/models/entities/users/user.model';
import { ApiStoreService } from 'src/app/core/services/api-store-service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agreement-accepted',
  templateUrl: './agreement-accepted.component.html',
  styleUrls: ['./agreement-accepted.component.css'],

})


export class AgreementAcceptedComponent implements OnInit {
  constructor(private authService: AuthService, private apiStoreService: ApiStoreService, private router: Router,private fileUploadService:FileUploadService) { 
  }
  user:User = new User();
  environment = environment;
  uploadFiles: any[] = [];

  ngOnInit(): void {

  
  }

  // fileDownload(file: any) {
  //   const blobData = this.fileUploadService.convertBase64ToBlobData(file.base64, file.contentType);

  //   if (window.navigator && window.navigator.msSaveOrOpenBlob) { //IE
  //       window.navigator.msSaveOrOpenBlob(blobData, file.description);
  //   } else { // chrome
  //     const blob = new Blob([blobData], { type: file.contentType });
  //     const url = window.URL.createObjectURL(blob);
  //     // window.open(url);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = file.description;
  //     link.click();
  //   }
  // }

  acceptance(){
        this.authService.getLoginUser().subscribe(res => {

          this.apiStoreService.storeUser.byKey(res.userId).then( userRes => {

            this.user.id = userRes.id;
            this.user.isTheAgreementAccepted = true;
               this.apiStoreService.storeUser.update(this.user.id,this.user).then(res => {
                this.router.navigateByUrl('/yonetim');

            })
          })
        })
      }

      
  logout() {
    this.authService.logout();
  }
}


