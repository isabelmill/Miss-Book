import {
    bookService
} from '../services/book-service.js';

export default {
    // props: [""],
    template: `
        <section>
        <div class="search-google">
            <h2>Not enough books?</h2>
            <h1>Now you can add any book that available online for free !</h1>
            <h3>Just enter the title here:</h3>
        <label for="search">
                <!-- <p>Search Online</p> -->
                <input v-model.lazy="title" id="search" type="text" >
            </label>
            <!-- <Transition name="fade"> -->
            <ul class="new-books-list" v-for="book in newBooks">
                <li>{{book.title}}</li>
                <button @click="addNewBook(book)">+</button>
            <!-- </Transition> -->
                </ul>
            </div>
        </section>
    `,
    components: {},
    created() {},
    data() {
        return {
            title: null,
            newBooks: [],
        }
    },
    methods: {
        getListPrice() {
            let amount = Math.floor(Math.random() * 300) + 1;
            let currencyCode = "USD";
            let isOnSale = false;
            return {
                amount,
                currencyCode,
                isOnSale,
            };
        },
        addNewBook(book) {
            bookService.saveNewBook(book)
                .then(() => {
                    this.$emit("added")
                    Swal.fire({
                        position: 'middle',
                        icon: 'success',
                        title: 'Book has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            this.title = null
        }
    },
    computed: {},
    unmounted() {},
    watch: {
        title(newVal) {
            if (!newVal) {
                return (this.newBooks = []);
            }
            bookService.ask(newVal).then((books) => {
                console.log('books:', books);
                this.newBooks = [];
                books.forEach((book) => {
                    let id = book.id;
                    let title = book.volumeInfo.title || 'No Title';
                    let authors = book.volumeInfo.authors || ['Anonymous'];
                    let publishedDate = book.volumeInfo.publishedDate || ['1998'];
                    let description = book.volumeInfo.description || 'No Description';
                    let pageCount = book.volumeInfo.pageCount || '100';
                    let categories = book.volumeInfo.categories || ['Books'];
                    let thumbnail = book.volumeInfo.imageLinks.thumbnail || 'No Image';
                    let language = book.volumeInfo.language || ['En'];
                    let listPrice = this.getListPrice();
                    this.newBooks.push({
                        id,
                        title,
                        authors,
                        publishedDate,
                        description,
                        pageCount,
                        categories,
                        thumbnail,
                        language,
                        listPrice,
                    });
                });
            });
        },
    },
}