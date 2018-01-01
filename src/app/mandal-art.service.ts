import {
  Injectable, EventEmitter,
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
} from 'rxjs';

import { MandalArt, mandalArts } from '../data';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class MandalArtService {

  private selectedChanged: EventEmitter<MandalArt> = new EventEmitter();

  private mandalArtsUrl = 'api/mandalArts';  // URL to web api
  private mandalArts: MandalArt[];
  private selectedMandalArt: MandalArt;
  
  constructor(private http: HttpClient) {}

  public selectMandalArt(mandalArt: MandalArt): void {
    if (!mandalArt) {
      return;
    }

    this.selectedMandalArt = mandalArt;
    this.selectedChanged.emit(mandalArt);
  }

  public getSelectedChangeEmitter(): EventEmitter<MandalArt> {
   return this.selectedChanged; 
  }

  public clearSelection(): void {
    this.selectedMandalArt = null;
    this.selectedChanged.emit(null);
  }

  /** GET heroes from the server */
  public getMandalArts() : Observable<MandalArt[]> {
    if (this.mandalArts) {
      return Observable.of(this.mandalArts);
    }

    return this.http
      .get<MandalArt[]>(this.mandalArtsUrl)
      .pipe(
        tap((mandalArts: MandalArt[]) => this.mandalArts = mandalArts),
        catchError(this.handleError('getMandalArts', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  public getMandalArt(id: number) : Observable<MandalArt> {
    const url = `${this.mandalArtsUrl}/${id}`;
    return this.http
      .get<MandalArt>(url)
      .pipe(
        catchError(this.handleError<MandalArt>(`getMandalArt id=${id}`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // Let the app keep running by returning an empty result.
      return Observable.of(result as T);
    };
  }
}
