import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Feedback, ContactType } from "../shared/feedback";
import { flyInOut, visibility } from "../animations/app.animation";
import { FeedbackService } from '../services/feedback.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  errMess: string;
  feedbackcopy: Feedback;
  visibility = 'hidden';
  feedback: Feedback;
  contactType = ContactType;
  waitingForResponse = false;
  isHidden = false;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
 };

  validationMessages = {
    'firstname': {
      'required': 'First name is required',
      'minlength': 'First name must be at least 2 characters long',
      'maxlength': 'First name cannot be more than 25 characters'
    },
    'lastname': {
      'required': 'Last name is required',
      'minlength': 'Last name must be at least 2 characters long',
      'maxlength': 'Last name cannot be more than 25 characters'
    },
    'telnum': {
      'required': 'Tel.number is required',
      'pattern': 'Tel- number must contain only numbers'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute) {
    this.createForm();

   }

  ngOnInit() {
    // this.route.params
    //   .pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.feedbackService.getFeedback(params['id']);}))
    //   .subscribe(feedback => { this.feedback = feedback; this.feedbackcopy = feedback; this.visibility = 'shown'; },
    //   errmess => this.errMess = <any>errmess);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

 onSubmit() {
   this.waitingForResponse = true;
   this.isHidden = true;
   this.feedback = this.feedbackForm.value;
  //  {firstname: "Maris", lastname: "Pulk", telnum: "0000", email: "marispulk@gmail.com", agree: true, …} - this.feedback võrdub see sisu
   console.log(this.feedback);

   this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedbackResponse => {
        this.waitingForResponse = false;
        this.feedback = feedbackResponse;
        this.visibility = 'shown';
        setTimeout(() => {
          this.visibility = 'hidden';
          this.isHidden = false;
        }, 5000)

      });
   this.feedbackFormDirective.resetForm();
   this.feedbackForm.reset({
     firstname: '',
     lastname: '',
     telnum: 0,
     email: '',
     agree: false,
     contacttype: 'None',
     message: ''
   });
 }
}
