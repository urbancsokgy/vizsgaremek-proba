/*
https://zellwk.com/blog/jest-and-mongoose/
*/

//require('dotenv').config();

const app = require('./server');
const supertest = require('supertest');
const mongoose = require('mongoose');

jest.mock('./auth/authenticate');
jest.mock('./auth/adminOnly');
jest.mock('./auth/selfOnly');

const Category = require('./models/category.model');
const User = require('./models/user.model');
const Book = require('./models/book.model');
const Author = require('./models/author.model');

describe('REST API integration tests', () => {

    beforeAll(async () => {
        //const connectionString = `mongodb+srv://vizsgaremek:${process.env.DB_PASSW}@cluster0.1egzp.mongodb.net/bookstoreDB?retryWrites=true&w=majority`;
        const connectionString = 'mongodb://localhost:27017/bookstoreDB?retryWrites=true&w=majority';
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        const collections = Object.keys(mongoose.connection.collections);

        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany();
        }
    });

    // =========== category tests

    const categoryData = [
        {
            name: 'Category 1'
        },
        {
            name: 'Category 2'
        }
    ];

    // find all categories
    test('GET /api/categories', () => {
        return Category.insertMany(categoryData)
            .then(() => supertest(app).get('/api/categories').expect(200))
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(categoryData.length);

                response.body.forEach((category, index) => {
                    expect(category.name).toBe(categoryData[index].name);
                });
            });
    });

    // find a single category
    test('GET /api/categories/:id', () => {
        const insertedCategory = categoryData[0];

        return Category.insertMany(insertedCategory)
            .then(insertedCategories => supertest(app).get(`/api/categories/${insertedCategories[0]._id}`).expect(200))
            .then(response => {
                const category = response.body;
                expect(category.name).toBe(insertedCategory.name);
            });
    });

    // =========== users tests

    // a newly inserted user is stored with 'user' role
    test('POST /api/users', () => {
        const newUser = {
            email: 'email@test',
            firstName: 'first',
            lastName: 'last',
            address: {
                city: "myCity",
                street: "myStreet",
                building: 10,
                zip: 1234
            },
            password: 'pwd',
            role: 'admin'
        };

        return supertest(app).post('/api/users').send(newUser).expect(201)
            .then(() => User.findOne({ email: newUser.email }))
            .then(savedUser => {
                expect(savedUser.role).toEqual('user');
            });
    });

    // =========== book tests

    // find all books
    test('GET /api/books', async () => {
        const author = await Author.create({
            firstName: 'first-name',
            lastName: 'last-name'
        });

        const bookData = [
            {
                title: 'my-title',
                price: 1500,
                author: author._id
            },
        ];
        await Book.insertMany(bookData);

        await supertest(app).get('/api/books').expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toEqual(bookData.length);

                response.body.forEach((book, index) => {
                    expect(book.title).toBe(bookData[index].title);
                    expect(book.price).toBe(bookData[index].price);
                    expect(typeof book.author).toEqual('object');
                    expect(book.author._id).toBe(author.id); // author.id === author._id.toString()
                    expect(book.author.firstName).toBe(author.firstName);
                    expect(book.author.lastName).toBe(author.lastName);
                });
            });
    });

    // =========== author tests

    // edit an author
    test('PUT /api/author/:id', async () => {
        const authorData = {
            firstName: 'first-name',
            lastName: 'last-name',
            born: 1950
        };

        const author = await Author.create(authorData);
        authorData._id = author.id;

        authorData.firstName = 'modified first-name';
        authorData.lastName = 'modified last-name';
        authorData.born = null;

        await supertest(app).put(`/api/authors/${authorData._id}`).send(authorData).expect(200)
            .then(response => {
                const modifiedAuthor = response.body;

                expect(typeof modifiedAuthor).toEqual('object');
                expect(modifiedAuthor._id).toBe(authorData._id);
                expect(modifiedAuthor.firstName).toBe(authorData.firstName);
                expect(modifiedAuthor.lastName).toBe(authorData.lastName);
                expect(modifiedAuthor.born).toBe(authorData.born);
            });
    });
});