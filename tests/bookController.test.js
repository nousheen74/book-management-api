const request = require("supertest");
const express = require('express');
const bookRoutes = require('../routes/bookRoutes');
const app = express();
app.use(express.json());
app.use('/books', bookRoutes);


// Test for GET /books
// This test checks if the GET /books endpoint returns all books correctly.
describe('GET /books', () => {
    it('should return all books', async () => {
        const response = await request(app).get('/books');
        expect(response.statusCode).toBe(200); // Here checking the status code as 200
        expect(Array.isArray(response.body)).toBe(true); // Check if the response is an array
    })
})

//Test for GET /books/:id
//This test checks if the GET /books/:id endpoint returns a specific book correctly.
describe('GET /books/:id', () => {
    it('should return a book by ID', async() => {
        const validId = "58f072ae-49fe-4615-877e-11db6e7f5d32";
        const response = await request(app).get(`/books/${validId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id', validId); 
    });
    it('should return 404 if the book is not found', async () => {
        const invalidId = 'nonexistent-id';
        const response = await request(app).get(`/books/${invalidId}`);
        expect(response.status).toBe(404); // Check if the status code is 404
        expect(response.body).toHaveProperty('error', 'Book not found'); // Check if the error message is correct
    });
})