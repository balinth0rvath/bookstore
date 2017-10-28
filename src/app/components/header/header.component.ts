import { Book } from './../../models/book.model';
import { Subscription } from 'rxjs/subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { ModalModule } from 'ng2-modal';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

	searchForm: FormGroup;

	selectedBookList: Book[];

	cartSize: number;

	constructor(private as: AppService, 
				private router: Router) {
		this.cartSize = 0;

		this.subscription = this.as.selectedBookListChanged.subscribe(
			(list: Book[]) => {
				this.cartSize = list.length;
				this.selectedBookList = list;
			});
		this.as.initCart();
	}

	subscription: Subscription;

	ngOnInit() {
		this.formInit();
	}

	formInit() {
		let search = '';

		this.searchForm = new FormGroup({
			'title': new FormControl(search)
		});
	}

	onSubmit() {
		const title = this.searchForm.value['title'];
		this.as.fetchList(title);
		this.router.navigate(['']);
	}

	onClickCart() {
		this.router.navigate(['cart']);
	}

	onClickCartItem(book: Book) {
		this.router.navigate(['book/', book.id]);
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
