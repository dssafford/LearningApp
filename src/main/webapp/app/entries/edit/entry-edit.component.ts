import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Entry} from '../models/entry';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EntryService} from '../services/entry.service';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: '<entry-detail>',
  templateUrl: 'entry-edit.component.html'
})

export class EntryEditComponent implements OnInit {
  entry: Entry;

  constructor(private _entryService: EntryService,
              private _route: ActivatedRoute,
              private _location: Location) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._entryService.getEntry(+params['id'])
        .then(entry => this.entry = entry);
    });
  }

  backToDirectory(event: any) {
    this._location.back();
  }
}
