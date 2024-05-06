import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Participante} from "../model/participante";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private readonly API = 'api/participante';
  constructor(private http: HttpClient) { }

  insertParticipant(name: string, email: string) {
    var body = {
      Name: name,
      Email: email
    }
    return this.http.post(this.API, body);
  }

  private update(record: Partial<Participante>) {
    return this.http.put<Participante>(`${this.API}/${record.id}`, record);
  }

  private create(record: Partial<Participante>) {
    return this.http.post<Participante>(this.API, record);
  }
}
