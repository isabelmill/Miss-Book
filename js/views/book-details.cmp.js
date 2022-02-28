import {
    bookService
} from '../services/book-service.js';

export default {
    // props: ['book'],
    template: `
        <section v-if="book" class="book-details">
            <div class="book-more-details">
                <img :src="book.thumbnail">
                
                <div class="book-more-details-info">
                    
                    <div class="details-part-one">
                        <label class="label">Page Count</label>
                        <p>{{book.pageCount}}</p>
                        <p>{{renderPageCount}}</p>
            <label>Language</label>
            <p>{{book.language}}</p>
            </div>
            
            <div class="details-part-two">
                <label>Published Date</label>
                <p>{{book.publishedDate}}</p>
                <p>{{renderIsVeteranBook}}</p>
                <label>Categories</label>
                <p>{{renderCategories}}</p>
            </div>
            
        </div>
        
        <router-link to="/book"><button @click="$emit('close',null)" class="back-btn" >Back</button></router-link>
    </div>

            <div class="book-main-details">
                <div class="books-main-details-first">
            <h4>{{firstLetterUpperCase}}</h4>
            
            <div class="price">
                <p class="price" :style="{ 'color': renderPriceColor }" >{{book.listPrice.amount}} {{renderCurrency}}</p>
                <p class="green" v-if="book.listPrice.isOnSale">{{renderIsOnSale}}</p>
            </div>
            
            <!-- <h5>{{book.subtitle}}</h5> -->
            <div class="author">
                <img v-bind:src="getRandomAvatar" alt="">
                <p class="author" >{{this.book.authors[0]}}</p>
            </div>
            <p class="description" >{{book.description}}</p>
        </div>
        
            <div class="review-container">
                <form @submit.prevent="save" class="review-form" >
                <h2>New Review</h2>
                <br>
                <label for="reader">Full Name: </label>
                <input v-model="review.reader" type="text" id="reader" required>
                <label for="rate">Rate:</label> 
                <select v-model.number="review.rate" id="rate" required>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </select>

                <label >Date: </label>
                <input type="date" v-model="review.date" required>

                <label>Add a written review:  </label>

                <textarea v-model="review.msg" name="text"  rows="3" cols="30"  required></textarea>

                <button type="submit" >Submit</button>
                </form>
            </div>
            </div>
        </section>

        <div class="reviews-container">
        <h1>Reviews</h1>
        <div  v-if="review" class="reviews" v-for="reviewInBook in book.reviews">
            <div class="review-info">
            <div class="user author">
            <img src="./img/avatar/6.JPG" alt="">
            <p>Name: {{reviewInBook.reader}}</p>
            </div>
            <p>Rate : {{reviewInBook.rate}}/5</p>
            <p>Reviewed At : {{reviewInBook.date}}</p>
            </div>
            <div class="review-text">
            <p class="text-area-content"> {{reviewInBook.msg}}</p>
            <button @click="remove" >Delete</button>
            </div>
            </div>
        </div>
        </div>
      <!-- </div> -->


    `,
    data() {
        return {
            book: null,
            review: null
        };
    },
    created() {

        const id = this.$route.params.bookId;
        bookService.get(id)
            .then(book => this.book = book);
        this.review = {
            id: null,
            reader: null,
            rate: 0,
            date: null,
            msg: null,
        };
    },
    methods: {
        remove() {
            bookService.removeReview(this.book, this.review.id);
        },
        save() {
            bookService.saveReview(this.review, this.book).then((book) => {
                this.$emit("reviewAdded", book);
                this.review = {
                    id: null,
                    reader: null,
                    rate: 0,
                    date: null,
                    msg: null,
                };
            });
        },
    },
    computed: {
        renderCurrency() {
            switch (this.book.listPrice.currencyCode) {
                case "EUR":
                    return "€";
                case "ILS":
                    return "₪";
                case "USD":
                    return "$";
            }
        },
        renderCategories() {
            return [this.book.categories].toString().split(" , ").join(" , ");
        },
        renderPageCount() {
            if (this.book.pageCount > 500) {
                return "Long reading";
            } else if (this.book.pageCount > 200) {
                return "Decent Reading";
            } else if (this.book.pageCount < 100) {
                return "Light Reading";
            }
        },
        renderIsOnSale() {
            if (this.book.listPrice.isOnSale) {
                return "This book is on sale!";
            }
        },
        renderIsVeteranBook() {
            if (new Date().getFullYear() - this.book.publishedDate > 10) {
                return "Veteran Book";
            } else if (new Date().getFullYear() - this.book.publishedDate < 1) {
                return "New !";
            }
        },
        renderPriceColor() {
            if (this.book.listPrice.amount > 150) {
                return 'red';
            } else if (this.book.listPrice.amount < 20) {
                return 'green';
            }
        },
        firstLetterUpperCase() {
            const book = this.book.title;
            const bookTitle = book.charAt(0).toUpperCase() + book.slice(1);
            return bookTitle
        },
        getRandomAvatar() {
            const min = Math.ceil(7);
            const max = Math.floor(10);
            const num = Math.floor(Math.random() * (max - min + 1) + min);
            console.log('num:', num);
            return `./img/avatar/${num}.JPG`
        }
    }
}