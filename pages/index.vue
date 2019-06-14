<template>
    <div>
        <Hero/>

        <Areas :areas="areas"/>

        <FeaturedFunds/>

        <ImpactStories/>
    </div>
</template>

<script>
import $ from "jquery";
import Vuex from "vuex";
import axios from "axios";
import { colleges } from "@/store";

// import Logo from "~/components/Logo.vue";

import Hero from "~/components/Page-Components/Hero.vue";
import Areas from "~/components/Page-Components/Areas.vue";
import FeaturedFunds from "~/components/Page-Components/FeaturedFunds.vue";
import ImpactStories from "~/components/Page-Components/ImpactStories.vue";

export default {
    scrollToTop: true,
    layout: "default",
    components: {
        Hero,
        Areas,
        FeaturedFunds,
        ImpactStories
    },
    data() {
        return {
            allFunds: [],
            areas: [],
            colleges: colleges
        };
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.main {
    background-image: url("https://www.alumni.uc.edu/image/home-full-width/MM-Geen-3.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin-top: 85px;
    @media (max-width: 991px) {
        margin-top: 65px;
    }
}
</style>
