import {Injectable} from '@angular/core';
import {Entry} from '../models/entry';
import {EMPLOYEES} from '../data/entry-data';

@Injectable()
export class EntryService {
  NEW_ID = 16;
  data = EMPLOYEES;

  constructor() {
  }

  getEntrys(): Promise<Entry[]> {
    return Promise.resolve(this.data);
  }

  getEntry(id: number): Promise<Entry> {
    return Promise.resolve(this.data).then(
      entries => entries.filter(entry => entry.id === id)[0]
    );
  }

  addEntry(entry: Entry): Promise<number> {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const year = today.getFullYear();

    if (!entry.id) {
      entry.id = this.NEW_ID++;
    }

    if (!entry.createDate) {
      entry.createDate = month + '/' + date + '/' + year;
    }

    return Promise.resolve(this.data).then(entries => entries.push(entry));
  }

  removeEntry(entry: Entry): Promise<Entry[]> {
    const index = this.data.indexOf(entry);
    return Promise.resolve(this.data)
      .then(entries => entries.splice(index, 1));
  }
}
