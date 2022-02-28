import {
    bookService
} from '../services/book-service.js';
// import {
//     eventBus
// } from '../services/eventBus-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    template: `
        <section class="book-app">
            <main class="main-layout">
                <div class="search-container">
                    <book-filter @filtered="setFilter" />
                    <img class="gif" src="./img/bookimg5.jpg" alt="">
                </div>
                <book-list v-if="!selectedBook" :books="booksForDisplay" @selected="selectBook" />
                <book-details v-else :book="selectedBook" @close="selectBook" />
            </main>
        </section>
    `,
    components: {
        bookList,
        bookDetails,
        bookFilter,
    },
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books);
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
            console.log(this.selectedBook);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },
    computed: {
        booksForDisplay() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');

            const start = this.filterBy.fromPrice || 0
            const end = this.filterBy.toPrice || Infinity

            return this.books.filter(book =>
                book.listPrice.amount >= start && book.listPrice.amount <= end && regex.test(book.title));

        }
    },
    unmounted() {},
}