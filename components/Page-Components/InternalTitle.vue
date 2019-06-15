<template>
    <h1>{{title}}</h1>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import { mapState } from "vuex";

export default {
    props: ["name"],
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
/* @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"; */

h1 {
    color: $white;
}
</style>
