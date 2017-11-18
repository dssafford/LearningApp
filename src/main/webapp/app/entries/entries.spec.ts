import { ComponentFixture, TestBed, inject, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'

import { EntryService } from '../../app/entries/services/entry.service';
import { EntrysComponent } from '../../app/entries/entries.component';

describe('Entry Component Tests', () => {
	let comp: EntrysComponent;
	let fixture: ComponentFixture<EntrysComponent>;
	let routerMock: any;
	let entryServiceMock: any;
	let serviceSpy: any;
	let routerSpy: any;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		routerMock = {
			navigate: jasmine.createSpy('navigate')
		};

		entryServiceMock = {
			getEntrys: jasmine.createSpy('getEntrys')
				.and.returnValue(Promise.resolve([{}, {}, {}])),

			removeEntry: jasmine.createSpy('removeEntry')
		};

		TestBed
			.configureTestingModule({
				declarations: [EntrysComponent],
				providers: [
					{ provide: EntryService, useValue: entryServiceMock },
					{ provide: Router, useValue: routerMock }
				]
			})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(EntrysComponent);
				comp = fixture.componentInstance;
				de = fixture.debugElement.query(By.css('table tbody'));
				el = de.nativeElement;

				serviceSpy = TestBed.get(EntryService);
				routerSpy = TestBed.get(Router);
			});
	}));

	it('should fetch the entry list on init', async(() => {
		comp.ngOnInit();
		expect(serviceSpy.getEntrys).toHaveBeenCalled();

		fixture.detectChanges();
		fixture.whenStable()
			.then(() => {
				fixture.detectChanges();
				expect(comp.entries.length).toBe(3);
				expect(el.getElementsByTagName('tr').length).toBe(3);
			});
	}));

	it('should remove entries selected to be deleted', () => {
		comp.deleteEntry(null);
		expect(entryServiceMock.removeEntry).toHaveBeenCalledTimes(1);
	});

	it('should navigate to the edit page', () => {
		comp.goToEdit(55);
		fixture.whenStable()
			.then(() => expect(routerSpy.navigate).toHaveBeenCalledWith(['/edit/55']));
	});

	it('should navigate to the add a new entry page', () => {
		comp.goToAdd();
		fixture.whenStable()
			.then(() => expect(routerSpy.navigate).toHaveBeenCalledWith(['/add']));
	});
});
