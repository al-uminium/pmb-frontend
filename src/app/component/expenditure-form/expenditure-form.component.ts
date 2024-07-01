import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserPlus, heroXCircle, heroXMark } from '@ng-icons/heroicons/outline';
import { UtilService } from '../../service/util.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-expenditure-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIconComponent, DropdownComponent],
  providers: [provideIcons({ heroUserPlus, heroXCircle, heroXMark }), UtilService],
  templateUrl: './expenditure-form.component.html',
  styleUrl: './expenditure-form.component.css'
})
export class ExpenditureFormComponent implements OnInit{

  private readonly fb = inject(FormBuilder);
  form!: FormGroup
  utilSvc: UtilService = new UtilService;
  defCurrencies: string[] = ["USD", "EUR", "GBP", "SGD"];

  ngOnInit(): void {
    this.form = this.fb.group({
      expenditureName: this.fb.control<string>('', Validators.required),
      usernames: this.fb.array([this.fb.control('', Validators.required)]),
      selectedCurrency: this.fb.control<string>('', Validators.required)
    })
  }

  get usernames() {
    return this.form.get('usernames') as FormArray;
  }

  addUser() {
    this.usernames.push(this.fb.control('', Validators.required));
  }

  deleteUser(index: number) {
    this.usernames.removeAt(index);
  }

  setCurrency(curr: string){
    this.form.controls['selectedCurrency'].setValue(curr);
  }

  onSubmit(): void {
    const expenditureName = this.form.get('expenditureName')?.value;
    const userArray = new Array;
    const currency = this.form.get('selectedCurrency')?.value;
    for (let index = 0; index < this.usernames.length; index++) {
      const val = this.usernames.at(index).value as string
      if (val.length > 0) {
        userArray.push(val);
      }
    }
    console.log(expenditureName, userArray, currency);
    // console.log(this.utilSvc.generateSecureRandomString(25));
  }
}
