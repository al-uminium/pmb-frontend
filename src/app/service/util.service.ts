import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  generateSecureRandomString(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += characters.charAt(randomValues[i] % charactersLength);
    }
    return result;
  }
  
  getUsers(arr: FormArray): string[] {
    const userArray = new Array<string>; 

    for (let index = 0; index < arr.length; index++) {
      const val = arr.at(index).value as string
      if (val.length > 0) {
        userArray.push(val);
      }
    }
    
    return userArray
  }  
  constructor() { }
}
