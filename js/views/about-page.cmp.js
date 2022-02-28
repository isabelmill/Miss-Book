import {
    eventBus
} from '../services/eventBus-service.js'

export default {
    template: `
        <section class="about-page">
            <h5>About us</h5>
            <h3>“That’s the thing about books. They let you travel without moving your feet.” – Jhumpa Lahiri</h3>
            <p>Welcome to the MISS-BOOK family online bookshop! It has been our dream for a very long time to own our own bookshop and so, after a spur of the moment decision to view some retail units at the end of 2021, here we are! We feel incredibly lucky to own this online-shop and more than anything, we want our bookshop to be a central part of the community; from working with schools and young people, to hosting a wide range of events, book clubs and writing clubs.</p>
            <!-- <button @click="callBus">Call the bus</button> -->
            <img src="./img/bookimg7.png" alt="">
        </section>
    `,
    methods: {
        callBus() {
            console.log('Calling bus!');
            eventBus.emit('test', 'test data')
        }
    }
}