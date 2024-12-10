import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private backendUrl = 'http://localhost:3000'; // Backend base URL

  constructor(private http: HttpClient) {}

  // Fetch the current question
  getQuestion(): Observable<any> {
    return this.http.get(`${this.backendUrl}/question`);
  }

  // Submit the player's answer and bet
  submitAnswer(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/submit-answer`, data);
  }
}
