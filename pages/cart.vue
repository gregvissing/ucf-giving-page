<template>
    <div>
        <div id="internal-hero">
            <b-container>
                <transition
                    name="title-anim"
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutDown"
                    appear
                >
                    <!-- {{ title }} -->
                    <InternalTitle/>
                </transition>
            </b-container>
        </div>
        <b-container>Thank you for your {{ DesignationsLength }} gifts</b-container>

        <b-container>
            <table v-for="(designation, index) in Designations" :key="index">
                <tr>
                    <td>
                        <h3 v-html="designation.DesignationId"></h3>
                    </td>
                    <td class="text-center">
                        <p v-html="designation.Amount"></p>
                    </td>
                    <td class="text-center">
                        <font-awesome-icon icon="trash-alt" size="lg"/>
                    </td>
                </tr>
            </table>
        </b-container>

        <b-container>
            <hr>
        </b-container>

        <b-container>
            <div v-if="cartTotal > 0">
                <h1>Cart</h1>
                <div class="cartitems" v-for="item in cart" key="item">
                    <div class="carttext">
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.price | usdollar }} x {{ item.count }}</p>
                        <p>
                            Total for this item:
                            <strong>{{ item.price * item.count }}</strong>
                        </p>
                    </div>
                    <img class="cartimg" :src="`/${item.img}`" :alt="`Image of ${item.name}`">
                </div>
                <div class="total">
                    <h3>Total: {{ total | usdollar }}</h3>
                </div>
                <!-- <app-checkout :total="total" @successSubmit="success = true"></app-checkout> -->
            </div>
            <div v-else-if="cartTotal === 0 && success === false" class="empty">
                <h1>Cart</h1>
                <h3>Your cart is empty.</h3>
                <nuxt-link exact to="/">
                    <button>Fill er up!</button>
                </nuxt-link>
            </div>
            <div v-else>
                <!-- <app-success @restartCart="success = false"/> -->
                <h2>Success!</h2>
                <p>Your order has been processed, it will be delivered shortly.</p>
            </div>
        </b-container>
    </div>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
import { mapState } from "vuex";
import InternalTitle from "@/components/Page-Components/InternalTitle.vue";

export default {
    name: "gift-cart",
    pageTitle: "Gift Cart",
    scrollToTop: true,
    layout: "internal",
    data() {
        return {
            success: false
        };
    },
    components: {
        InternalTitle
    },
    computed: {
        ...mapState(["page"]),
        title() {
            return this.$route.matched.map(r => {
                return r.components.default.options
                    ? r.components.default.options.pageTitle
                    : r.components.default.pageTitle;
            })[0];
        },
        DesignationsLength() {
            return this.$store.state.form.Gift.Designations.length;
        },
        Designations() {
            return this.$store.state.form.Gift.Designations;
        },
        cart() {
            return this.$store.state.cart;
        },
        cartTotal() {
            return this.$store.state.cartTotal;
        },
        total() {
            return Object.values(this.$store.state.form.Gift.Designations)
                .reduce((acc, el) => acc + el.Amount, 0)
                .toFixed(2);
        }
        // total() {
        //     return Object.values(this.cart)
        //         .reduce((acc, el) => acc + el.count * el.price, 0)
        //         .toFixed(2);
        // }
    },
    filters: {
        usdollar: function(value) {
            return `$${value}`;
        }
    }
};
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    tr {
        border: 1px solid black;
        td {
            padding: 10px;
        }
    }
}
</style>
