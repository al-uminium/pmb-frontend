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

  getExpenseSplit(arr: FormArray, users: User[]): { [key: string]: number } {
    const expenseSplit = {} as { [key: string]: number };

    for (let i = 0; i < arr.controls.length; i++) {
      const balance = arr.controls[i].value;
      const user = users[i];
      expenseSplit[user.userName] = balance * 1;
      
    }
    return expenseSplit;
  }

  getUsersInvolved(arr: FormArray, users: User[], owner:User): User[] {
    const usersInvolved = new Array<User>;

    for (let i = 0; i < arr.controls.length; i++) {
      const control = arr.controls[i];
      if (control.value > 0 && (users[i].userName != owner.userName)) {
        usersInvolved.push(users[i]);
      }
    }

    return usersInvolved;
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
