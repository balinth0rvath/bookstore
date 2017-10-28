export class Book {
	id: string;
	title: string;
	authors: string[];
	description: string;
	thumbnail: string;
	smallThumbnail: string;



	constructor(id, title, authors, description, thumbnail, smallThumbnail) {
		this.id = id;
		this.title = title;
		this.authors = authors;
		this.description = description;
		this.thumbnail = thumbnail;
		this.smallThumbnail = smallThumbnail;
	}
}
