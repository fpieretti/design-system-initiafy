import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public componentName = 'SearchBarComponent';
  public module = 'InitiafySearchBarModule';

  collapsed = false;
  constructor() { }

  ngOnInit() {
  }

  search(event) {
    alert(event);
  }

}
