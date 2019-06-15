<template>
    <div>
        <b-container class="main">
            <p>Your support of the University of Cincinnati and UC Health changes lives. From creating vital student scholarships to funding leading-edge research to providing for world-class patient care, our donors make a difference. Browse our Areas to Support database to see where you can make an impact at UC and UC Health.</p>
            <hr>
        </b-container>
        <b-container>
            <ul class="cards">
                <li class="cards__item" v-for="(card, index) in cards" :key="index">
                    <div class="card">
                        <div class="card__content">
                            <div class="card__title">{{ card.title }}</div>
                            <p class="card__text">{{ card.text }}</p>
                            <b-button variant="primary" @click="showModal(card)">View Details</b-button>
                            <!-- <button class="btn btn-primary">View Details</button> -->
                        </div>
                    </div>
                </li>
            </ul>

            <b-modal
                id="modalWhyGive"
                hide-footer
                cancel-disabled
                size="lg"
                :title="selected.title"
            >
                <p class="my-4">
                    <strong>Description:</strong>
                    {{ selected.text }}
                </p>
            </b-modal>
        </b-container>
    </div>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
import { mapState } from "vuex";
import { whygive } from "@/store";

export default {
    name: "why-give",
    pageTitle: "Why Give",
    scrollToTop: true,
    layout: "internal",
    data() {
        return {
            cards: whygive,
            selected: []
        };
    },
    methods: {
        showModal(item) {
            this.selected = item;
            this.$root.$emit("bv::show::modal", "modalWhyGive");
        }
    },

    computed: {
        ...mapState(["page"])
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
