<template>
    <b-modal
        id="formModal"
        hide-footer
        cancel-disabled
        size="xl"
        title="Donate Now"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
    >
        <div class="section" style="padding-top: .5rem">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">
                        <horizontal-stepper
                            :steps="steps"
                            @completed-step="completeStep"
                            :top-buttons="true"
                            :keep-alive="true"
                            @active-step="isStepActive"
                            @stepper-finished="alert"
                        ></horizontal-stepper>
                    </div>
                </div>
            </div>
        </div>

        <b-container class="close-modal">
            <b-row class="justify-content-md-center">
                <b-col>
                    <button class="btn btn-primary footer-close" @click="closeFormModal">CLOSE</button>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { mapState } from "vuex";

import HorizontalStepper from "~/components/Form/HorizontalStepper.vue";
import StepGiftType from "~/components/Form/StepGiftType.vue";
import StepGiftDetails from "~/components/Form/StepGiftDetails.vue";
import StepFundSearch from "~/components/Form/StepFundSearch.vue";
import StepPersonalInfo from "~/components/Form/StepPersonalInfo.vue";
import StepAddress from "~/components/Form/StepAddress.vue";
import StepTribute from "~/components/Form/StepTribute.vue";
import StepResult from "~/components/Form/StepResult.vue";

export default {
    name: "FormModal",
    props: {
        item: {
            type: String
        }
    },
    components: {
        HorizontalStepper
    },
    data() {
        return {
            bodyBgVariant: "dark",
            headerBgVariant: "dark",
            headerTextVariant: "light",

            steps: [
                // {
                //     icon: "list",
                //     name: "fund info",
                //     title: "Your Gift",
                //     // subtitle: "Choose Fund",
                //     component: StepFundSearch,
                //     completed: false
                // },
                {
                    icon: "list",
                    name: "fund info",
                    title: "Your Gift",
                    // subtitle: "Choose Fund",
                    component: StepGiftDetails,
                    completed: false
                },
                {
                    icon: "attach_money",
                    name: "donation info",
                    title: "Donation",
                    // subtitle: "Choose Type/Amount",
                    component: StepGiftType,
                    completed: false
                },
                {
                    icon: "person",
                    name: "personal details",
                    title: "Personal Details",
                    // subtitle: "Enter Your Info",
                    component: StepPersonalInfo,
                    completed: false
                },
                {
                    icon: "location_on",
                    name: "address",
                    title: "Address",
                    // subtitle: "Enter Your Address",
                    component: StepAddress,
                    completed: false
                },
                // {
                //     icon: "card_giftcard",
                //     name: "third",
                //     title: "Tribute",
                //     // subtitle: "Subtitle sample",
                //     component: StepTribute,
                //     completed: false
                // },
                {
                    icon: "card_giftcard",
                    name: "result",
                    title: "Result",
                    // subtitle: "Subtitle sample",
                    component: StepResult,
                    completed: true
                }
            ],
            activeStep: 0
        };
    },
    computed: {},
    methods: {
        completeStep(payload) {
            this.steps.forEach(step => {
                if (step.name === payload.name) {
                    step.completed = true;
                }
            });
        },
        isStepActive(payload) {
            this.steps.forEach(step => {
                if (step.name === payload.name) {
                    if (step.completed === true) {
                        step.completed = false;
                    }
                }
            });
        },
        alert(payload) {
            alert("end");
        },
        // showFormModal() {
        //     // this.selectedFund = item;
        //     this.$root.$emit("bv::show::modal", "formModal");
        // },
        closeFormModal() {
            this.$root.$emit("bv::hide::modal", "formModal");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

/* #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
} */
.pointer {
    cursor: pointer;
}
h1,
h2 {
    font-weight: normal;
}
hr {
    background-color: transparent;
    border: none;
    display: block;
    height: inherit;
    margin: 1.5rem 0;
    border-top: dashed 1px;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #0b99b9;
    text-decoration: underline;
}
.text-medium-grey {
    color: #333;
}
.text-light-grey {
    color: #888;
}

.box.formated {
    position: relative;
    padding: 0;
    .heading {
        font-size: 1rem;
        text-transform: capitalize;
        padding: 0.8rem 1.5rem;
        background-color: #fafafa;
    }
    .content {
        padding: 1rem 2rem;
    }
}
i.top-left {
    position: absolute;
    left: 1.5rem;
    top: 0.8rem;
}
.vertical-separator {
    display: flex;
    justify-content: space-around;
    .line {
        border-right: 1px solid #cccccc;
    }
}

#formModal {
    height: 100vh;
    background: rgba($black, 0.8);
    .modal-dialog {
        height: 100vh;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        > .modal-content {
            height: 100vh;
            .close-modal {
                position: absolute;
                bottom: 0.5em;
                left: 0;
                right: 0;
                width: 100%;
                text-align: center;
                z-index: 100;
                button {
                    padding: 0.5em 1.5em;
                    letter-spacing: 1px;
                }
            }
        }
    }
}
</style>
