import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';

import {
  InitiafyButtonModule,
  InitiafyIconModule,
  InitiafySearchBarModule,
  InitiafyCardModule,
  InitiafyActionButtonModule
} from 'design-system-initiafy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  GridComponent,
  ColorsComponent,
  TypographyComponent,
  ButtonsComponent,
  ActionsComponent,
  IconsComponent,
  AlertsComponent,
  MessagesComponent,
  HelpersComponent,
  DashboardComponent,
  StructureComponent
} from './sections';
import { DocumentationService } from './core';
import {
  HeaderComponent,
  FooterComponent,
  ContentComponent,
  DocumentationComponent,
  CodeComponent
} from './shared';
import { SearchBarComponent } from './sections/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './shared/data-table/data-table.component';
import { MatPaginatorModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { ExpansionPanelComponent } from './shared/expansion-panel/expansion-panel.component';

export function startupServiceFactory(
  startupService: DocumentationService
): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ColorsComponent,
    TypographyComponent,
    ButtonsComponent,
    ActionsComponent,
    IconsComponent,
    AlertsComponent,
    MessagesComponent,
    HelpersComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    StructureComponent,
    ContentComponent,
    DocumentationComponent,
    CodeComponent,
    SearchBarComponent,
    DataTableComponent,
    ExpansionPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InitiafyButtonModule,
    InitiafyIconModule,
    InitiafySearchBarModule,
    InitiafyCardModule,
    InitiafyActionButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTooltipModule,
    LayoutModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false
        }
      }
    })
  ],
  providers: [
    DocumentationService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [DocumentationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
