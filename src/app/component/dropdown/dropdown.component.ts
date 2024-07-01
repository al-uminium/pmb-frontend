import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit{
  @Input()
  value!: string;

  @Input()
  values!: string[];

  @Output()
  valueChange!: EventEmitter<string>;

  showDropdown: boolean = false;

  ngOnInit(): void {
    this.valueChange = new EventEmitter<string>();
  }

  selectVal(value: string){
    this.valueChange.emit(value);
    this.value = value;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}
