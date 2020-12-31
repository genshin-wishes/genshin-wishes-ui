import {
  CollectionViewer,
  DataSource,
  ListRange,
} from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export class VirtualScrollDatasource<T> extends DataSource<T | undefined> {
  public _cachedData: T[] = Array.from<T>({ length: this._count });
  private _fetchedPages = new Set<number>();
  private _dataStream = new BehaviorSubject<(T | undefined)[]>(
    this._cachedData
  );
  private _subscription = new Subscription();
  private _currentRange!: ListRange;

  constructor(
    private _count: number,
    private _pageSize: number,
    private _fetchPageFn: (page: number) => Observable<T[]>
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(T | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe((range) => {
        this._currentRange = range;
        this.fetchCurrentRange();
      })
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  update(count: number) {
    this._fetchedPages = new Set<number>();
    this._cachedData = Array.from<T>({ length: count });
    this._dataStream.next(this._cachedData);
  }

  reset() {
    this._fetchedPages = new Set<number>();
    this._dataStream.next([]);
  }

  insertNew(count: number) {
    const newPages = Math.ceil(count / this._pageSize);
    const oldPages = this._fetchedPages;
    this._cachedData.splice(
      0,
      0,
      ...Array.from<T>({ length: count })
    );
    this._dataStream.next(this._cachedData);

    this._fetchedPages = new Set<number>();
    oldPages.forEach((one) => {
      this._fetchedPages.add(one + newPages);
    });
    this.fetchCurrentRange();
  }

  private fetchCurrentRange() {
    const startPage = this._getPageForIndex(this._currentRange.start);
    const endPage = this._getPageForIndex(this._currentRange.end - 1);
    for (let i = startPage; i <= endPage; i++) {
      this._fetchPage(i);
    }
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    this._fetchPageFn(page).subscribe((pageData) => {
      this._cachedData.splice(
        page * this._pageSize,
        pageData.length,
        ...pageData
      );
      this._dataStream.next(this._cachedData);
    });
  }
}
