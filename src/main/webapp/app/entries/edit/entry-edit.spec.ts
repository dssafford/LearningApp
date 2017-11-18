import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser';

import { EntryService } from '../../../app/entries/services/entry.service';
import { EntryEditComponent } from '../../../app/entries/edit/entry-edit.component';
import { Entry } from '../../../app/entries/models/entry';

describe('Entry Edit Component Tests', () => {
    let comp: EntryEditComponent;
    let fixture: ComponentFixture<EntryEditComponent>;
    let entryServiceMock: any;
    let routerMock: any;
    let entryMock: Entry;
    let locationMock: any;
    let locationSpy: any;

    beforeEach(async(() => {
        entryMock = new Entry();
        entryMock.category = 'John';
        entryMock.machine = 'Doe';
        entryMock.project = '111-222-3344';
        entryMock.comments = 'jdoe@test.com';

        routerMock = {
            navigate: jasmine.createSpy('navigate')
        };

        locationMock = {
            back: jasmine.createSpy('back')
        };

        entryServiceMock = {
            getEntry: jasmine.createSpy('getEntry')
                .and.returnValue(Promise.resolve(entryMock))
        };

        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule.withRoutes([]),
                    FormsModule
                ],
                declarations: [EntryEditComponent],
                providers: [
                    { provide: EntryService, useValue: entryServiceMock },
                    { provide: Location, useValue: locationMock },
                    { provide: Router, useValue: routerMock },
                    {
                        provide: ActivatedRoute,
                        useValue: {
                            params: {
                                subscribe: (fn: (value: Data) => void) => fn({
                                    id: 1
                                })
                            }
                        }
                    }
                ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(EntryEditComponent);
                comp = fixture.componentInstance;
                locationSpy = TestBed.get(Location);
            });
    }));

    it('should fetch an entry object on init', async(() => {
        comp.ngOnInit();
        fixture.whenStable()
            .then(() => {
                expect(comp.entry).toBeDefined();
                expect(comp.entry.category).toBe('John');
                expect(comp.entry.machine).toBe('Doe');
            });
    }));

    it('should navigate to the entry list page', () => {
        comp.backToDirectory({});
        fixture.whenStable()
            .then(() => expect(locationSpy.back).toHaveBeenCalled());
    });
});
