import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUserPlus, heroXCircle } from '@ng-icons/heroicons/outline';
import { UtilService } from '../../service/util.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-expenditure-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIconComponent, DropdownComponent],
  providers: [provideIcons({ heroUserPlus, heroXCircle }), UtilService],
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
      expenditureName: this.fb.control<string>(''),
      usernames: this.fb.array([this.fb.control('')])
    })
  }

  get usernames() {
    return this.form.get('usernames') as FormArray;
  }

  addUser() {
    this.usernames.push(this.fb.control(''));
  }

  deleteUser(index: number) {
    this.usernames.removeAt(index);
  }

  onSubmit(): void {
    // console.log(this.form.get("expenditureName")?.value);
    console.log(this.usernames.length);
    for (let index = 0; index < this.usernames.length; index++) {
      const val = this.usernames.at(index).value
      console.log(val);
    }
    console.log(
      this.utilSvc.generateSecureRandomString(25)
    );
  }
}
