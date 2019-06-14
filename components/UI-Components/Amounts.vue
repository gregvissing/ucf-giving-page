<template>
    <div>
        <b-form-group>
            <b-form-radio-group
                id="amounts"
                v-model="selected"
                :options="options"
                buttons
                button-variant="outline-dark"
                size="lg"
                name="radio-btn-outline"
                @change="showOther = false"
            >
                <!-- <b-button @click.prevent="otherValue" button-variant="outline-dark">
                    Other
                    <br>Amount
                    <div v-show="showOther" class="showOther">
                        <b-form-input v-model="selected" placeholder="Other Amount"></b-form-input>
                    </div>
                </b-button>-->
            </b-form-radio-group>
            <b-button block variant="outline-secondary" class="mt-1 mb-3 p-0">
                <b-form-input
                    size="md"
                    v-model="otherAmt"
                    placeholder="Other Amount"
                    class="text-center"
                ></b-form-input>
            </b-button>
        </b-form-group>
        Selected: {{selected}}
    </div>
</template>

<script>
import { amounts } from "@/store/form";

export default {
    props: {
        value: {
            default: ""
        },
        options: {
            type: Array,
            default: () => [...Object.values(amounts)]
        }
    },
    data() {
        return {
            selected: this.value,
            otherAmt: ""
        };
    },
    watch: {
        selected: function(val) {
            this.$emit("input", val);
        },
        otherAmt: function(val) {
            this.selected = val;
        }
    },
    methods: {
        otherValue() {
            this.selected = "";
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

h1 {
    font-family: "Bree Serif";
}
#amounts {
    padding: 0;
    margin: 0;
    list-style: none;

    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    justify-content: space-around;

    label {
        &.active {
            &.focus {
                box-shadow: none !important;
                outline: none !important;
            }
        }
    }
    input {
        font-weight: bold;
    }
    /* .showOther {
        position: absolute;
        top: 0;
        bottom: 0;
    } */
}
</style>
