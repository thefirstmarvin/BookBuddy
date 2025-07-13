package com.bookbuddy.bookservice.service;

import com.bookbuddy.bookservice.model.Book;
import com.bookbuddy.bookservice.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepo;

    public BookService(BookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }

    public List<Book> getAllBooks(){
        return bookRepo.findAll();
    }

    public Optional<Book> getBookById(Long id){
        return bookRepo.findById(id);
    }

    public Book saveBook(Book book){
        return bookRepo.save(book);
    }

    public void deleteBook(Long id){
        bookRepo.deleteById(id);
    }
}
