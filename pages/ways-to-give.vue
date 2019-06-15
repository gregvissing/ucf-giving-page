<template>
    <div>
        <div id="internal-hero">
            <b-container>
                <transition
                    name="title-anim"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
                    appear
                >
                    <!-- {{ title }} -->
                    <InternalTitle/>
                </transition>
            </b-container>
        </div>
        <b-container class="main">
            <p>Whether you want to support next-generation cancer research, international learning opportunities, UC Athletics or everything in between, we want to make it easy for you to make a difference at UC and UC Health. There are a variety of ways you give back, and we are excited to work with you in building toward the future. Through Matching Gifts, Planned Giving, and other giving options you can make sure that your gift has the greatest possible impact on the UC and UC Health.</p>

            <p>Explore all of our giving options to learn more about how to make your gift have the greatest impact on campus and throughout our community.</p>

            <div id="accordion" role="tablist">
                <b-card no-body class="mb-1" v-for="(way, index) in options" :key="index">
                    <b-card-header header-tag="header" class="p-0" role="tab">
                        <b-button block href="#" v-b-toggle="'accordion-' + index" variant="info">
                            <font-awesome-icon icon="plus"/>
                            {{ way.name }}
                        </b-button>
                    </b-card-header>
                    <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text v-html="way.description"></b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>
        </b-container>
    </div>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
import { mapState } from "vuex";
import { ways } from "@/store";
import InternalTitle from "@/components/Page-Components/InternalTitle.vue";

export default {
    name: "ways-to-give",
    pageTitle: "Ways to Give",
    scrollToTop: true,
    layout: "internal",
    components: {
        InternalTitle
    },
    props: {
        value: {
            default: ""
        },
        options: {
            type: Array,
            default: () => [...Object.values(ways)]
        },
        name: {
            type: String,
            default: "name-filter"
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

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
.accordion {
    width: 100%;
    margin: 2em 0;
    border: 3px solid $white;
    .card {
        background: $black;
        border-radius: 0;
        .card-header {
            padding: 0;
            h2 {
                border-bottom: 1px solid $white;
                button {
                    padding: 1rem 2rem;
                    color: $white;
                    text-align: left;
                    width: 100%;
                    @include transition(all 0.4s ease);
                    /* svg {
                        margin-right: 10px;
                        transform: rotate(0deg);
                        @include transition(all 0.4s ease);
                    }
                    &:hover,
                    &[aria-expanded='true'] {
                        background: $red;
                    }
                    &[aria-expanded='true'] {
                        svg {
                            transform: rotate(-135deg);
                        }
                    } */
                }
            }
        }
        &:last-child {
            h2 {
                border-bottom: none;
            }
        }
        .collapse {
            .card-body {
                border-bottom: 1px solid $white;
                color: $white;
            }
        }
    }
}
</style>

