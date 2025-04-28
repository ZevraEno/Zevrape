import { Component, OnInit } from '@angular/core';
import {Book, BookService} from '../../services/BookService';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-book',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', author: '' };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.newBook = { title: '', author: '' };
      this.loadBooks();
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }
}
