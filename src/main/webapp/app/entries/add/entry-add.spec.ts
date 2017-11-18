import {ComponentFixture, TestBed, inject, async} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {Entry} from '../../../app/entries/models/entry';
import {EntryService} from '../../../app/entries/services/entry.service';
import {EntryAddComponent} from '../../../app/entries/add/entry-add.component';

describe('Entry Add Component Tests', () => {
  let comp: EntryAddComponent;
  let fixture: ComponentFixture<EntryAddComponent>;
  let entryServiceMock: any;
  let routerMock: any;
  let locationMock: any;
  let locationSpy: any;

  beforeEach(async(() => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    locationMock = {
      back: jasmine.createSpy('back')
    };

    entryServiceMock = {
      addEntry: jasmine.createSpy('addEntry')
        .and.returnValue(Promise.resolve())
    };

    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          FormsModule
        ],
        declarations: [EntryAddComponent],
        providers: [
          {provide: EntryService, useValue: entryServiceMock},
          {provide: Location, useValue: locationMock},
          {provide: Router, useValue: routerMock}
        ]
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EntryAddComponent);
        comp = fixture.componentInstance;
        locationSpy = TestBed.get(Location);
      });
  }));

  it('should create a new entry', () => {
    const entryCount = 0 ;
    const newEntry = new Entry();

    comp.ngOnInit();
    comp.saveEntry(null);

    expect(entryServiceMock.addEntry).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => expect(locationSpy.back).toHaveBeenCalled());
  });

  it('should navigate to the entry list page on cancel', () => {
    comp.cancelAdd(null);
    fixture.whenStable()
      .then(() => expect(locationSpy.back).toHaveBeenCalled());
  });
});
