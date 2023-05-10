import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSubmitted = false;
  roles = [
    { id: 1, title: 'developper' },
    { id: 2, title: 'eq' },
  ];

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    roleId: [1, Validators.required],
    // aliases: new FormArray([]),
    aliases: this.fb.array([]),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this method allowing to react to specific without submitting the whole form
    this.registerForm.get('roleId')?.valueChanges.subscribe((roleId) => {
      console.log('send a request and update the roleId', roleId);
    });
  }

  get aliases() {
    return this.registerForm.get('aliases') as FormArray;
  }

  // this method allowing to add new input
  addAlias() {
    console.log(this.aliases);
    const controls = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.aliases.push(controls);
  }

  onSubmit() {
    console.log('submittedForm', this.registerForm.value);
    console.log('form submitted');
    this.isSubmitted = true;
  }
}
