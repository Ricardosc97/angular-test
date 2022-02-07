import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  form: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      jobPosition: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    }
  );
  action: string;
  name: string;
  lastNames: string;
  jobPosition: string;
  birthDate: number;
  title: string;
  test: string = '';
  jobs: any[] = [];

  constructor(
    private fb: FormBuilder,
    public UsersService: UsersService,
    private dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.action = data.action;
    this.name = data.name;
    this.lastNames = data.lastNames;
    this.jobPosition = data.jobPosition;
    this.birthDate = data.birthDate;
    if(this.action == 'add' ){
      this.title = 'Agregar';
    } else{
      this.title = 'Editar';
    }
  }

  async ngOnInit() {
    this.setForm();
    this.jobs = await this.UsersService.getJobPositions();
  }

  setForm() {
    this.form = this.fb.group(
      {
        name: [this.name, [Validators.required]],
        lastNames: [this.lastNames, [Validators.required]],
        jobPosition: [this.jobPosition, [Validators.required]],
        birthDate: [this.birthDate, [Validators.required]],
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  async save(action: string) {
    if (this.action === 'add') {
      this.dialogRef.close({ action, ...this.form.value });
    }
    if (this.action === 'edit') {
      this.dialogRef.close({ action, ...this.form.value });
    }
  }

}
