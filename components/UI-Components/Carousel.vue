<template>
    <div class="card-carousel-wrapper">
        <div class="carousel__nav">
            <div
                class="card-carousel--nav__left"
                @click="moveCarousel(-1)"
                :disabled="atHeadOfList"
            ></div>
            <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
            <!-- <button class="carousel__button--prev js-carousel-button" data-dir="prev">&lt;</button>
            <button class="carousel__button--next js-carousel-button" data-dir="next">&gt;</button>-->
        </div>
        <!-- <div
            class="card-carousel--nav__left"
            @click="moveCarousel(-1)"
            :disabled="atHeadOfList"
        ></div>-->

        <div class="card-carousel">
            <div class="card-carousel--overflow-container">
                <transition
                    name="slide"
                    mode="out-in"
                    appear
                    enter-class="init-slide"
                    enter-stagger="50"
                    enter-active-class="animated slideInLeft"
                    :duration="{ enter: 1000 }"
                >
                    <!-- <transition name="slide"> -->
                    <div
                        class="card-carousel-cards"
                        :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
                    >
                        <div
                            class="card-carousel--card text-center animated"
                            v-for="(college, index) in alphaColleges"
                            :key="index"
                        >
                            <div class="text-container">
                                <font-awesome-icon
                                    size="2x"
                                    :icon="college.icon"
                                    :style="{ color: college.color }"
                                />
                                <div class="card-carousel--card--footer">
                                    <p>{{ college.text }}</p>
                                </div>
                            </div>

                            <b-button
                                block
                                variant="outline-primary"
                                @click="showModal(college)"
                            >View Funds</b-button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <!-- <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div> -->

        <b-modal
            id="modalCollege"
            hide-footer
            cancel-disabled
            size="xl"
            :title="selectedCollege.text"
        >
            <p class="my-4">
                <strong>Description:</strong>
                {{ selectedCollege.description }}
                <!-- {{ selectedCollege.text }} -->
            </p>
            <!-- {{selectedCollege.column}} -->
            <div id="accordion" role="tablist">
                <b-card no-body class="mb-1" v-for="(fund, index) in alphaFunds" :key="index">
                    <b-card-header header-tag="header" class="p-0" role="tab">
                        <b-button block href="#" v-b-toggle="'accordion-' + index" variant="info">
                            <font-awesome-icon icon="plus"/>
                            {{ fund.title }}
                        </b-button>
                    </b-card-header>
                    <b-collapse :id="'accordion-' + index" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>
                                <p>Description: {{ fund.title }}</p>
                                <p>College: {{ fund.college }}</p>
                                <a
                                    :href="'https://foundation.uc.edu/donate?id=' + fund.guid"
                                >{{ fund.title }}</a>
                            </b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>
            <!-- <ul>
                <li v-for="(fund, index) in alphaFunds" :key="index">
                    <a :href="'https://foundation.uc.edu/donate?id=' + fund.guid">{{ fund.title }}</a>
                    - {{ fund.college }}
                </li>
            </ul>-->

            <!-- <div class="btn-container text-center">
                <a :href="'https://foundation.uc.edu/donate?id=' + selectedCollege.guid" class="btn btn-primary">Donate Now</a>
            </div>-->
        </b-modal>
    </div>
</template>

<script>
import _ from "lodash";
import $ from "jquery";
import { colleges } from "@/store";
import { funds } from "@/store/funds";

