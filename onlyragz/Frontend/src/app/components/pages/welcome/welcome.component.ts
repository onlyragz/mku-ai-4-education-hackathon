import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { QuestionService } from '../../../services/question.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  auth = inject(AuthService);
  question = inject(QuestionService)

  user:any;
  que:any;
  page:any;
  page_number: number = 1;

  ngOnInit(): void {
    this.getUser();
  }

  getUser()
  {
    this.auth.getUser().subscribe({
      next: (res:any) => {
        console.log(res);
        this.user = res;
      }
    })
  }

  getQuestions()
  {
    this.question.getQuestion(this.page_number).subscribe({
      next: (res:any) => {
        console.log(res.data);
        this.que = res.data;
        this.page = res.current_page;
        this.page_number ++;
      }
    });
  }
}
