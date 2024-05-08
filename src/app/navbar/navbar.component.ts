import { Component } from '@angular/core';
import {QuizService} from "../shared/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private quizService: QuizService, private router: Router) {
  }

  signOut() {
    localStorage.clear();
    clearInterval(this.quizService.timer);
    this.router.navigate(['/register'])
  }
}
