<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <b-form-row>
            <!-- <b-col cols="12">Choose a Fund to Impact</b-col>
            <b-col cols="12">
                <b-button-group>
                    <b-button variant="outline-primary">Button 1</b-button>
                    <b-button variant="outline-primary">Button 2</b-button>
                </b-button-group>
            </b-col>
            <b-col cols="12">
                <hr>
            </b-col>-->
            <b-col cols="12" class="titlebar">How much will you give?</b-col>
            <b-col cols="12" class="stepBody">
                <Amounts v-model="amtValue"/>
            </b-col>

            <b-col cols="12" class="titlebar">How often will you give?</b-col>
            <b-col cols="12" class="stepBody text-center">
                <!-- <GiftType v-model="form.giftType"/> -->
                <GiftType :giftTypes="giftTypes" :selected.sync="giftType" v-model="giftType"/>

                <!-- <b-button-group>
                    <b-button @click="giftTypeToggle(once)" variant="outline-primary">Right Now</b-button>
                    <b-button disabled size="lg" variant="outline-secondary">-- OR --</b-button>
                    <b-button @click="giftTypeToggle(monthly)" variant="outline-primary">Monthly</b-button>
                </b-button-group>-->
                <br>
                Gift Type: {{ giftType }}
            </b-col>

            <b-col cols="12" class="titlebar">Is this gift in honor or memory of a person or pet?</b-col>
            <b-col cols="12" class="stepBody text-center">
                <b-button-group>
                    <b-button variant="outline-primary">No</b-button>
                    <b-button variant="outline-primary">In Honor</b-button>
                    <b-button variant="outline-primary">In Memory</b-button>
                </b-button-group>
            </b-col>

            <b-col cols="8">
                <label>Choose a Campaign Fund?</label>
                <b-button-group vertical size="md" class="mb-1">
                    <b-button variant="outline-primary">Greatest Need</b-button>
                    <b-button variant="outline-primary">Fund/Cincinnatus Scholarship Fund</b-button>
                    <b-button variant="outline-primary">Next Lives Here Fund</b-button>
                    <b-button variant="outline-primary">President's Transformation Fund</b-button>
                    <b-button variant="outline-primary">Student Need Scholarship Fund</b-button>
                    <b-button variant="outline-primary">UC Bicentennial Fund</b-button>
                </b-button-group>
            </b-col>
            <b-col>{{ greatest }}</b-col>
            <b-col cols="4">
                <label>Search all Funds?</label>
                <b-button
                    size="lg"
                    variant="secondary"
                    @click="showModal"
                    v-b-modal.modal-xl
                >Search Funds</b-button>

                <SearchModal id="searchModal"/>
            </b-col>
        </b-form-row>
    </div>
</template>

<script>
import $ from "jquery";
import { mapState } from "vuex";
import { giftTypes } from "@/store/form";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import Amounts from "~/components/UI-Components/Amounts.vue";
import SearchModal from "~/components/Modal/SearchModal.vue";

import GiftType from "~/components/Form/GiftType.vue";
import { giftTypeValues } from "@/store/form";

export default {
    props: ["clickedNext", "currentStep"],
    mixins: [validationMixin],
    components: {
        Amounts,
        SearchModal,
        GiftType
    },
    data() {
        return {
            giftType: "",
            giftTypes: giftTypeValues,
            amtValue: "",
            greatest: "",
            form: {
                giftType: ""
            },
            selected: "",
            value: null,
            options: ["list", "of", "options"]
        };
    },
    validations: {
        form: {
            giftType: {
                // required
            }
        }
    },
    watch: {
        selected: function(val) {
            this.$emit("input", val);
        },
        $v: {
            handler: function(val) {
                if (!val.$invalid) {
                    this.$emit("can-continue", { value: true });
                } else {
                    this.$emit("can-continue", { value: false });
                    setTimeout(() => {
                        this.$emit("change-next", { nextBtnValue: false });
                    }, 3000);
                }
            },
            deep: true
        },
        clickedNext(val) {
            console.log(val);
            if (val === true) {
                this.$v.form.$touch();
            }
        }
    },
    methods: {
        otherValue() {
            this.selected = "";
            this.showOther = true;
        },
        showModal(item) {
            // this.selectedFund = item;
            this.$root.$emit("bv::show::modal", "searchModal");
        },
        giftTypeToggle: function(val) {
            console.log(val);
        }
    },
    mounted() {
        if (!this.$v.$invalid) {
            this.$emit("can-continue", { value: true });
        } else {
            this.$emit("can-continue", { value: false });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.form-row {
    border: 1px solid $black;
    .col-12 {
        &.titlebar {
            background-color: $black;
            color: $white;
            padding: 0.5em 1em;
            font-weight: bold;
        }
        &.stepBody {
            padding: 1em;
            label {
                padding: 0 2em;
                vertical-align: middle;
            }
        }
    }
    .col-12 .col-8,
    .col-4,
    .col {
        padding: 1em;
        &:nth-child(2) {
            .btn-group-vertical {
                width: 100%;
                max-width: 100%;
            }
        }
    }
    label {
        font-weight: bold;
        display: block;
    }
}

#giftTypes {
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
        display: block !important;
        position: relative;
        padding: 1rem !important;
        &.active {
            &.focus {
                box-shadow: none !important;
                outline: none !important;
            }
        }
        > span {
            position: absolute;
            left: 0;
            right: 0;
        }
    }
}
</style>
