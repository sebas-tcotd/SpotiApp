import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Servicio de Spotify listo!');
  }

  getQuery(query: string): Observable<any> {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQD5XktXHszl9hLsw72qd6FZmfsx-1vEtQEN9oA1jyD4vHiTaGeNkcmyezPQYLBB1FA61UaWiTKQtdfVaG0',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => data[`albums`].items)
    );
  }

  getArtistas(termino: string): Observable<any> {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => data[`artists`].items)
    );
  }

  getArtista(id: string): Observable<any> {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string): Observable<any> {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => data[`tracks`])
    );
  }
}
