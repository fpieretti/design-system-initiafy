import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';
import { MatTooltipModule } from '@angular/material';
import { DebugElement } from '@angular/core';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let debuggerElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ButtonComponent,
        IconComponent
      ],
      imports: [
        MatTooltipModule
      ]
    });
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When testing default classes', () => {

    beforeEach(() => {
      debuggerElement = fixture.debugElement.query(By.css('button'));
    });

    it('should have default button class', () => { 
      expect(debuggerElement.nativeElement.className).toContain('button');
    });
    
    it('should have default design class', () => {
      expect(debuggerElement.nativeElement.className).toContain('main');
    });

  });
  
  describe('When testing icon', () => {
  
    it('should NOT show icon if its variable is empty', () => {
      debuggerElement = fixture.debugElement.query(By.css('initiafy-icon'));
      expect(debuggerElement).toBeFalsy();
    });
  
    it('should show icon if its variable is passed', () => {
      component.icon = 'icon-name';
      fixture.detectChanges();
      debuggerElement = fixture.debugElement.query(By.css('initiafy-icon'));
      expect(debuggerElement).toBeTruthy();
    });
  
    it('should show specific iconFont if its variable is passed', () => {
      component.icon = 'icon-name';
      component.iconFont = 'font-awesome-brand';
      fixture.detectChanges();    
      debuggerElement = fixture.debugElement.query(By.css('initiafy-icon'));
      expect(debuggerElement.context.iconFont).toBe('font-awesome-brand');      
    });
  
    it('should show default iconFont if its variable is empty', () => {
      component.icon = 'icon-name';
      fixture.detectChanges();    
      debuggerElement = fixture.debugElement.query(By.css('initiafy-icon'));
      expect(debuggerElement.context.iconFont).toBe('material-icons');         
    });

  });

  describe('When testing label', () => {

    it('should NOT show label if its variable is empty', () => {
      debuggerElement = fixture.debugElement.query(By.css('span'));
      expect(debuggerElement).toBeNull();
    });

    it('should show label if its variable is passed', () => {
      component.label = 'Button Label';
      fixture.detectChanges();
      debuggerElement = fixture.debugElement.query(By.css('span'));
      expect(debuggerElement.nativeElement.textContent).toBeTruthy();
    });

    it('should be a single button if label variable is empty', () => {
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.nativeElement.className).toContain('single');      
    });

    it('should NOT be a single button if label variable is passed', () => {
      component.label = 'Button Label';
      fixture.detectChanges();
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.nativeElement.className).not.toContain('single');      
    });

  });

  describe('When testing tooltip', () => {

    it('should NOT show tooltip if its variable is empty', () => {
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.componentInstance.tooltip).toBeUndefined();      
    });
    
    it('should show tooltip if its variable is passed', () => {
      component.tooltip = 'Button Tooltip';
      fixture.detectChanges();
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.componentInstance.tooltip).toBe('Button Tooltip');      
    });

  });

  describe('When testing state', () => {

    it('should be disabled if disable variable is passed as true', () => {
      component.disabled = true;
      fixture.detectChanges();
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.nativeElement.disabled).toBeTruthy();
    });

    it('should be enabled if disabled variable is passed as false', () => {
      component.disabled = false;
      fixture.detectChanges();
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.nativeElement.disabled).toBeFalsy();
      
    });

    it('should be enabled if disabled variable is empty', () => {
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.nativeElement.disabled).toBeFalsy();      
    });

  });

  describe('When testing type', () => {

    it('should have default type if variable is empty', () => {
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.nativeElement.type).toBe('submit');
    });

    it('should show specific type if variable is passed', () => {
      component.type = 'button';
      fixture.detectChanges();
      debuggerElement = fixture.debugElement.query(By.css('button'));
      expect(debuggerElement.nativeElement.type).toBe('button');
      
    });

  });

  describe('When clicking on the button', () => {

    it('should emit callback', () => {  
      spyOn(component.callback, 'emit');
      debuggerElement = fixture.debugElement.query(By.css('button'));
      debuggerElement.nativeElement.click();
      expect(component.callback.emit).toHaveBeenCalled();
    });

  });

});

