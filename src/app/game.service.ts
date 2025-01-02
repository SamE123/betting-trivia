import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private backendUrl = 'http://localhost:3000'; // Adjust based on your backend setup

  constructor(private http: HttpClient) {}

  getQuestion(): Observable<any> {
    return this.http.get(`${this.backendUrl}/question`);
  }

  getPlayers(): Observable<any> {
    return this.http.get(`${this.backendUrl}/players`);
  }

  submitAnswer(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/submit-answer`, data);
  }

  addPlayer(name: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/add-player`, { name });
  }

  chooseAnswer(data: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/choose-answer`, data);
  }

  /**
   * Load questions from the backend
   * This should call the `/load-questions` endpoint to load questions from the CSV file
   */
  loadQuestions(): Observable<any> {
    console.log("Game service call to load qs");
    console.log(`${this.backendUrl}/load-questions`);
    return this.http.post(`${this.backendUrl}/load-questions`, {});
  }
  
  startGame(data: { playerName: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/start-game`, data);
  }
  
}
