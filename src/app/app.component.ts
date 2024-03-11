import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PassStatus } from './enums/pass-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Password Validator';

  passForm!: FormGroup;
  passStatus!: number;

  ngOnInit(): void {
    this.setPassFormInitialState();
  }

  submitPassForm(){
    alert(`Your new password is: ${this.passForm.controls['password'].value}`);
  }

  onChangePassInput(){
    let pass = this.passForm.controls['password'].value;
    this.passStatus = this.checkPassword(pass);
  }

  checkPassword(pass: string){
    if(!this.passHasValidLength(pass))
      return PassStatus.LessThan8Chars;

    let hasDigits: boolean = this.passHasDigits(pass);
    let hasSymbols: boolean = this.passHasSymbols(pass);
    let hasLetters: boolean = this.passHasLetters(pass);
    
    if(hasDigits && hasSymbols && hasLetters)
      return PassStatus.Valid;
    else if((hasLetters && hasSymbols) || (hasLetters && hasDigits) || (hasDigits && hasSymbols))
      return PassStatus.TwoSymbolType;
    else 
      return PassStatus.OneSymbolType;
  }

  passHasValidLength(pass: string){
    return pass.length >= 8;
  }

  passHasDigits(pass: string){
    return /[0-9]/.test(pass);
  }

  passHasSymbols(pass: string){
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass);
  }

  passHasLetters(pass: string){
    return /[a-zA-Z]/.test(pass);
  }

  setPassFormInitialState(){
    this.passForm = new FormGroup({
      password: new FormControl(''),
    });
    this.passStatus = PassStatus.None;
  }

  resetForm(){
    this.setPassFormInitialState();
  }
}
