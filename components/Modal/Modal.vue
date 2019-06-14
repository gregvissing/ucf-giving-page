<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h2>{{ item.name }}</h2>
                    </div>
                    <div class="modal-body">
                        <h3>About</h3>
                        {{ item.about }}
                        <hr>
                        <h3>Vision</h3>
                        {{ item.vision }}
                        <hr>
                        <h3>Funding Opportunities</h3>
                        <div class="accordion" id="accordionExample">
                            <div
                                class="card"
                                v-for="(fund, index) in item.fundingOpportunities"
                                :key="index"
                            >
                                <div class="card-header" :id="'heading' + index">
                                    <h2 class="mb-0">
                                        <button
                                            class="btn btn-link"
                                            type="button"
                                            data-toggle="collapse"
                                            :data-target="'#collapse' + index"
                                            aria-expanded="false"
                                            :aria-controls="'collapse' + index"
                                        >
                                            <font-awesome-icon icon="plus"/>
                                            {{ fund.name }}
                                        </button>
                                    </h2>
                                </div>
                                <div
                                    :id="'collapse' + index"
                                    class="collapse"
                                    :aria-labelledby="'heading' + index"
                                    data-parent="#accordionExample"
                                >
                                    <div class="card-body">
                                        <div
                                            v-for="(item, index) in fund.funds"
                                            :key="index"
                                        >{{ item.fundName }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr>
                        <h3>Funding Opportunities</h3>

                        <div v-for="(fund, index) in item.fundingOpportunities" :key="index">
                            <strong>{{ fund.name }}</strong>
                            <div
                                v-for="(item, index) in fund.funds"
                                :key="index"
                            >{{ item.fundName }}</div>
                        </div>
                    </div>

                    <button class="modal-default-button" @click="$emit('close')">X</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "modal",
    // props: ["item"],
    props: {
        item: {
            type: String
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

.modal-mask {
    position: fixed;
    z-index: 99999998;
    top: 97px;
    left: 0;
    width: 100%;
    height: 100%;
    border-top: 1px solid $white;
    background-color: rgba(0, 0, 0, 0.75);
    display: table;
    transition: opacity 0.3s ease;
    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
        .modal-container {
            width: 100%;
            margin: 0px auto;
            padding: 0px 0px 20px !important;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
            transition: all 0.3s ease;
            font-family: Helvetica, Arial, sans-serif;
            position: relative;
            .modal-header {
                background: $black;
                border-radius: 0;
                border-bottom: 3px solid $red;
                h2 {
                    margin-top: 0;
                    color: $white;
                }
            }
            .modal-body {
                margin: 20px 0;
                padding: 10px 20px;
                h3 {
                    margin: 0 !important;
                    font-weight: bold;
                    color: $black;
                }
            }
            .modal-default-button {
                position: absolute;
                top: 0;
                right: 0;
                width: 35px;
                height: 35px;
                margin: auto;
                border-color: $black;
                color: $white;
                background: $red;
            }
        }
    }
}
.modal-default-button {
    float: right;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.modal-enter {
    opacity: 0;
}
.modal-leave-active {
    opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
