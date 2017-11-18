import { Entry } from '../../../app/entries/models/entry';
import { EntryService } from '../../../app/entries/services/entry.service';
import { MOCK_DATA } from '../../../app/entries/data/mock-data';

describe('Entry Service Tests', () => {
    let entryService = new EntryService();
    entryService.data = MOCK_DATA;

	it('returns a list of entries', () => {
        entryService.getEntrys()
            .then(entries => {
                expect(entries.length).toBeDefined();
                expect(entries.length).toBe(3);
            });
    });

    it('returns a single entry by id', () => {
		let testEntry = (entry: Entry) => {
            expect(entry).toBeDefined();
            expect(entry.category).toBe('Test2');
            expect(entry.machine).toBe('Entry2');
        };

        entryService.getEntry(2)
            .then(testEntry);
    });

    it('add a new entry', () => {
        let newEntry: Entry = new Entry();
        let testNewEntry = (entry: Entry) => {
            expect(entry).toBeDefined();
            expect(entry.category).toBe('John');
            expect(entry.machine).toBe('Doe');
        };

        newEntry.id = 222;
        newEntry.category = 'John';
        newEntry.machine = 'Doe';

        entryService.addEntry(newEntry)
            .then(() => entryService.getEntry(222).then(testNewEntry));
    });

    it('removes an entry', () => {
        let entryCount = 0;

        let postRemoveCallback = () =>
            entryService.getEntrys()
                .then(postEntrys => expect(postEntrys.length).toBe(entryCount - 1));

        let getEntryCallback = (entry: Entry) =>
            entryService.removeEntry(entry)
                .then(postRemoveCallback);

		let preRemoveCallback = (preEntrys: Entry[]) => {
            entryCount = preEntrys.length;

            entryService.getEntry(1)
                .then(getEntryCallback);
		};

        entryService.getEntrys()
            .then(preRemoveCallback);
    });
});
