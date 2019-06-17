<template>
    <SimpleCarousel
        :height="200"
        :are-prev-next-elements-visible="true"
        :min-item-width-in-percentage="minItemWidthInPercentage"
        :is-drag-enabled="true"
        :item-padding="5"
    >
        <div class="banner" v-for="(college, index) in alphaColleges" :key="index">
            <div class="banner-item">
                <font-awesome-icon
                    size="2x"
                    :icon="college.icon"
                    :style="{ color: college.color }"
                />
                <p class="text-center">{{ college.text }}</p>

                <b-button block variant="outline-primary" @click="showModal(college)">View Funds</b-button>
            </div>
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
    </SimpleCarousel>
</template>

<script>
import _ from "lodash";
import $ from "jquery";
import { colleges } from "@/store";
import { funds } from "@/store/funds";
import SimpleCarousel from "@/components/UI-Components/CarouselTemplate.vue";

export default {
    name: "simplecarousel",
    components: {
        SimpleCarousel
    },

    data: () => ({
        items: "",
        minItemWidthInPercentage: 84,
        selectedCollege: [],
        funds: funds,
        colleges: []
    }),
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
    },
    methods: {
        onClick() {
            console.log("asda");
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

* {
    box-sizing: border-box;
}

body {
    margin-top: 60px;

    @media only screen and (max-width: 500px) {
        margin: 60px 0;
    }
}

/* #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 1400px;
    text-align: center;
    /* color: #2c3e50; */
/* margin: 0 auto;
    padding: 0 20px;

    @media only screen and (max-width: 500px) {
        padding: 0;
    } */
/* } */

/* button {
    outline: none;
    border: none;
} */

.banner {
    min-width: 25%;
    height: 100%;
    padding: 0 5px;
    /* margin: 0 5px; */

    .banner-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 100%;
        height: 100%;
        padding: 10px;
        border-radius: 3px;
        /* background: url("https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2018/12/cat-parody-instagram-removal.jpg"); */
        /* background: url("https://placekitten.com/200/250"); */
        background-size: cover;
        background-position: center center;
        border: 1px solid #999;
        font-weight: 600;

        p {
            font-weight: normal;
        }

        svg {
            flex: 1;
            margin: 15px;
        }

        .dummy-button {
            width: 50%;
            padding: 10px 20px;
            background: $red;
            color: $white;
            border-radius: 3px;
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
        }
    }

    @media only screen and (max-width: 1100px) {
        width: 20%;
        min-width: 20%;
    }

    @media only screen and (max-width: 700px) {
        width: 50%;
        min-width: 50%;
    }

    @media only screen and (max-width: 500px) {
        width: 84%;
        min-width: 84%;
    }
}
</style>
