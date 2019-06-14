<template>
    <section :class="{
    'internal' : (page != 'index'),
    'home' : (page === 'index')
    }">
        <Header/>

        <div id="internal-hero" v-if="page != 'index'">
            <b-container>
                <!-- <transition
                    name="title-anim"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
                    key="titlebar"
                >-->
                <transition @enter="enterEl" @leave="leaveEl" :css="false" appear>
                    <InternalTitle/>
                </transition>
            </b-container>
        </div>

        <transition
            name="router-anim"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutRight"
        >
            <nuxt/>
        </transition>

        <Footer/>

        <!-- <FormModal id="formModal"/> -->

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
import Header from "@/components/Navigation/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import InternalTitle from "@/components/Page-Components/InternalTitle.vue";
// import FormModal from "~/components/Modal/FormModal.vue";

export default {
    data() {
        return {
            show: true
        };
    },
    components: {
        Header,
        Footer,
        InternalTitle
        // FormModal
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
        },
        enterEl(el, done) {
            //entrance animation
            console.log("enter");
            done();
        },
        leaveEl(el, done) {
            //exit animation
            console.log("exit");
            done();
        }
        // showFormModal() {
        //     // this.selectedFund = item;
        //     this.$root.$emit("bv::show::modal", "formModal");
        // }
    }
};
</script>

<style lang="scss">
</style>
