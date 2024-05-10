import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './result/result.component';
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {QuizService} from "./shared/quiz.service";
import {AuthGuard} from "./auth/auth.guard";
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    QuizComponent,
    ResultComponent,
    HomeComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [QuizService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
