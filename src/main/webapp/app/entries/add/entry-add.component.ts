import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Entry} from '../models/entry';
import {Router} from '@angular/router';
import {EntryService} from '../services/entry.service';

@Component({
  // templateUrl: 'entry-add.component.html'
})

export class EntryAddComponent implements OnInit {
  title = 'Add New Entry';
  newEntry: Entry;

  constructor(private _entryService: EntryService,
              private _location: Location) {
  }

  ngOnInit() {
    this.newEntry = new Entry();
  }

  saveEntry(event: any) {
    const _this = this;

    this._entryService.addEntry(this.newEntry)
      .then(function () {
        _this._location.back();
      });
  }

  cancelAdd(event: any) {
    this._location.back();
  }

}
