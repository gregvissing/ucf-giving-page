<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <b-form-row class="justify-content-md-center">
            <b-col cols="4">
                <b-form-group
                    id="input-group-2"
                    label="Start by entering your zip code."
                    label-for="input-2"
                >
                    <b-form-input
                        id="input-2"
                        :class="['zip', ($v.Donor.Address.PostalCode.$error) ? 'is-danger' : '']"
                        v-model="postalCode"
                        required
                        placeholder="Enter Zip Code"
                        autocomplete="off"
                        type="number"
                    ></b-form-input>
                    <p
                        v-if="$v.Donor.Address.PostalCode.$error"
                        class="help is-danger"
                    >The title is required</p>
                    <!-- <p class="zip-error">Not a real zip code.</p> -->
                </b-form-group>
            </b-col>
        </b-form-row>

        <b-form-row class="cityState">
            <!-- City -->
            <b-col cols="6">
                <b-form-group id="input-group-2" label="City:" label-for="input-2">
                    <b-form-input id="input-2" v-model="city" required placeholder="Enter city"></b-form-input>
                </b-form-group>
            </b-col>
            <!-- State -->
            <b-col cols="3">
                <b-form-group id="input-group-2" label="State:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="stateCode"
                        required
                        placeholder="Enter State"
                    ></b-form-input>
                </b-form-group>
            </b-col>

            <!-- Country -->
            <b-col cols="3">
                <b-form-group id="input-group-2" label="Country:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="country"
                        required
                        placeholder="Enter country"
                    ></b-form-input>
                </b-form-group>
            </b-col>

            <!-- Street Address -->
            <b-col cols="12">
                <b-form-group id="input-group-2" label="Street Address:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        class="streetAddress"
                        v-model="streetAddress"
                        required
                        placeholder="Enter Street Address"
                    ></b-form-input>
                </b-form-group>
            </b-col>
        </b-form-row>
        <!-- <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ $store.state.form }}</pre>
        </b-card>-->
    </div>
</template>

<script>
import $ from "jquery";
import { mapState } from "vuex";
import { validationMixin } from "vuelidate";
import {
    required,
    minLength,
    between,
    withParams
} from "vuelidate/lib/validators";
const isPhone = value => /^1(3|4|5|7|8)\d{9}$/.test(value); //phone valid

export default {
    props: ["clickedNext", "currentStep"],
    mixins: [validationMixin],
    methods: {
        canContinue() {
            this.$emit("can-continue", { value: true });
        },
        is_int: function(value) {
            if (parseFloat(value) == parseInt(value) && !isNaN(value)) {
                return true;
            } else {
                return false;
            }
        },
        getCity: function() {
            let self = this;
            $.getJSON("https://ZiptasticAPI.com/" + this.postalCode, function(
                result
            ) {
                if (result.error) {
                    self.error = "zip code not found";
                    self.city = "";
                    $(".cityState").slideUp();
                    // $(".zip-error").slideDown();
                    // $(".error").addClass("no");
                } else {
                    self.city = result.city;
                    self.stateCode = result.state;
                    self.country = result.country;

                    //  self.Donor.Address.City = result.city;
                    // self.Donor.Address.State = result.state;
                    // self.Donor.Address.Country = result.country;
                    $(".cityState").slideDown();
                    // $(".zip-error").slideUp();
                    // $(".display").addClass("animated fadeInDown");
                }
                console.log(result);
            });
        }
    },

    data() {
        return {
            // Donor: {
            //     Address: {
            //         City: "",
            //         Country: "",
            //         PostalCode: "",
            //         State: "",
            //         StreetAddress: ""
            //     }
            // },
            error: "",
            // city: " ",
            show: true
        };
    },
    validations: {
        Donor: {
            Address: {
                City: {
                    // required
                },
                Country: {
                    // required
                },
                PostalCode: {
                    // required
                    // phoneValid: isPhone
                },
                State: {
                    // required
                },
                StreetAddress: {
                    // required
                }
            }
        }
    },
    watch: {
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
                this.$v.Donor.$touch();
            }
        },
        postalCode: function() {
            if (this.postalCode.length === 5) {
                this.getCity();
                this.error = "";
                $(".error").removeClass("no");
            }
            if (this.postalCode.length < 5) {
                this.city = "";
                this.error = "hey, that's not a zipcode";
                $(".error").addClass("no");
                $(".display").removeClass("animated fadeInDown");
            }
            // if (this.Donor.Address.PostalCode.length === 5) {
            //     this.getCity();
            //     this.error = "";
            //     $(".error").removeClass("no");
            // }
            // if (this.Donor.Address.PostalCode.length < 5) {
            //     this.city = "";
            //     this.error = "hey, that's not a zipcode";
            //     $(".error").addClass("no");
            //     $(".display").removeClass("animated fadeInDown");
            // }
        }
    },
    mounted() {
        $(".cityState").hide();
        this.getCity();
        //            this.$emit('can-continue', {value: true})
    },
    computed: {
        postalCode: {
            get() {
                return this.$store.state.form.Donor.Address.PostalCode;
            },
            set(value) {
                this.$store.commit("updateDonorZip", value);
            }
        },
        city: {
            get() {
                return this.$store.state.form.Donor.Address.City;
            },
            set(value) {
                this.$store.commit("updateDonorCity", value);
            }
        },
        stateCode: {
            get() {
                return this.$store.state.form.Donor.Address.State;
            },
            set(value) {
                this.$store.commit("updateDonorState", value);
            }
        },
        country: {
            get() {
                return this.$store.state.form.Donor.Address.Country;
            },
            set(value) {
                this.$store.commit("updateDonorCountry", value);
            }
        },
        streetAddress: {
            get() {
                return this.$store.state.form.Donor.Address.StreetAddress;
            },
            set(value) {
                this.$store.commit("updateDonorStreetAddress", value);
            }
        }
    }
};
</script>


<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.zip-error {
    color: #d70000;
    font: 12px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
    border-top: 2px dotted #ec9696;
    border-bottom: 2px dotted #ec9696;
    text-align: center;
    padding: 5px 10px;
    margin-top: 10px;
    display: none;
}

#giftType {
    width: 100%;
    button {
        width: 20%;
        font-weight: bold;
        border: 1px solid $white;
        padding: 1.375rem 0.75rem;
        box-sizing: border-box;
        @include transition(all 0.4s ease);
        &:hover {
            background-color: $white;
            color: $black;
            border-color: $black;
        }
    }
}
</style>
