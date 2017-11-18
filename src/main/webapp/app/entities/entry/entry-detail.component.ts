import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Entry } from './entry.model';
import { EntryService } from './entry.service';

@Component({
    selector: 'jhi-entry-detail',
    templateUrl: './entry-detail.component.html'
})
export class EntryDetailComponent implements OnInit, OnDestroy {

    entry: Entry;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private entryService: EntryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEntries();
    }

    load(id) {
        this.entryService.find(id).subscribe((entry) => {
            this.entry = entry;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEntries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'entryListModification',
            (response) => this.load(this.entry.id)
        );
    }
}
