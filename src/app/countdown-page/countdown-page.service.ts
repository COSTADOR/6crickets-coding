import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

interface DeadlineResponse {
  secondsLeft: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountdownPageService {
  private apiUrl = '/api/deadline';

  constructor(private http: HttpClient) {
  }

  getDeadlineSeconds(): Observable<number> {
    return this.http.get<DeadlineResponse>(this.apiUrl).pipe(map(response => response.secondsLeft));
  }
}
