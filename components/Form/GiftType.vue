
<template>
    <div class="form-group text-center">
        <template v-for="option in options">
            <label
                class="radio-inline btn btn-outline-secondary"
                :class="{ 'disabled': option === 'disabled', '': option !== 'disabled' }"
            >
                <input
                    type="radio"
                    :value="option"
                    :name="name"
                    v-model="selected"
                    v-if="option != 'disabled'"
                >
                <input type="radio" disabled v-else>

                <span class="label label-default" v-if="option === ''">All</span>
                <GiftLabel v-else :type="option"/>
            </label>
        </template>
    </div>
</template>

<script>
import GiftLabel from "./GiftLabel.vue";
import { giftTypeValues } from "@/store/form";

export default {
    name: "radio-group",
    components: { GiftLabel },
    props: {
        value: {
            default: ""
        },
        options: {
            type: Array,
            default: () => [...Object.keys(giftTypeValues)]
        },
        name: {
            type: String,
            default: "type-filter"
        }
    },
    data: function() {
        return { selected: this.value };
    },
    watch: {
        selected: function(val) {
            this.$emit("input", val);
        }
    }
};
</script>

<style lang="scss" scoped>
.form-group {
    vertical-align: top;
}
.radio-inline {
    padding-right: 10px;

    input {
        position: absolute;
        opacity: 0;
    }
}
</style>
