<template>
    <div style="padding: 2rem 3rem; text-align: left;">
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ $store.state.form }}</pre>
        </b-card>
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
            // Donor: {
            //     Title: "",
            //     FirstName: "",
            //     LastName: "",
            //     Phone: "",
            //     EmailAddress: ""
            // },
            // Tribute: {
            //     Type: "",
            //     FirstName: "",
            //     LastName: ""
            //     // Description: "",
            //     // TributeDefinition: {
            //     //     Type: "",
            //     //     FirstName: "",
            //     //     LastName: "",
            //     //     Description: ""
            //     // }
            // },
            // tributeType: [
            //     { value: "honor", text: "In Honor of" },
            //     { value: "memorium", text: "In Memorium" }
            // ],
            // options: {
            //     phoneNumber: {
            //         phone: true,
            //         phoneRegionCode: "US",
            //         delimiter: "-"
            //     }
            // }
        };
    },
    validations: {
        // Tribute: {
        //     Type: {
        //         // required
        //     },
        //     FirstName: {
        //         // required
        //     },
        //     LastName: {
        //         // required
        //     }
        // }
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
