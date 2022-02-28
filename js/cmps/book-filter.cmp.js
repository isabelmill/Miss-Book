export default {
    template: `
        <section class="book-filter">
            <h1>What Book Are You Looking For?</h1>
            <h2>From applied literature to educational resources, we have a lot of books to offer to you. We provide only the best books to read and enjoy.</h2>
            <div class="serch-btn-input">
                <img @click="show = !show"  src="/img/icon-filter.png" alt="">
            <input @input="setFilter" type="text" v-model="filterBy.title" placeholder="Search by title">
            <button>Search</button>
        </div>
        <Transition name="fade">
        <div  v-if="show" class="price-iputs">
        <label>
        From Price: 
        <input @input="setFilter" type="number" v-model="filterBy.fromPrice">
        </label>
        <label>
        To Price: 
        <input @input="setFilter" type="number" v-model="filterBy.toPrice">
        </label>
        </div>
        </Transition>

        </section>
    `,
    data() {
        return {
            show: false,
            filterBy: {
                title: '',
                fromPrice: '',
                toPrice: '',
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy);
        }
    }
}