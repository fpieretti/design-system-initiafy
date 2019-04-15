import { Component, OnInit } from '@angular/core';
import { YesOrNoService, YesOrNoDialogData } from 'design-system-initiafy';

@Component({
  selector: 'app-yes-or-no-documentation',
  templateUrl: './yes-or-no-documentation.component.html',
  styleUrls: ['./yes-or-no-documentation.component.scss']
})
export class YesOrNoDocumentationComponent implements OnInit {
  public componentName = 'YesOrNoDialogComponent';
  public module = 'InitiafyYesOrNoModule';

  constructor(private yesOrNoService: YesOrNoService) { }

  ngOnInit() {
  }

  public handleButtonClick() {
    const config: YesOrNoDialogData = {
      message: 'are you sure?',
      title: '',
      noButtonLabel: 'Cancel',
      yesButtonLabel: 'Yes'
    };
    this.yesOrNoService.show(config).afterClosed().subscribe(result => {
      if (result) {
        alert('you said YES');
      } else {
        alert('you said NO');
      }
    });
  }
}
