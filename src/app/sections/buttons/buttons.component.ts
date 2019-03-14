import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  public title = 'button';
  public componentName = 'ButtonComponent';
  public module = 'InitiafyButtonModule';
  public types = ['ButtonType'];
  constructor() {}
  ngOnInit() {}
}
