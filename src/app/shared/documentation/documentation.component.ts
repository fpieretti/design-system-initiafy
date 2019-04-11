import { Component, OnInit, Input } from '@angular/core';
import {
  DocumentationService,
  Child,
  Type
} from 'src/app/core/documentation/documentation.service';
import {
  DataColumnMode,
  DataTableSettings
} from '../data-table/data-table.component';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  @Input() componentName: string;
  @Input() module: string;
  @Input() codeTitle: string;
  public get inputDataTableSettings(): DataTableSettings<Child> {
    return ({
      displayedColumns: [
        'name',
        'type',
        'defaultValue',
        'comment'
      ],
      dataSource: this.inputs,
      columnDefinitions: [
        {
          columnName: 'name',
          title: 'Name'
        },
        {
          columnName: 'type',
          title: 'Type',
          mode: DataColumnMode.transformer,
          transformer: (item: Child) => this.getTypeString(item.type)
        },
        {
          columnName: 'defaultValue',
          title: 'Default Value'
        },
        {
          columnName: 'comment',
          title: 'Description',
          mode: DataColumnMode.transformer,
          transformer: (item: Child) =>
            item.comment ? item.comment.shortText : null
        }
      ]
    });
  }
  public get outputDataTableSettings(): DataTableSettings<Child> {
    return ({
      displayedColumns: [
        'name',
        'type',
        'typeArguments',
        'comment'
      ],
      dataSource: this.inputs,
      columnDefinitions: [
        {
          columnName: 'name',
          title: 'Name'
        },
        {
          columnName: 'type',
          title: 'Type',
          mode: DataColumnMode.transformer,
          transformer: (item: Child) => this.getTypeString(item.type)
        },
        {
          columnName: 'typeArguments',
          title: 'Type Arguements',
          mode: DataColumnMode.transformer,
          transformer: (item: Child) => this.getArguementString(item.type)
        },
        {
          columnName: 'comment',
          title: 'Description',
          mode: DataColumnMode.transformer,
          transformer: (item: Child) =>
            item.comment ? item.comment.shortText : null
        }]
    });
  }
  public get twoWayDataTableSettings(): DataTableSettings<Child> {
    return ({
      displayedColumns: ['name', 'type', 'comment'
      ],
      dataSource: this.inputs,
      columnDefinitions: [
        {
          columnName: 'name',
          title: 'Name'
        },
        {
          columnName: 'type',
          title: 'Type',
          mode: DataColumnMode.transformer,
          transformer: (item: Child) => this.getTwoWayTypeString(item)
        },
        {
          columnName: 'comment',
          title: 'Description',
          mode: DataColumnMode.transformer,
          transformer: (item: Child) =>
            item.comment ? item.comment.shortText : null
        }]
    });
  }
  public selector = '';
  public properties: Child[] = [];
  public inputs: MatTableDataSource<Child> = new MatTableDataSource();
  public outputs: MatTableDataSource<Child> = new MatTableDataSource();
  public twoWayBound: MatTableDataSource<Child> = new MatTableDataSource();
  public methods: Child[] = [];
  public constructors: Child[] = [];
  private componentDocs: Child;

  constructor(
    private documentationService: DocumentationService
  ) { }

  ngOnInit() {
    this.componentDocs = this.documentationService.getDocs(this.componentName);
    if (!this.componentDocs) {
      console.error(
        `No doumentation found for the supplied Component Name of "${
        this.componentName
        }"`
      );
    }
    this.properties = [];
    this.methods = [];
    this.constructors = [];
    const twoWayBoundData = [];
    const { children } = this.componentDocs;
    children.forEach(e => {
      if (e.kindString === 'Property') {
        this.properties.push(e);
      } else if (e.kindString === 'Method') {
        this.methods.push(e);
      } else if (e.kindString === 'Constructor') {
        this.constructors.push(e);
      } else if (
        e.kindString === 'Accessor' &&
        e.getSignature &&
        e.setSignature
      ) {
        twoWayBoundData.push(e);
      }
    });
    this.twoWayBound.data = twoWayBoundData;
    const inputData = [];
    const outputData = [];
    this.properties.forEach(e => {
      if (e.decorators && e.decorators.some(z => z.name === 'Input')) {
        inputData.push(e);
      } else if (e.decorators && e.decorators.some(z => z.name === 'Output')) {
        outputData.push(e);
      }
    });
    this.outputs.data = outputData;
    this.inputs.data = inputData;
    const { obj } = this.componentDocs.decorators[0].arguments;
    const escaped = this.jsonEscape(obj);
    const parsed = JSON.parse(escaped);
    this.selector = parsed.selector;
  }
  jsonEscape(str: string): string {
    return str
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/'/g, '"')
      .replace(/:/g, '":')
      .replace(/  /g, ' "');
  }
  getTypeString(type: Type): string {
    if (type.name) {
      return type.name;
    }
    let str = '';
    type.types.forEach((element, index) => {
      if (index > 0) {
        str = str + ' | ';
      }
      str = str + '"' + element.value + '"';
    });
    return str;
  }
  getArguementString(type: Type): string {
    let str = '';
    type.typeArguments.forEach((element, index) => {
      if (index > 0) {
        str = str + ', ';
      }
      str = str + element.name;
    });
    return str;
  }
  getTwoWayTypeString(obj: Child) {
    return obj.getSignature[0].type.name;
  }
}
