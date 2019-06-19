<template>
    <div>
        <header class="index">
            <b-navbar toggleable="lg" fixed="top">
                <b-container>
                    <b-navbar-brand class="d-flex align-items-center">
                        <nuxt-link to="/">
                            <img
                                src="https://foundation.uc.edu/file/projects/give-to-uc/images/logo-ucFoundation-white.png"
                            >
                        </nuxt-link>
                    </b-navbar-brand>
                    <b-collapse is-nav id="nav_text_collapse">
                        <b-navbar-nav class="ml-auto">
                            <b-nav-item :to="{ name: 'ways-to-give' }">WAYS TO GIVE</b-nav-item>
                            <b-nav-item :to="{ name: 'why-give' }">WHY GIVE</b-nav-item>
                            <b-nav-item :to="{ name: 'areas-to-support' }">AREAS TO SUPPORT</b-nav-item>
                            <!-- <b-nav-item class="donate" to="/donate">DONATE NOW</b-nav-item> -->
                            <b-nav-item class="donate" v-b-modal.formModal>DONATE NOW</b-nav-item>
                            <b-nav-item class="search" @click.prevent="searchToggle">
                                <i class="fas fa-search"></i>
                            </b-nav-item>
                            <!-- <b-nav-item class="cart" to="/cart/" v-show="cartTotal > 0"> -->
                            <b-nav-item class="cart" :to="{ name: 'cart' }">
                                <div class="cartitem">
                                    <div v-if="cartTotal > 0" class="cartcount">{{ cartTotal }}</div>
                                    <img src="~/assets/images/baseline-card_giftcard-24px.svg">
                                </div>
                                <!-- <font-awesome-icon icon="shopping-cart" size="lg"/> -->
                            </b-nav-item>
                        </b-navbar-nav>
                        <div class="search-container animateblock close">
                            <b-form-input
                                class="searchInput"
                                v-model="searchText"
                                placeholder="Enter Fund Name then hit Enter"
                                @keyup.enter="searchFunds"
                            ></b-form-input>
                            <b-form-group class="filter-boxes">
                                <b-form-checkbox-group
                                    id="checkbox-filter"
                                    v-model="selected"
                                    name="search-filter"
                                >
                                    <b-form-checkbox value="funds">
                                        <label>Funds</label>
                                    </b-form-checkbox>
                                    <b-form-checkbox value="areas">
                                        <label>Areas</label>
                                    </b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>
                    </b-collapse>

                    <div class="mobile cartitem">
                        <div v-if="cartTotal > 0" class="cartcount">{{ cartTotal }}</div>
                        <!-- <img src="~/assets/images/baseline-card_giftcard-24px.svg"> -->
                    </div>

                    <b-navbar-toggle
                        class="navbar-light menuWrapper"
                        target="nav_text_collapse"
                        @click="custonNavToggle"
                    >
                        <div class="menu"></div>
                    </b-navbar-toggle>
                </b-container>
            </b-navbar>

            <FormModal id="formModal"/>
        </header>

        <!-- <div id="internal-hero" v-if="page === 'why-give'"> -->
        <!-- <div id="internal-hero"> -->
        <!-- <b-container> -->
        <!-- <transition
                    name="title"
                    mode="out-in"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
                    appear
        >-->
        <!-- {{ page }} -->
        <!-- <InternalTitle/> -->
        <!-- </transition> -->
        <!-- </b-container>
        </div>-->
        <!-- v-else-if= -->
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import $ from "jquery";

// import InternalTitle from "@/components/Page-Components/InternalTitle.vue";
import FormModal from "~/components/Modal/FormModal.vue";

