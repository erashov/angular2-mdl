import { Component, Renderer } from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';
import {
  MdlDialogService,
  MdlDialogReference
} from '../../../lib/components/dialog/index';
import { MdlSnackbarService } from '../../../lib/components/snackbar/mdl-snackbar.service';
import {
  LoginDialogComponent,
  TEST_VALUE
} from './login-dialog.component';


@Component({
  selector: 'dialog-demo',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'dialog.component.html'
})
export class DialogDemo extends AbstractDemoComponent {

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title,
    private dialogService: MdlDialogService,
    private snackbarService: MdlSnackbarService) {

    super(router, route, titleService);

  }

  public showAlert() {
    let result = this.dialogService.alert('This is a simple Alert');
    result.subscribe( () => console.log('alert closed') );
  }

  public showConfirmMessage() {
    let result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
    // if you need booth answers
    result.subscribe( () => {
        console.log('confirmed');
      },
      (err: any) => {
        console.log('declined');
      }
    );
    // if you only need the confirm answer
    result.onErrorResumeNext().subscribe( () => {
      console.log('confirmed 2');
    })
  }

  public showDialogFullWidthAction() {
    let pDialog = this.dialogService.showDialog({
      title: 'Your choice?',
      message: 'What drink do you prefer to your meal?',
      actions: [
        {
          handler: () => {
              this.snackbarService.showToast('Coke');
          },
          text: 'One Coke' ,
          isClosingAction: true
        },
        {
          handler: () => {
            this.snackbarService.showToast('Vine');
          },
          text: 'A bottle of vine'
        },
        {
          handler: () => {
            this.snackbarService.showToast('Beer');
          },
          text: 'A pint of beer'
        }
      ],
      fullWidthAction: true,
      isModal: false
    });
    pDialog.subscribe( (dialogReference) => console.log('dialog visible', dialogReference) );
  }

  public showDialog($event: MouseEvent) {

    let pDialog = this.dialogService.showCustomDialog({
      component: LoginDialogComponent,
      providers: [{provide: TEST_VALUE, useValue: 'Just an example'}],
      isModal: true,
      styles: {'width': '300px'},
      clickOutsideToClose: true,
      openFrom: $event
    });
    pDialog.subscribe( (dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
  }

}
