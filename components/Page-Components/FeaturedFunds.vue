<template>
    <div>
        <b-container class="featured-funds">
            <h2 class="text-center">Featured Funds</h2>

            <ul class="cards">
                <li class="cards__item" v-for="(fund, index) in featuredfunds" :key="index">
                    <div class="card">
                        <div
                            class="card__image"
                            v-bind:style="{ 'background-image': 'url(' + fund.image + ')' }"
                        ></div>
                        <div class="card__content">
                            <div class="card__title">{{ fund.title }}</div>
                            <p class="card__text">{{ fund.text }}</p>
                            <!-- <a :href="fund.donateLink" class="btn btn--block card__btn">Donate Now</a> -->

                            <b-button-group size="lg">
                                <b-button class="mr-2" variant="primary">Donate Now</b-button>
                                <b-button variant="secondary" @click="showModal(fund)">Fund Info</b-button>
                            </b-button-group>
                        </div>
                    </div>
                </li>
                <b-modal
                    id="modal1"
                    hide-footer
                    cancel-disabled
                    size="lg"
                    :title="selectedFund.title"
                >
                    <!-- <b-button
                        class="mt-3"
                        variant="outline-danger"
                        @click="hideModal"
                    >Close Me</b-button>-->

                    <p class="my-4">
                        <strong>Description:</strong>
                        {{ selectedFund.text }}
                    </p>
                    <div class="btn-container text-center">
                        <a :href="selectedFund.donateLink" class="btn btn-primary">Donate Now</a>
                    </div>
                </b-modal>
            </ul>
        </b-container>
    </div>
</template>

<script>
import { featuredfunds } from "@/store/funds";

export default {
    data() {
        return {
            featuredfunds: featuredfunds,
            selectedFund: []
        };
    },
    methods: {
        showModal(item) {
            this.selectedFund = item;
            this.$root.$emit("bv::show::modal", "modal1");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.featured-funds {
    padding: 0;
    max-width: 100%;
    margin-bottom: 2em;
    overflow: hidden;
    h2 {
        background: $black;
        color: $white;
        text-transform: uppercase;
        padding: 10px 5px;
        font-weight: bold;
    }
    .card-deck {
        .card,
        .card img {
            border-radius: 0;
        }
    }
}

/* $gray-darker: #444444;
$gray-dark: #696969;
$gray: #999999;
$gray-light: #cccccc;
$gray-lighter: #ececec;
$gray-lightest: lighten($gray-lighter, 4%); */

*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    background-color: #f0f0f0;
}

/* body {
    color: $gray;
    font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0;
    padding: 1rem;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga" on;
} */

button.close {
    background: $black !important;
    &:focus {
        outline: none !important;
    }
}

.b-modal-target {
    .modal {
        .modal-dialog {
            .modal-content {
                header.modal-header {
                    border-radius: 0 !important;
                }
            }
        }
    }
}
.modal-header {
    border-radius: 0 !important;
}

img {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
}

.btn {
    background-color: white;
    border: 1px solid $gray-light;
    //border-radius: 1rem;
    color: $white;
    padding: 0.5rem;
    text-transform: capitalize;
    /* &.btn--block {
        display: block;
        width: 100%;
    } */
}
</style>
