import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Entry } from './entry.model';
import { EntryService } from './entry.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entry',
    templateUrl: './entry.component.html'
})
export class EntryComponent implements OnInit, OnDestroy {
entries: Entry[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private entryService: EntryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.entryService.query().subscribe(
            (res: ResponseWrapper) => {
                this.entries = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEntries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Entry) {
        return item.id;
    }
    registerChangeInEntries() {
        this.eventSubscriber = this.eventManager.subscribe('entryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
