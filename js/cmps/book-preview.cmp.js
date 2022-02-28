export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            
            <img :src="book.thumbnail">
            <div class="details">
            <h1>{{book.title}}</h1>
            <p>{{book.listPrice.amount}} {{renderCurrency}}</p>
            </div>
        </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {},
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
    },
};