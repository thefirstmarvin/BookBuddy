package com.bookbuddy.bookservice.repository;

import com.bookbuddy.bookservice.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository <Book, Long> {

}
