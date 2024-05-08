import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Participante} from "../model/participante";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  readonly API = 'api/';
  qns: any[] = [];
  seconds: number = 0;
  timer: any = null;
  qnProgress: number = 0;
  constructor(private http: HttpClient) {}
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  insertParticipant(nome  : string, email: string) {
    var body = {
      Name: nome,
      Email: email
    }
    return this.http.post(this.API + 'participante', body);
  }

  getQuestions() {
    return this.http.get(this.API + 'questions');
  }

  getImageUrl(questionId: number): Observable<Blob> {
    return this.http.get(`${this.API}/questoes/${questionId}/imagem`, { responseType: 'blob' })
      .pipe(catchError(error => throwError(error)));
  }

  transformToImageUrl(base64Data: string): string {
    return `data:image/jpeg;base64,${base64Data}`;
  }


}
