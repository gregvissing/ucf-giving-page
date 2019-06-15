<template>
    <b-container>
        <h1 class="text-center">Areas to Support</h1>
        <p>Your gift to the UC and UC Health makes an impact where you want. Give to your favorite college, program or department, or contribute to the university’s most pressing needs.</p>

        <Carousel/>
    </b-container>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import { colleges } from "@/store";
import Carousel from "~/components/UI-Components/Carousel.vue";

export default {
    name: "areas",
    components: { Carousel },
    props: {
        areas: {
            type: Array,
            default: ""
        }
    },
    computed: {
        alphaAreas() {
            return _.orderBy(colleges, "text");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.container {
    padding: 2em 15px;
    h1 {
        font-family: "Bree Serif";
    }
    .marquee {
        padding: 1% 0% 3% 0%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        text-align: center;
        .slideitem {
            -webkit-transition: all 0.15s ease;
            transition: all 0.15s ease;
            a {
                text-decoration: none;
                img {
                    vertical-align: middle;
                }
                h4 {
                    color: $black;
                    text-transform: capitalize;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }
            }
        }
    }
}
</style>
