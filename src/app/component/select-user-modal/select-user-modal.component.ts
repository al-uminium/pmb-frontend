import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { User } from '../../classes/user';
import { BackendService } from '../../service/backend.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-user-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-user-modal.component.html',
  styleUrl: './select-user-modal.component.css'
})
export class SelectUserModalComponent{
  @Input()
  users!: User[]

  @Output() 
  selectUserEvent: EventEmitter<User> = new EventEmitter<User>;

  selectUser(user: User):void {
    this.selectUserEvent.emit(user);
  }
}
