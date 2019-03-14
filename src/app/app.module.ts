import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { DesignSystemInitiafyModule, InitiafyButtonModule, InitiafyIconModule } from 'design-system-initiafy';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonService } from './common.service';

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
    CodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InitiafyButtonModule,
    InitiafyIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatExpansionModule,
    MatTableModule,
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
    CommonService,
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
