import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
    <section class="book-list">
        <div class="book-list-header">
            <!-- <h2>Best Seller Books</h2> -->
            <div class="book-list-header-filter">
            </div>
        </div>
        <ul>
            <li v-for="book in books" :key="book.id" class="book-preview-container">
                <router-link :to="'/book/'+book.id">
                <book-preview :book="book" />
                </router-link>
            </li>
        </ul>
    </section>
    `,
    components: {
        bookPreview
    },
    methods: {
        select(book) {
            this.$emit('selected', book);
        },
    },
    computed: {}
}