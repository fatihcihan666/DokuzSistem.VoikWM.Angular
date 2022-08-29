import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiStoreService } from 'src/app/core/services/api-store-service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  date = new Date().getFullYear();

  loginForm!: FormGroup;
  get email(): any { return this.loginForm.get('email') }
  get password(): any { return this.loginForm.get('password') }

  recoveryMail:any;

  errorMessage: any;
  successMessage: any;

  isRequesting = false;
  pwType = 'password';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private apiStoreService:ApiStoreService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.errorMessage = null;
    this.successMessage = null;
    if (this.loginForm.valid) {
      this.isRequesting = true;
      this.authService.login(this.loginForm.value).toPromise().then(res => {


        if (res.token) {
          this.isRequesting = false;
          this.successMessage = 'Başarıyla giriş yapıldı.';
         this.checkTheAgreementAccepted(res);
        } else {
          this.errorMessage = res;
          this.isRequesting = false;
        }
      }, (e) => {  
        this.errorMessage = e.error
        this.isRequesting = false;
      })
    }
  }

  checkTheAgreementAccepted(res:any){
    if(res.isTheAgreementAccepted){
      this.router.navigate(['/yonetim']);
    }else{
      this.router.navigate(['/sozlesme']);
    }
  }

  pay(){
    this.router.navigate(['/odeme']);
  }

  recovery(){

     this.recoveryMail = (<HTMLInputElement>document.getElementById('recoveryMail')).value.toString();
     
    this.apiStoreService.generateODataStore('User/PasswordRecoveryRequest?mail=' + this.recoveryMail).load().then(res => {
      this.router.navigate(['/bilgilendirme']);

    })
  }

}
