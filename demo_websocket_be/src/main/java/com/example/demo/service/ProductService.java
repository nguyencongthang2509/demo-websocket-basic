package com.example.demo.service;

import com.example.demo.model.Product;

import java.util.List;

/**
 * @author thangncph26123
 */
public interface ProductService {

    List<Product> getAll();

    Product save(Product product);
}