export default {
    data() {
        return {
            searchText: "",
            selected: []
        };
    },
    components: {
        FormModal
        // InternalTitle
    },
    computed: {
        cartTotal() {
            // return this.$store.state.cartTotal;
            return this.$store.state.form.Gift.Designations.length;
        },
        ...mapState(["page"]),
        title() {
            return this.$route.matched.map(r => {
                return r.components.default.options
                    ? r.components.default.options.pageTitle
                    : r.components.default.pageTitle;
            })[0];
        },
        pageVal() {
            return this.$store.state.page;
        }
        // ...mapGetters(['selectedUser'])
    },
    methods: {
        handleScroll() {
            if (window.scrollY > 100) {
                $("nav").addClass("reduced");
                $(".scrollToTop").fadeIn();
            } else {
                $("nav").removeClass("reduced");
                $(".scrollToTop").fadeOut();
            }
        },
        searchToggle: function() {
            console.log("search");
            $(".search-container").toggleClass("open close");
            $(".search-container.open").animate(
                {
                    width: "70%",
                    padding: "0.375rem 0.75rem",
                    "font-weight": "normal !important"
                },
                500,
                function() {
                    $(".filter-boxes").slideDown();
                }
            );
            $(".search-container.close").animate(
                {
                    width: "0%",
                    padding: "0",
                    "font-weight": "normal !important"
                },
                500,
                function() {
                    $(".filter-boxes").slideUp();
                }
            );
        },
        custonNavToggle: function() {
            $(".menu").toggleClass("is-active");
        }
    },
    created() {
        if (process.browser) {
            window.addEventListener("scroll", this.handleScroll);
        }
    },
    destroyed() {
        if (process.browser) {
            window.removeEventListener("scroll", this.handleScroll);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

/* Custom nav styles */
.navbar-toggler {
    right: 0% !important;
    position: absolute;
    top: 35px !important;
    right: 0;
    /* transform: translate(-50%, -50%); */
    padding: 20px 10px;
    background: darken($black, 5%);
    border-color: $white !important;
    @include media("<=tablet") {
        border-color: $white !important;
    }
}

.menuWrapper {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    padding: 20px 10px;
    background: darken($black, 5%);
}

.menu {
    display: block;
    height: 5px;
    background: $white;
    width: 30px;
    position: relative;
    text-align: center;
    transition: all 0.3s;

    &:before {
        content: "";
        position: absolute;
        top: -10px;
        left: 0;
        background: $white;
        width: 30px;
        height: 5px;

        transition: all 0.3s;
    }

    &:after {
        content: "";
        position: absolute;
        top: 10px;
        left: 0;
        background: $white;
        width: 30px;
        height: 5px;

        transition: all 0.3s;
    }
}

.is-active {
    background: transparent;

    &:before {
        top: 0;
        transform: rotate(45deg);
    }

    &:after {
        top: 0;
        transform: rotate(-45deg);
    }
}

header {
    width: 100vw;
    /* height: 300px; */
    position: relative;
    &:before {
        content: "";
        z-index: 10;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: -moz-radial-gradient(
            center,
            ellipse cover,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 36%,
            rgba(0, 0, 0, 0.65) 100%
        ); /* FF3.6-15 */
        background: -webkit-radial-gradient(
            center,
            ellipse cover,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 36%,
            rgba(0, 0, 0, 0.65) 100%
        ); /* Chrome10-25,Safari5.1-6 */
        background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 36%,
            rgba(0, 0, 0, 0.65) 100%
        ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(
        startColorstr='#00000000',
        endColorstr='#a6000000',
        GradientType=1
      ); /* IE6-9 fallback on horizontal gradient */
        opacity: 0.6;
    }
    &:after {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #000;
    }

    nav {
        background-color: $red;
        -webkit-box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.5);
        box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.5);
        .navbar-brand {
            img {
                height: 60px;
                @include transition(all 0.4s ease);
            }
        }
        .navbar-collapse {
            background: transparent !important;
            position: relative;
            /* .searchInput, */
            .search-container {
                display: block;
                position: absolute;
                right: 4.5%;
                top: 0;
                bottom: 0;
                height: 100%;
                width: 0%;
                z-index: 10;
                padding: 0 !important;
                border: 0;
                opacity: 1;
                font-size: normal !important;
                font-weight: normal !important;
                &:hover {
                    opacity: 1 !important;
                }
                &.close {
                    overflow: hidden;
                }
                .filter-boxes {
                    display: none;
                    background: rgba($black, 0.5);
                    margin: 0;
                    padding: 5px 10px;
                    label {
                        color: $white !important;
                        line-height: 1;
                        font-weight: bold !important;
                    }
                }
                .searchInput {
                    height: 100%;
                }
            }
            ul {
                @media (max-width: 991px) {
                    background: $black;
                }
                li {
                    border-bottom: none !important;
                    a {
                        &.nav-link {
                            padding: 1rem 0.75rem;
                            color: $white;
                            &.nuxt-link-active {
                                color: $black;
                            }
                        }
                    }
                    &.donate {
                        background-color: $black;
                        border-bottom: none !important;
                        .nuxt-link-active {
                            background: $white;
                            color: $red !important;
                        }
                        .nav-link {
                            &:hover {
                                color: $red;
                            }
                            &:active,
                            &:focus {
                                outline: none !important;
                                color: $white !important;
                            }
                        }
                    }
                    &.cart {
                        .cartitem {
                            img {
                                @include transition(all 0.4s ease);
                                &:hover {
                                    /* fill: $black; */
                                    filter: invert(1);
                                }
                            }
                        }
                        svg {
                            path {
                                fill: $white;
                            }
                        }
                        @media (max-width: 991px) {
                            display: none;
                        }
                    }
                }
            }
        }
        &.reduced {
            .navbar-brand {
                img {
                    height: 50px;
                }
            }
            .navbar-toggler {
                top: 0.6em !important;
            }
            .mobile.cartitem {
                top: 1.25em;
            }
        }
        .container {
            position: relative;
            /* .navbar-toggler {
                position: absolute;
                right: 0;
                top: 0.8em;
                border: 1px solid rgba(0, 0, 0, 0.5);
                border-radius: 5px !important;
            } */
        }
    }
}

@mixin header($imgurl) {
    background: url($imgurl) center center;
    background-size: cover;
    position: absolute;
    width: 100vw;
    height: 300px;
}

.header-img1 {
    @include header(
        "https://www.alumni.uc.edu/image/home-full-width/MM-Geen-3.jpg"
    );
}

.header-img2 {
    @include header(
        "https://foundation.uc.edu/image/annual-report/2018/letters/UC-Campus-Scenes0232.jpg"
    );
}

/* .header-img3 {
  @include header('/header3.jpg');
} */

.bk-enter-active,
.bk-leave-active {
    transition: all 0.4s ease;
}

.bk-enter,
.bk-leave-to {
    transform: scale(1.1) translateZ(0);
    opacity: 0;
}

.bk-img {
    position: absolute;
    width: 100vw;
    height: 300px;
    overflow: hidden;
    left: 0;
    top: 0;
}

.cartitem {
    position: relative;
    float: right;
    &.mobile {
        display: none;
        float: none;
        position: absolute;
        top: 1.5em;
        right: 6em;
        @media (max-width: 991px) {
            display: inline-block;
        }
    }
}

.cartcount {
    font-family: "Barlow", sans-serif;
    position: absolute;
    background: $black;
    color: white;
    text-align: center;
    padding-top: 3px;
    width: 20px;
    height: 20px;
    font-size: 10px;
    margin: -5px 0 0 20px;
    border-radius: 1000px;
    font-weight: 700;
}
</style>
