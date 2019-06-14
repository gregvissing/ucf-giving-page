<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <b-form-row>
            <b-col cols="6">
                <b-form-group id="input-group-2" label="Tribute Information:" label-for="input-2">
                    <b-form-select
                        v-model="Tribute.Type"
                        :options="tributeType"
                        :class="['mb-0', ($v.Tribute.Type.$error) ? 'is-danger' : '']"
                    >
                        <!-- This slot appears above the options from 'options' prop -->
                        <template slot="first">
                            <option :value="null" disabled>-- Please select an option --</option>
                        </template>

                        <!-- These options will appear after the ones from 'options' prop -->
                        <!-- <option value="C">Option C</option>
                        <option value="D">Option D</option>-->
                    </b-form-select>
                    <p v-if="$v.Tribute.Type.$error" class="help is-danger">The Title is required</p>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col cols="6">
                <b-form-group
                    id="input-group-2"
                    class="field"
                    label="First Name:"
                    label-for="input-2"
                >
                    <b-form-input
                        id="input-2"
                        v-model="Tribute.FirstName"
                        :class="['input', ($v.Tribute.FirstName.$error) ? 'is-danger' : '']"
                        required
                        placeholder="Enter first name"
                    ></b-form-input>
                    <p
                        v-if="$v.Tribute.FirstName.$error"
                        class="help is-danger"
                    >The first name is required</p>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group
                    id="input-group-2"
                    class="field"
                    label="Last Name:"
                    label-for="input-2"
                >
                    <b-form-input
                        id="input-2"
                        v-model="Tribute.LastName"
                        :class="['input', ($v.Tribute.LastName.$error) ? 'is-danger' : '']"
                        required
                        placeholder="Enter last name"
                    ></b-form-input>
                    <p
                        v-if="$v.Tribute.LastName.$error"
                        class="help is-danger"
                    >The last name is required</p>
                </b-form-group>
            </b-col>
        </b-form-row>

        <!-- <b-form-row>
            <b-col cols="6">
                <b-form-group id="input-group-2" class="field" label="Phone #:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="Tribute.Phone"
                        :options="options.phoneNumber"
                        required
                        placeholder="Enter Phone #"
                    ></b-form-input>
                    <p v-if="$v.Tribute.Phone.$error" class="help is-danger">This phone # is invalid</p>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group id="input-group-2" class="field" label="Email:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="Tribute.EmailAddress"
                        required
                        placeholder="Enter email"
                    ></b-form-input>
                    <p
                        v-if="$v.Tribute.EmailAddress.$error"
                        class="help is-danger"
                    >This email is invalid</p>
                </b-form-group>
            </b-col>
        </b-form-row>-->
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ $store.state.form }}</pre>
        </b-card>
    </div>
</template>

<script>
import $ from "jquery";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
// import Cleave from "../src/index.js";
// import "cleave.js/dist/addons/cleave-phone.us.js";

export default {
    props: ["clickedNext", "currentStep"],
    mixins: [validationMixin],
    data() {
        return {
            Donor: {
                Title: "",
                FirstName: "",
                LastName: "",
                Phone: "",
                EmailAddress: ""
            },
            Tribute: {
                Type: "",
                FirstName: "",
                LastName: ""
                // Description: "",
                // TributeDefinition: {
                //     Type: "",
                //     FirstName: "",
                //     LastName: "",
                //     Description: ""
                // }
            },
            tributeType: [
                { value: "honor", text: "In Honor of" },
                { value: "memorium", text: "In Memorium" }
            ],
            options: {
                phoneNumber: {
                    phone: true,
                    phoneRegionCode: "US",
                    delimiter: "-"
                }
            }
        };
    },
    validations: {
        Tribute: {
            Type: {
                // required
            },
            FirstName: {
                // required
            },
            LastName: {
                // required
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
                this.$v.Tribute.$touch();
            }
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
</style>
