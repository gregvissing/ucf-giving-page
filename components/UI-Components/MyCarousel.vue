<template>
    <div class="carousel-view">
        <transition-group class="carousel" tag="div">
            <div v-for="slide in slides" class="slide" :key="slide.id">
                <div class="text-container text-center">
                    <font-awesome-icon
                        size="2x"
                        :icon="slide.icon"
                        :style="{ color: slide.color }"
                    />
                    <div>
                        <p>{{ slide.text }}</p>
                    </div>
                </div>
                <b-button block variant="outline-primary" @click="showModal(slide)">View Funds</b-button>
            </div>
        </transition-group>
        <div class="carousel-controls">
            <button class="carousel-controls__button prev" @click="previous">
                <!-- <font-awesome-icon size="2x" icon="angle-left"/> -->
            </button>
            <button class="carousel-controls__button next" @click="next">
                <!-- <font-awesome-icon size="2x" icon="angle-right"/> -->
            </button>
        </div>

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
        </b-modal>
    </div>
</template>

<script>
import _ from "lodash";
import $ from "jquery";
import { colleges } from "@/store";
import { funds } from "@/store/funds";

export default {
    data() {
        return {
            slides: [],
            selectedCollege: [],
            funds: funds,
            colleges: []
        };
    },
    created: function() {
        this.loadColleges();
    },
    methods: {
        next() {
            const first = this.slides.shift();
            this.slides = this.slides.concat(first);
        },
        previous() {
            const last = this.slides.pop();
            this.slides = [last].concat(this.slides);
        },
        loadColleges: function() {
            let result = colleges;

            this.slides = _.orderBy(result, "text");
        },
        showModal(item) {
            this.selectedCollege = item;

            this.colleges = this.selectedCollege.column;

            this.$root.$emit("bv::show::modal", "modalCollege");
        }
    },
    computed: {
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
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.carousel-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .carousel {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;

        width: 100%;
        min-height: 15em;

        .slide {
            flex: 0 0 10em;
            height: 10em;
            margin: 1em 0.5em;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border: 1px solid rgba(40, 44, 53, 0.08);
            border-radius: 50%;
            @include transition(all 0.4s ease-in-out);
            /* transition: transform 0.3s ease-in-out; */
            box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
                0 2px 2px 0 rgba(40, 44, 53, 0.08);
            position: relative;
            vertical-align: top;

            &:hover {
                box-shadow: none;
            }

            &:first-of-type {
                opacity: 0;
            }

            &:last-of-type {
                opacity: 0;
            }
            .text-container {
                padding: 10px 5px;
                p {
                    margin-top: 20px;
                    line-height: 1.2;
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
    .carousel-controls {
        position: absolute;
        top: 40%;
        /* bottom: 0; */
        left: 0;
        right: 0;
        margin: auto;
        z-index: auto;
        display: flex;
        justify-content: space-between;
        .carousel-controls__button {
            position: absolute;
            display: inline-block;
            width: 15px;
            height: 15px;
            padding: 10px;
            box-sizing: border-box;
            border-top: 2px solid $red;
            border-right: 2px solid $red;
            cursor: pointer;
            margin: 0 10px;
            @include transition(transform 150ms linear);
            /* transition: transform 150ms linear; */
            &.prev {
                left: -50px;
                transform: rotate(-135deg);
                /* flex: 1;
                display: flex;
                justify-content: center;
                flex-direction: column; */
            }
            &.next {
                transform: rotate(45deg);
                right: -50px;
            }
        }
    }
}
</style>
