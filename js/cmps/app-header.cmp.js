export default {
    template: `
        <header class="app-header">
            <nav class="main-nav-conatiner">
                <div class="logo">
                    <router-link to="/"><h1>MISS-BOOK</h1></router-link>
                </div>
                <ul class="main-nav">
                    <router-link to="/"><li><a>Home</a></li></router-link>
                    <router-link to="/book"><li><a>Books</a></li></router-link>
                    <router-link to="/about"><li><a>About</a></li></router-link>
                </ul>
            </nav>

            <!-- <transition name="fade">
            <router-view v-slot="{ Component  }">
            <component :is="Component"/>
            </transition>
            </router-view> -->
            
            
            
            <!-- <component :is="currComponent"/> -->
        </header>
        `,
}