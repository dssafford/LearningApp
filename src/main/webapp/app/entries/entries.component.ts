import {Component, OnInit} from '@angular/core';
import {Entry} from './models/entry';
import {EntryService} from './services/entry.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'entry.component.html'
})

export class EntrysComponent implements OnInit {
  title = 'Entry Directory';
  entries: Entry[];

  constructor(private _entryService: EntryService,
              private _router: Router) {
  }

  getEntrys() {
    this._entryService.getEntrys()
      .then(entries => this.entries = entries);
  }

  ngOnInit() {
    this.getEntrys();
  }

  deleteEntry(entry: Entry) {
    this._entryService.removeEntry(entry);
  }

  goToEdit(id: number) {
    this._router.navigate(['/edit/' + id]);
  }

  goToAdd() {
    this._router.navigate(['/add']);
  }
}
