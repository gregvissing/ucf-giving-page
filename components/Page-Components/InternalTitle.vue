<template>
    <!-- <div id="internal-hero">
    <b-container>
    <transition
        name="title-anim"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
    >-->
    <h1>{{title}}</h1>
    <!--</transition>
     </b-container>
    </div>-->
</template>

<script>
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
    // transition: "slide"
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

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
