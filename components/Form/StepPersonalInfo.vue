<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <!-- <b-form-row>
        <b-col>-->
        <!-- <b-form-input id="input-2" v-model="message"></b-form-input> -->
        <!-- {{personalTitle}}
            </b-col>
        </b-form-row>-->
        <b-form-row>
            <b-col cols="6">
                <b-form-group id="input-group-2" label="Title:" label-for="input-2">
                    <b-form-select
                        v-model="title"
                        :options="titles"
                        :class="['mb-0', ($v.Donor.Title.$error) ? 'is-danger' : '']"
                    >
                        <!-- This slot appears above the options from 'options' prop -->
                        <template slot="first">
                            <option :value="null" disabled>-- Please select an option --</option>
                        </template>

                        <!-- These options will appear after the ones from 'options' prop -->
                        <!-- <option value="C">Option C</option>
                        <option value="D">Option D</option>-->
                    </b-form-select>
                    <p v-if="$v.Donor.Title.$error" class="help is-danger">The Title is required</p>
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
                        v-model="firstName"
                        :class="['input', ($v.Donor.FirstName.$error) ? 'is-danger' : '']"
                        required
                        placeholder="Enter first name"
                    ></b-form-input>
                    <p
                        v-if="$v.Donor.FirstName.$error"
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
                        v-model="lastName"
                        :class="['input', ($v.Donor.LastName.$error) ? 'is-danger' : '']"
                        required
                        placeholder="Enter last name"
                    ></b-form-input>
                    <p
                        v-if="$v.Donor.LastName.$error"
                        class="help is-danger"
                    >The last name is required</p>
                </b-form-group>
            </b-col>
        </b-form-row>

        <b-form-row>
            <b-col cols="6">
                <b-form-group id="input-group-2" class="field" label="Phone #:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="phone"
                        :options="options.phoneNumber"
                        required
                        placeholder="Enter Phone #"
                    ></b-form-input>
                    <p v-if="$v.Donor.Phone.$error" class="help is-danger">This phone # is invalid</p>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group id="input-group-2" class="field" label="Email:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="emailAddress"
                        required
                        placeholder="Enter email"
                    ></b-form-input>
                    <p
                        v-if="$v.Donor.EmailAddress.$error"
                        class="help is-danger"
                    >This email is invalid</p>
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
import { required, email } from "vuelidate/lib/validators";
// import Cleave from "../src/index.js";
// import "cleave.js/dist/addons/cleave-phone.us.js";

export default {
    props: ["clickedNext", "currentStep"],
    mixins: [validationMixin],
    data() {
        return {
            //Donor: {
            // Title: "",
            // FirstName: "",
            // LastName: "",
            // Phone: "",
            // EmailAddress: ""
            //},
            titles: [
                { value: "Miss", text: "Miss" },
                { value: "Mr", text: "Mr." },
                { value: "Mrs", text: "Mrs." },
                { value: "Ms", text: "Ms." },
                { value: "1st Lieutenant", text: "1st Lieutenant" },
                { value: "2nd Lieutenant", text: "2nd Lieutenant" },
                { value: "ADM", text: "ADM" },
                { value: "BG", text: "BG" },
                { value: "Bishop", text: "Bishop" },
                { value: "Brigadier General", text: "Brigadier General" },
                { value: "Brother", text: "Brother" },
                { value: "Captain", text: "Captain" },
                { value: "CDR", text: "CDR" },
                { value: "Chaplain", text: "Chaplain" },
                { value: "Colonel", text: "Colonel" },
                { value: "Commander", text: "Commander" },
                { value: "CPT", text: "CPT" },
                { value: "Dean", text: "Dean" },
                { value: "Dean Emeritus", text: "Dean Emeritus" },
                { value: "Dr.", text: "Dr." },
                { value: "Ensign", text: "Ensign" },
                { value: "Dean", text: "Dean" },
                { value: "Dean Emeritus", text: "Dean Emeritus" },
                { value: "Dr.", text: "Dr." },
                { value: "Ensign", text: "Ensign" },
                { value: "Father", text: "Father" },
                {
                    value: "Field Svc Instructor-Geo",
                    text: "Field Svc Instructor-Geo"
                },
                { value: "General", text: "General" },
                { value: "Governor", text: "Governor" },
                { value: "The Honorable", text: "The Honorable" },
                { value: "Judge", text: "Judge" },
                { value: "LCDR", text: "LCDR" },
                { value: "Lt Col", text: "Lt Col" },
                { value: "LtCol", text: "LtCol" },
                { value: "Lt Gen", text: "Lt Gen" },
                { value: "LTC", text: "LTC" },
                { value: "LTG", text: "LTG" },
                { value: "Lt.", text: "Lt." },
                { value: "Lt. Colonel", text: "Lt. Colonel" },
                { value: "Lt. Commander", text: "Lt. Commander" },
                { value: "Lt. Corporal", text: "Lt. Corporal" },
                { value: "Lt. General", text: "Lt. General" },
                { value: "Lt. Governor", text: "Lt. Governor" },
                { value: "Lt. Junior Grade", text: "Lt. Junior Grade" },
                { value: "Magistrate", text: "Magistrate" },
                { value: "Major", text: "Major" },
                { value: "Major General", text: "Major General" },
                { value: "Master Sergeant", text: "Master Sergeant" },
                { value: "Mayor", text: "Mayor" },
                { value: "Monsignor", text: "Monsignor" },
                { value: "Most Reverend", text: "Most Reverend" },
                { value: "Pastor", text: "Pastor" },
                { value: "Professor", text: "Professor" },
                { value: "Rabbi", text: "Rabbi" },
                { value: "Rear Admiral", text: "Rear Admiral" },
                { value: "Rep.", text: "Rep." },
                { value: "The Reverend", text: "The Reverend" },
                { value: "The Reverend Dr.", text: "The Reverend Dr." },
                { value: "Senator", text: "Senator" },
                { value: "Sergeant", text: "Sergeant" },
                { value: "Sir", text: "Sir" },
                { value: "Sister", text: "Sister" },
                { value: "Staff Sergeant", text: "Staff Sergeant" },
                { value: "SSgt", text: "SSgt" },
                { value: "VADM", text: "VADM" }
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
        Donor: {
            Title: {
                // required
            },
            FirstName: {
                // required
            },
            LastName: {
                // required
            },
            Phone: {
                // required
            },
            EmailAddress: {
                // required,
                // email
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
        }
    },
    mounted() {
        if (!this.$v.$invalid) {
            this.$emit("can-continue", { value: true });
        } else {
            this.$emit("can-continue", { value: false });
        }
    },
    computed: {
        title: {
            get() {
                return this.$store.state.form.Donor.Title;
            },
            set(value) {
                this.$store.commit("updateDonorTitle", value);
            }
        },
        firstName: {
            get() {
                return this.$store.state.form.Donor.FirstName;
            },
            set(value) {
                this.$store.commit("updateDonorFirstName", value);
            }
        },
        lastName: {
            get() {
                return this.$store.state.form.Donor.LastName;
            },
            set(value) {
                this.$store.commit("updateDonorLastName", value);
            }
        },
        phone: {
            get() {
                return this.$store.state.form.Donor.Phone;
            },
            set(value) {
                this.$store.commit("updateDonorPhone", value);
            }
        },
        emailAddress: {
            get() {
                return this.$store.state.form.Donor.EmailAddress;
            },
            set(value) {
                this.$store.commit("updateDonorEmailAddress", value);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";
</style>
