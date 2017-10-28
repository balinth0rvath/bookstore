import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { AppService } from '../../services/app.service';
import { Book } from '../../models/book.model';
import { NgForOf } from '@angular/common';
import { RootObject } from '../../models/google-book-interface.model';
import { Subscription } from 'rxjs/subscription';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  bookList: Book[] = [];

  object: RootObject;

  subscription: Subscription;

  constructor(private as: AppService, 
              private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.as.bookListChanged.subscribe(
      (books: Book[]) => { this.bookList = books; }
    );

  }
  onClick(id: string) {
    this.router.navigate(['book/', id]);
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}


