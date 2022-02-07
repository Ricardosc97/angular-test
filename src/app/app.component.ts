import { Component,Input, Output,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { UsersService } from './services/users/users.service';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-test test test';
  jobs: any[] = [];
  users: {name: string, lastNames: string, jobPosition: string, birthDate: number}[] = [
    {name: 'Ricardo', lastNames: 'Silva', jobPosition: 'Develop', birthDate: Date.now()},
    {name: 'Genesis', lastNames: 'Perdigon', jobPosition: 'Develop', birthDate: Date.now()}
  ]
  
  @Output() searchcriteria = new EventEmitter<String>();
  
  constructor(
    public UsersService: UsersService,
    public dialog: MatDialog
  ){}

  async ngOnInit() {
    console.log(this.title);
    this.jobs = await this.UsersService.getJobPositions();
    console.log('this.jobs')
    console.log(this.jobs)   
  }

  /**
   * Add new user to the list
   */
  addUser() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      action: 'add',
    };

    const dialogRef = this.dialog.open(AddEditUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.users.push(data);
      }
    });
  }

  /**
   * Edit user
   * @param index user index in the array
   */
  editUser(index: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      action: 'edit',
      name: this.users[index].name,
      lastNames: this.users[index].lastNames,
      jobPosition: this.users[index].jobPosition,
      birthDate: this.users[index].birthDate,
    };

    const dialogRef = this.dialog.open(AddEditUserComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.users.splice(index,1);
        this.users.push(data);
      }
    });
  }


  /**
   * Delete user by index
   * @param index The user index
   */
  deleteUser(index: number): void{
    this.users.splice(index, 1);
  }

}
