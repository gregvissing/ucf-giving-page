<template>
    <section class="internal">
        <Header/>

        <div id="internal-hero" v-if="page != 'index'">
            <!-- <div id="internal-hero"> -->
            <b-container>
                <!-- <transition
                    name="title"
                    mode="out-in"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
                    appear
                >-->
                <!-- {{ page }} -->
                <transition
                    name="title-anim"
                    mode="out-in"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
                >
                    <InternalTitle/>
                </transition>
            </b-container>
        </div>
        <!-- <InternalTitle v-if="page != 'index'"/> -->

        <b-container>
            <transition
                name="router-anim"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
            >
                <nuxt/>
            </transition>
        </b-container>
        <Footer/>
        <a class="scrollToTop" href="#" @click.prevent="scrollToTop">
            <span style="font-size: 1.25em;">
                <i class="fas fa-chevron-circle-up"></i>
            </span>
        </a>
    </section>
</template>

<script>
import $ from "jquery";

import { mapState, mapGetters } from "vuex";
import Header from "~/components/Navigation/Header.vue";
import Footer from "~/components/Footer/Footer.vue";
import InternalTitle from "@/components/Page-Components/InternalTitle.vue";

export default {
    components: {
        Header,
        Footer,
        InternalTitle
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
    }
};
</script>

<style lang="scss" >
@import "@/assets/scss/style.scss";
#internal-hero {
    margin-top: 80px;
    background-color: $black;
    background: url("https://foundation.uc.edu/image/annual-report/2018/letters/UC-Campus-Scenes0232.jpg");
    background-position: center;
    height: 100px;
    width: 100%;
    margin-bottom: 2em;
    position: relative;
    &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 60px;
        width: 50%;
        background-color: $black;
        clip-path: polygon(0 0, 100% 0, 93% 100%, 0 100%);
    }
    .container {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 5;
        h1 {
            color: $white;
        }
    }
}

/* .internal {
    > .container {
        margin-top: 0;
        /* margin-top: 85px; */

/*@include media("<=desktop") {
            max-width: 95% !important;
            .container {
                max-width: 100% !important;
            }
        }
    }
} */

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
