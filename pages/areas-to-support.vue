<template>
    <div>
        <b-container class="main">
            <h3>Support the Causes Most Important to You</h3>

            <p>Your gift to the UC and UC Health makes an impact where you want. Give to your favorite college, program or department, or contribute to the university’s most pressing needs.</p>
            <p>UC and UC Health need your private support to continue growing and meeting the needs of students, faculty, researchers, doctors, patients and society. Explore our funding opportunities to determine the best match for your charitable gift.</p>

            <b-navbar sticky class="mb-5 anchor-scroll-container">
                <a
                    href="#"
                    class="btn btn btn-outline-primary"
                    v-scroll-to="{
                        el: '#CollegesandSchool',
                        offset: -138
                        }"
                >Colleges and School</a>
                <a
                    href="#"
                    class="btn btn btn-outline-primary"
                    v-scroll-to="{
                        el: '#Scholarships',
                        offset: -138
                        }"
                >Scholarships</a>
                <a
                    href="#"
                    class="btn btn btn-outline-primary"
                    v-scroll-to="{
                        el: '#UCHealth',
                        offset: -138
                        }"
                >UC Health</a>
                <a
                    href="#"
                    class="btn btn btn-outline-primary"
                    v-scroll-to="{
                        el: '#University-wideInitiatives',
                        offset: -138
                        }"
                >University-wide Initiatives</a>
            </b-navbar>

            <b-container class="area-container mt-3">
                <b-row v-for="(area, index) in areas" :key="index">
                    <b-col cols="12" :id="area.name | anchor">
                        <h2>{{ area.name}}</h2>
                    </b-col>
                    <b-col v-show="index % 2 === 0" class="text">
                        <p>
                            <strong>Description:</strong>
                        </p>
                        <p>{{ area.description }}</p>
                    </b-col>
                    <b-col>
                        <b-button
                            v-for="(subarea, index) in area.subareas"
                            :key="index"
                            variant="secondary"
                            @click="showModal(subarea)"
                        >{{ subarea.name }}</b-button>
                    </b-col>
                    <b-col v-show="index % 2 !== 0" class="text">
                        <p>
                            <strong>Description:</strong>
                        </p>
                        <p>{{ area.description }}</p>
                    </b-col>
                </b-row>
            </b-container>

            <b-modal
                id="modalArea"
                hide-footer
                cancel-disabled
                size="xl"
                :title="selectedItem.name"
            >
                <h3>About</h3>
                <p class="my-4" v-html="selectedItem.about"></p>
                <hr>
                <h3>Vision</h3>
                <p class="my-4" v-html="selectedItem.vision"></p>
                <hr>
                <h3>Funding Opportunities</h3>
                <div id="accordion" role="tablist">
                    <b-card
                        no-body
                        class="mb-1"
                        v-for="(fund, index) in selectedItem.fundingOpportunities"
                        :key="index"
                    >
                        <b-card-header header-tag="header" class="p-0" role="tab">
                            <b-button
                                block
                                href="#"
                                v-b-toggle="'accordion-' + index"
                                variant="info"
                            >
                                <font-awesome-icon icon="plus"/>
                                {{ fund.name }}
                            </b-button>
                        </b-card-header>
                        <b-collapse
                            :id="'accordion-' + index"
                            accordion="my-accordion"
                            role="tabpanel"
                        >
                            <b-card-body>
                                <b-card-text
                                    v-for="(fund, index) in fund.funds"
                                    :key="index"
                                >{{ fund.fundName }}</b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </div>
            </b-modal>
        </b-container>
    </div>
</template>

<script>
import $ from "jquery";
import Vuex from "vuex";
import axios from "axios";
import { mapState } from "vuex";
import { areas } from "@/store";
import VueScrollTo from "vue-scrollto";

