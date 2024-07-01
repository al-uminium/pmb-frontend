import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ heroChevronDown })],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  @Input()
  value!: string;

  @Input()
  values!: string[];

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  showDropdown: boolean = false;

  ngOnInit(): void {

  }

  selectVal(value: string){
    this.valueChange.emit(value);
    this.value = value;
    this.showDropdown = false;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
