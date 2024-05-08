import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  imageSrc: any;

  constructor(private router: Router, public quizService: QuizService, private sanitizer: DomSanitizer) {
    const currentQuestionId = this.quizService.qns[this.quizService.qnProgress]?.questionId;
    if (currentQuestionId) {
      this.quizService.getImageUrl(currentQuestionId).subscribe(blob => {
        const objectURL = URL.createObjectURL(blob);
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    }
  }

  ngOnInit() {
    const seconds = localStorage.getItem('seconds');
    const qnProgress = localStorage.getItem('qnProgress');
    const qns = localStorage.getItem('qns');

    if (seconds && parseInt(seconds) > 0) {
      this.quizService.seconds = parseInt(seconds);
      this.quizService.qnProgress = parseInt(qnProgress!);
      this.quizService.qns = JSON.parse(qns!);

      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          this.quizService.qns = data;
          this.startTimer();
        }
      );
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  answer(qID: any, choice: any) {
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

  transformToImageUrl(base64Data: string) {
    return this.quizService.transformToImageUrl(base64Data);
  }

}
