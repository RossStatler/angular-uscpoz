import { Component, OnInit } from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-upload',
  template: `
  <div class="example-config">
    <p>Valid: {{ myForm.valid }}</p>
    <p>Submitted: {{ submitted }}</p>
  </div>
  <form [formGroup]="myForm" novalidate (ngSubmit)="save(myForm.value, myForm.valid)">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <label style="display: block; margin: .8em 0 .2em">Username:</label>
          <input type="text" formControlName="uName" class="k-textbox" style="width: 100%" />
          <p style="color: red; font-size: .8em; margin-top: .5em;"
              [hidden]="myForm.controls.uName.valid || (myForm.controls.uName.pristine && !submitted)">
              Username is required and should be minimum 4 characters.
          </p>
          <label style="display: block; margin: .8em 0 .2em">Avatar:</label>
          <kendo-upload
            formControlName="myUpload"
            [saveUrl]="uploadSaveUrl"
            [removeUrl]="uploadRemoveUrl"
            [restrictions]="myRestrictions">
          </kendo-upload>
          <p style="color: red; font-size: .8em; margin-top: .5em;"
              [hidden]="myForm.controls.myUpload.valid || (myForm.controls.myUpload.pristine && !submitted)">
              Uploading an avatar is required.
          </p>
          <button type="submit" class="k-button k-primary" [disabled]=!myForm.valid style="margin: 1em 0;">Submit</button>
        </div>
      </div>
    </div>
  </form>
  `
})
export class UploadComponent implements OnInit {
  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public userName: string;
  public userImages: Array<any>;
  public myForm: FormGroup;
  public submitted = false;
  public myRestrictions: FileRestrictions = {
    allowedExtensions: ['jpg', 'jpeg', 'png']
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      uName: [this.userName, [Validators.required, Validators.minLength(4)]],
      myUpload: [this.userImages, [Validators.required]]
    });

    this.myForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(_data?: any) {
    // handle model changes
  }

  save(_value: any, valid: boolean) {
    this.submitted = true;

    if (valid) {
      console.log('Everything is OK!');
    }
  }
}

