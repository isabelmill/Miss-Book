import {
    bookService
} from '../services/book-service.js';
// import {
//     eventBus
// } from '../services/eventBus-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';
import addBook from "../cmps/add-book.cmp.js";

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
                <add-book @added="renderBooks"></add-book>


                <!-- <book-add v-show="toggleModal" class="modal" @close="closeModal"></book-add> -->
                
            </main>
            <!-- <component :is="currCmp" /> -->
        </section>
    `,
    components: {
        'book-list': bookList,
        'book-details': bookDetails,
        'book-filter': bookFilter,
        'add-book': addBook,
    },
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
            toggleModal: false,
        }
    },
    created() {
        this.renderBooks()
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
            console.log(this.selectedBook);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        openModal() {
            this.toggleModal = true;
        },
        closeModal() {
            this.toggleModal = false;
        },
        renderBooks() {
            bookService.query().then((books) => {
                this.books = books;
            });
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

        },
        // currCmp() {
        //     let randomNum = Math.random()
        //     if (randomNum > 0.5) return 'book-filter'
        //     else 'book-list'
        // },
    },
    unmounted() {},
}