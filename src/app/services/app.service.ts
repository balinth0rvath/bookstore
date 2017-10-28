import { Config } from './config';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { RootObject } from '../models/google-book-interface.model';
import { Book } from '../models/book.model';

@Injectable()
export class AppService {

	private object: RootObject;

	private bookList: Book[];

	private selectedBookList: Book[];

	public bookListChanged = new Subject<Book[]>();

	public selectedBookListChanged = new Subject<Book[]>();

	public constructor(private http: Http) { }

	getOne(id: string): Book {
		let bookList: Book[] = this.bookList.concat(this.selectedBookList);
		let book = bookList.find(book => book.id == id);
		return book;

	}

	initCart() {
		if (this.selectedBookList == null) {
			let localCart = localStorage.getItem('cart');
			if (localCart != null) {
				this.selectedBookList = JSON.parse(localCart).cart;
			} else {
				this.selectedBookList = [];
			}
			this.selectedBookListChanged.next(this.selectedBookList);
		}
	}
	
	addToCart(book: Book) {
		if (!this.isInCart(book)) {
			this.selectedBookList.push(book);
			this.selectedBookListChanged.next(this.selectedBookList);
			localStorage.setItem('cart',
				JSON.stringify({ cart: this.selectedBookList }));
		}
	}

	removeFromCart(b2: Book) {
		if (this.isInCart(b2)) {
			this.selectedBookList = this.selectedBookList.filter(book => book.id != b2.id);
			this.selectedBookListChanged.next(this.selectedBookList);
			localStorage.setItem('cart',
				JSON.stringify({ cart: this.selectedBookList }));
		}
	}

	isInCart(b2: Book): boolean {
		let book = this.selectedBookList.find(book => b2.id == book.id);
		return (book != null);
	}

	fetchList(searchTerm: string) {

		if (searchTerm == '') {
			this.bookList = [];
			this.bookListChanged.next(this.bookList.slice());
			return;
		}

		var headers = new Headers({
			'Content-type': 'application/json; charset='+Config.encoding
		});

		var options = new RequestOptions({ headers: headers });

		this.http.get(Config.getBookListURL + Config.searchParameter + searchTerm).subscribe(
			ret => {
				this.object = ret.json();
				if (this.object != null) {
					this.bookList = [];
					if (this.object.totalItems != 0) {
						for (let i of this.object.items) {

							if (i.volumeInfo != null) {
								let book = new Book(i.id,
									i.volumeInfo.title,
									i.volumeInfo.authors,
									i.volumeInfo.description,
									(i.volumeInfo.imageLinks != null) ? i.volumeInfo.imageLinks.thumbnail : null,
									(i.volumeInfo.imageLinks != null) ? i.volumeInfo.imageLinks.thumbnail : null);
								this.bookList.push(book);
							}
						}
					}
					this.bookListChanged.next(this.bookList.slice());
				}
			},
			() => {
				console.log('error');
			},
			() => {
				console.log('completed')
			}
		);
	}
}