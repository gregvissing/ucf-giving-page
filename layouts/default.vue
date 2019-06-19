<template>
    <!-- <section
        :class="{
    'internal area' : (page === 'areas-to-support'),
    'internal ways' : (page === 'ways-to-give'),
    'internal why' : (page === 'why-give'),
    'home' : (page === 'index')
    }"
    >-->
    <section class="home">
        <Header/>

        <transition
            name="router-anim"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
            <nuxt/>
        </transition>

        <Footer/>

        <a class="scrollToTop" href="#" @click.prevent="scrollToTop">
            <span style="font-size: 1.25em;">
                <i class="fas fa-chevron-circle-up"></i>
            </span>
        </a>
    </section>
    <!-- <Logo v-if="show"/> -->
</template>

<script>
import $ from "jquery";
import { mapState, mapGetters } from "vuex";
import Header from "@/components/Navigation/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
    // data() {
    //     return {
    //         show: true
    //     };
    // },
    components: {
        Header,
        Footer
        // InternalTitle
    },
    computed: {
        ...mapState(["page"]),
        title() {
            return this.$route.matched.map(r => {
                return r.components.default.options
                    ? r.components.default.options.pageTitle
                    : r.components.default.pageTitle;
            })[0];
        }
    },
    methods: {
        scrollToTop() {
            $("html, body").animate(
                {
                    scrollTop: 0
                },
                300
            );
            return false;
        },
        created: function() {
            window.addEventListener("scroll", this.handleScroll);
        },
        destroyed() {
            window.removeEventListener("scroll", this.handleScroll);
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
/* @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"; */

.title-anim-enter-active {
    animation: titlecoming 1s;
    animation-delay: 0.5s;
    opacity: 0;
}

.title-anim-leave-active {
    animation: titlegoing 1s;
}

@keyframes titlegoing {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-50px);
        opacity: 0;
    }
}

@keyframes titlecoming {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