export default {
    name: "areas-to-support",
    pageTitle: "Areas to Support",
    scrollToTop: true,
    layout: "internal",
    data() {
        return {
            areas: areas,
            selected: "Colleges and School",
            areaIndex: "Colleges and School",
            selectedItem: [],
            options: []
        };
    },
    methods: {
        changeSelectVal: function(val) {
            this.areaIndex = val;
        },
        showModal(item) {
            this.selectedItem = item;
            this.$root.$emit("bv::show::modal", "modalArea");
        },
        handleScroll() {
            // console.log(window.scrollY);
            if (window.scrollY > 350) {
                $(".anchor-scroll-container").addClass("sticky-areas");
            } else {
                $(".anchor-scroll-container").removeClass("sticky-areas");
            }
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
    },
    mounted() {
        this.options = areas;
    },
    filters: {
        anchor: function(value) {
            var newAnchor = value.replace(/ +/g, "");
            return newAnchor;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

body {
    height: auto;
    overflow-y: scroll;
}

html {
    scroll-behavior: smooth;
}

.areas-submenu {
    /* position: fixed;
    top: 96px;
    left: 0;
    right: 0; */
    border: 1px solid $black;
    width: 100%;

    label {
        width: 25%;
        border: 1px solid $white;
        box-sizing: border-box;
        background-color: $black;
        padding: 0.5rem 0.75rem;
        @include transition(all 0.4s ease);
        &.select,
        &:hover {
            background-color: $white;
            color: $black;
        }
    }
}
.subareas {
    padding: 1.25rem;
    h2 {
        margin-top: 0;
        display: block;
        color: $black;
        width: 100%;
        border-bottom: 3px solid $red;
    }
    p {
        color: $black;
        font-weight: normal;
    }
    label {
        color: $white;
    }
    .subarea,
    button {
        padding: 5px 15px;
        border: 1px solid $black;
        margin-right: 5px;
        margin-bottom: 5px;
        display: inline-block;
        @include transition(all 0.4s ease);
        label {
            margin: 0;
            display: block;
            @include transition(all 0.4s ease);
        }
        &:hover {
            background: $black;
            color: $white;
        }
    }
}
/* .container {
    max-width: 100%;
} */
.areas {
    &.row {
        padding: 2em;
        .col-sm {
            padding: 0;
            .btn {
                padding: 0.5rem 0.75rem;
                width: 100%;
            }
        }
    }
}

.area-container {
    border: 1px solid $black;
    .row {
        .col-12 {
            background-color: $red;
            padding: 5px 15px;
            h2 {
                color: $white;
                text-transform: uppercase;
                margin: 0;
                letter-spacing: 1px;
            }
        }
        .col {
            padding: 0.5em 1em;
            button {
                margin: 3px;
                text-align: left;
            }
            &.text {
                padding: 1em;
                background-color: $black;
                p {
                    color: $white;
                }
            }
        }
    }
}

ul {
    li {
        a {
            border-radius: 0 !important;
            color: $black;
            &.active {
                background-color: $black !important;
            }
            &:hover {
                color: $white;
                background-color: $black !important;
            }
        }
    }
}

#radio-inline {
    display: inline-flex !important;
}

.main.container {
    position: relative;
}

.anchor-scroll-container {
    margin: 0 !important;
    a {
        width: 24.7%;
        display: inline-block;
        box-sizing: border-box;
        margin: 0 !important;
    }
    &.sticky-top {
        top: 0;
        left: 0;
        @include transition(top 0.4s ease-in-out);
        &.sticky-areas {
            top: 75px;
            left: 0;
            background-color: $black;
            border: 1px solid $white;
            -webkit-box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.5);
            box-shadow: 0 4px 7px 0 rgba(0, 0, 0, 0.5);
            a {
                color: $white;
            }
        }
    }
}

/* MODAL styles */
.modal-dialog {
    max-width: 90% !important;
    margin: 1.75rem auto;
    .modal-header {
        .close {
        }
    }
}
</style>