export default {
    name: "carousel",
    data() {
        return {
            currentOffset: 0,
            windowSize: 10,
            paginationFactor: 220,
            items: [
                { name: "Tycoon Thai", tag: "Thai" },
                { name: "Ippudo", tag: "Japanese" },
                { name: "Milano", tag: "Pizza" },
                { name: "Tsing Tao", tag: "Chinese" },
                { name: "Frances", tag: "French" },
                { name: "Burma Superstar", tag: "Burmese" },
                { name: "Salt and Straw", tag: "Ice cream" }
            ],
            selectedCollege: [],
            funds: funds,
            colleges: []
        };
    },
    computed: {
        atEndOfList() {
            return (
                this.currentOffset <=
                this.paginationFactor *
                    -1 *
                    (this.alphaColleges.length - this.windowSize)
            );
        },
        atHeadOfList() {
            return this.currentOffset === 0;
        },
        alphaColleges() {
            return _.orderBy(colleges, "text");
        },
        alphaFunds() {
            let result = funds;

            // var fundObject = _.uniqBy(funds, "title");

            var fundArray = _.uniqBy(result, "title");
            var collegeValues = [];
            if (collegeValues != "") {
                collegeValues = this.selectedCollege.column;
            }

            result = result.filter(
                ({ college }) => this.colleges.indexOf(college) !== -1
            );

            return _.orderBy(result, "title");
        }
    },
    methods: {
        // beforeEnter: function(el) {
        //     el.style.opacity = 0;
        // },
        moveCarousel(direction) {
            // Find a more elegant way to express the :style. consider using props to make it truly generic
            if (direction === 1 && !this.atEndOfList) {
                this.currentOffset -= this.paginationFactor;
            } else if (direction === -1 && !this.atHeadOfList) {
                this.currentOffset += this.paginationFactor;
            }
        },
        showModal(item) {
            this.selectedCollege = item;

            this.colleges = this.selectedCollege.column;

            this.$root.$emit("bv::show::modal", "modalCollege");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

$gray: #666a73;
$light-gray: #f8f8f8;

.card-carousel-wrapper {
    /* display: flex; */
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    color: $gray;
    position: relative;
    .carousel__nav {
        position: static;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: auto;
        .card-carousel--nav__left,
        .card-carousel--nav__right {
            position: absolute;
            top: 40%;
            /* bottom: 0; */
            z-index: 100;
        }
        .card-carousel--nav__left {
            left: -35px;
        }
        .card-carousel--nav__right {
            right: -35px;
        }
    }
    /* .nav-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 100%;
    } */
    .card-carousel {
        /* display: flex;
        justify-content: center; */
        width: 100%;
        /* margin-left: -130%;
        @include transition(all 1.5s linear); */

        &--overflow-container {
            overflow: hidden;
        }

        &--nav__left,
        &--nav__right {
            display: inline-block;
            width: 15px;
            height: 15px;
            padding: 10px;
            box-sizing: border-box;
            border-top: 2px solid $red;
            border-right: 2px solid $red;
            cursor: pointer;
            margin: 0 10px;
            transition: transform 150ms linear;
            &[disabled] {
                opacity: 0.2;
                border-color: $black;
            }
        }

        &--nav__left {
            transform: rotate(-135deg);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            &:active {
                transform: rotate(-135deg) scale(0.9);
            }
        }

        &--nav__right {
            transform: rotate(45deg);
            &:active {
                transform: rotate(45deg) scale(0.9);
            }
        }
        .card-carousel-cards {
            display: flex;
            justify-content: center;
            transition: transform 150ms ease-out;
            transform: translatex(0px);

            -webkit-overflow-scrolling: touch;
            -ms-overflow-style: -ms-autohiding-scrollbar;

            padding-bottom: 70px;

            .card-carousel--card {
                margin: 0 10px;
                cursor: pointer;
                box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
                    0 2px 2px 0 rgba(40, 44, 53, 0.08);
                background-color: $white;
                border: 1px solid rgba(40, 44, 53, 0.08);
                border-radius: 50%;
                @include transition(all 0.4s ease);

                z-index: 3;
                margin-bottom: 2px;
                position: relative;
                /* padding: 0 0.5rem 2.5rem; */
                /* padding-bottom: 1em; */
                /* padding-bottom: 2rem; */
                flex-wrap: nowrap;
                /* flex: 1 1 0; */

                position: relative;
                display: inline-block;
                vertical-align: top;
                height: 0;
                padding-bottom: 15%;
                width: 0;

                padding-left: 15%;

                &:hover {
                    box-shadow: none;
                }

                &:first-child {
                    margin-left: 0;
                }

                &:last-child {
                    margin-right: 0;
                }

                /* img {
                    vertical-align: bottom;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;
                    transition: opacity 150ms linear;
                    user-select: none;

                    &:hover {
                        opacity: 0.5;
                    }
                } */

                .text-container {
                    position: absolute;
                    /* top: 20%;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto; */
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 95%;
                    /* height: 50%; */
                }
                &--footer {
                    border-top: 0;
                    padding: 7px 15px;

                    p {
                        padding: 3px 0;
                        margin: 0;
                        margin-bottom: 2px;
                        font-size: 1rem;
                        line-height: 1.25;
                        font-weight: 500;
                        color: $black;
                        user-select: none;

                        &:nth-of-type(2) {
                            font-size: 12px;
                            font-weight: 300;
                            padding: 6px;
                            background: rgba(40, 44, 53, 0.06);
                            display: inline-block;
                            position: relative;
                            margin-left: 4px;
                            color: $gray;

                            &:before {
                                content: "";
                                float: left;
                                position: absolute;
                                top: 0;
                                left: -12px;
                                width: 0;
                                height: 0;
                                border-color: transparent rgba(40, 44, 53, 0.06)
                                    transparent transparent;
                                border-style: solid;
                                border-width: 12px 12px 12px 0;
                            }

                            &:after {
                                content: "";
                                position: absolute;
                                top: 10px;
                                left: -1px;
                                float: left;
                                width: 4px;
                                height: 4px;
                                border-radius: 2px;
                                background: white;
                                box-shadow: -0px -0px 0px #004977;
                            }
                        }
                    }
                }
                button {
                    position: absolute;
                    bottom: -60px;
                    left: 0;
                    right: 0;
                    padding: 0.375rem 0.13rem !important;
                    font-weight: bold;
                }
            }
        }
    }
}

/* .slide-enter-active, */
/* .slide-leave-active { */
/* margin-left: 0%; */
/* @include transition(all 1.5s linear); */
/* transition: opacity 1.5s ease-in;
} */

/* .slide-enter,
.slide-leave-to {
    margin-left: -130%;
    opacity: 0;
} */

/* .slide-enter-active,
.slide-leave-active { */
// /* margin-left: 0%; */
// @include transition(all 1.5s linear);
/* transition: opacity 1.5s ease-in;
} */

/* .slide-enter,
.slide-leave-to {
    margin-left: -130%;
    opacity: 0;
} */

.init-slide {
    margin-left: -130%;
    opacity: 0;
}

.modal {
    padding: 0 !important;
}
</style>
