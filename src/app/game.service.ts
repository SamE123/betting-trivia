import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private backendUrl = 'http://localhost:3000'; // Adjust for your backend

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
    console.log(data);
    return this.http.post(`${this.backendUrl}/choose-answer`, data);
  }

  loadQuestions(): Observable<any> {
    console.log('Loading qs service call');
    return this.http.post(`${this.backendUrl}/load-questions`, {});
  }
  
  startGame(data: { playerName: string }): Observable<any> {
    return this.http.post(`${this.backendUrl}/start-game`, data);
  }

  updateGameSettings(data: any): Observable<any>{
    console.log("updating settings in service call");
    return this.http.post(`${this.backendUrl}/update-settings`, data);
  }

  loadCategories(): Observable<{ categories: string[]; subcategories: string[] }> {
    return this.http.get<{ categories: string[]; subcategories: string[] }>(`${this.backendUrl}/load-categories`);
  }

  resetGame(): Observable<any> {
    return this.http.post(`${this.backendUrl}/reset-game`, {});
  }
  




}
