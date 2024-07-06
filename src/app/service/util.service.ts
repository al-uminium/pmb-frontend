import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { User } from '../classes/user';

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

  getExpenseSplit(arr: FormArray, users: User[]): Map<string, number> {
    const expenseSplit = new Map<string, number>;

    for (let i = 0; i < arr.controls.length; i++) {
      const debt = arr.controls[i];
      const user = users[i];

      expenseSplit.set(user.userName, debt.value);
    }
    return expenseSplit;
  }
  
  getUsersFromForm(arr: FormArray): User[] {
    const userArray = new Array<User>; 

    for (let index = 0; index < arr.length; index++) {
      const val = arr.at(index).value as string
      if (val.length > 0) {
        const newUser = new User(val);
        userArray.push(newUser);
      }
    }
    return userArray
  }  

  getUsersFromBackend(obj: Object) {
    
  }
  

}
