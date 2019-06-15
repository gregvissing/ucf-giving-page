<template>
    <!-- <transition
        name="title-anim"
        mode="out-in"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
    >-->
    <h1 v-if="show">{{title}}</h1>
    <!-- </transition> -->
</template>

<script>
import $ from "jquery";
import _ from "lodash";
// import { mapState } from "vuex";

import { mapState, mapGetters } from "vuex";

export default {
    data() {
        return {
            show: false
        };
    },
    props: ["name"],
    computed: {
        ...mapState(["page"]),
        ...mapGetters(["page"]),
        title() {
            return this.$route.matched.map(r => {
                return r.components.default.options
                    ? r.components.default.options.pageTitle
                    : r.components.default.pageTitle;
                console.log("change!");
            })[0];
        }
    },
    methods: {},
    mounted() {
        this.show = true;
    },
    beforeDestroy() {
        this.show = false;
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css";

h1 {
    color: $white;
}

.title-anim-enter-active {
    animation: titlecoming 1s;
    animation-delay: 0.5s;
    opacity: 0;
}

.title-anim-leave-active {
    animation: titlegoing 1s;
}

@keyframes titlegoing {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-50px);
        opacity: 0;
    }
}

@keyframes titlecoming {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
