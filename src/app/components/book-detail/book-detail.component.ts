import { AppService } from '../../services/app.service';
import { Book } from '../../models/book.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book;

  inCart: boolean;

  constructor(private as: AppService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.book = this.as.getOne(params['id']);
        this.inCart = this.as.isInCart(this.book);
      });

  }

  onClickAddToCart() {
    this.as.addToCart(this.book);
    this.inCart = this.as.isInCart(this.book);
  }

  onClickRemoveFromCart() {
    this.as.removeFromCart(this.book);
    this.inCart = this.as.isInCart(this.book);
  }

  isInCart() {
    return this.inCart;
  }
}
