import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-recovery-information',
  templateUrl: './password-recovery-information.component.html',
  styleUrls: ['./password-recovery-information.component.css']
})
export class PasswordRecoveryInformation implements OnInit {

  constructor(
 
  ) { }

  ngOnInit(): void {
  
  }

}
