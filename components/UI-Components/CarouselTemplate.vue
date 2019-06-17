<template>
    <div class="simple-carousel" ref="simpleCarousel">
        <div class="carousel-inner">
            <div class="carousel-items" ref="carouselItems" :style="itemStyle">
                <slot></slot>
            </div>
        </div>
        <button
            v-if="isNavigationVisible"
            type="button"
            class="navigation navigation-left"
            :class="{ 'navigation-disabled': isFirstSlide }"
            :disabled="isFirstSlide"
            @click="slideLeft"
        >
            <svg
                width="11px"
                height="19px"
                viewBox="0 0 11 19"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#e00122"
            >
                <g stroke="none" stroke-width="1" fill-rule="evenodd">
                    <path
                        d="M0.499,9.514 L9.276,18.497 L10.494,17.25 L2.92,9.499 L10.496,1.746 L9.277,0.499 L0.5,9.483 L0.514,9.498 L0.499,9.514 L0.499,9.514 Z"
                    ></path>
                </g>
            </svg>
        </button>
        <button
            v-if="isNavigationVisible"
            type="button"
            class="navigation navigation-right"
            :class="{ 'navigation-disabled': isLastSlide }"
            :disabled="isLastSlide"
            @click="slideRight"
        >
            <svg
                width="11px"
                height="19px"
                viewBox="0 0 11 19"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#c6007e"
            >
                <g stroke="none" stroke-width="1" fill-rule="evenodd">
                    <path
                        d="M10.496,9.482 L1.719,0.499 L0.501,1.746 L8.075,9.497 L0.499,17.25 L1.718,18.497 L10.495,9.513 L10.481,9.498 L10.496,9.482 Z"
                    ></path>
                </g>
            </svg>
        </button>
        <!-- delta.x: {{ this.delta.x }}
    isTouch: {{ this.isTouch }}
    onDragged: {{ this.onDragged }}
        onEvent: {{ this.onEvent }}-->
    </div>
</template>

<script>
import ResizeObserver from "resize-observer-polyfill";

export default {
    props: {
        height: {
            type: Number,
            required: true
        },

        arePrevNextElementsVisible: {
            type: Boolean,
            default: false
        },

        minItemWidthInPercentage: {
            type: Number,
            default: 100
        },

        isDragEnabled: {
            type: Boolean,
            default: false
        },

        itemPadding: {
            type: Number,
            default: 0
        }
    },

    data: () => ({
        itemWidth: 0,
        carouselWidth: 0,
        currIndex: 1,
        observer: null,
        carouselElement: null,

        isDragging: false,
        isTouch: false,
        delta: { x: 0, y: 0 },
        startPosition: { x: 0, y: 0 },
        endPosition: { x: 0, y: 0 },
        onDragged: 0,
        onEvent: null,
        isSwiping: false
    }),

    computed: {
        itemStyle() {
            return {
                transform: `translate(0px)`
                // transform: `translate(${Number(this.offset).toString()}px)`
            };
        },

        offset() {
            return (
                this.delta.x +
                1 *
                    (0 -
                        this.currIndex * (1 * this.itemWidth) +
                        (this.arePrevNextElementsVisible &&
                        this.visibleItemsCount === 1
                            ? ((100 - this.minItemWidthInPercentage) /
                                  2 /
                                  100) *
                              this.itemWidth
                            : 0)) +
                this.itemPadding
            );
        },

        isLastSlide() {
            return this.currIndex >= this.itemsCount() - this.visibleItemsCount;
        },

        isFirstSlide() {
            return this.currIndex <= 0;
        },

        visibleItemsCount() {
            return Math.round(this.carouselWidth / this.itemWidth);
        },

        isNavigationVisible() {
            return !this.isFirstSlide || !this.isLastSlide;
        }
    },

    methods: {
        slideLeft() {
            if (this.isFirstSlide) return;
            this.currIndex--;
        },

        slideRight() {
            if (this.isLastSlide) return;
            this.currIndex++;
        },

        handleWindowResize() {
            // this.restoreStyling();
            this.carouselWidth = this.$refs.carouselItems.offsetWidth;
            this.itemWidth = this.$slots.default[0].elm.offsetWidth;
            this.adjustVisibility();
        },

        itemsCount() {
            return this.$slots.default.length;
        },

        adjustVisibility() {
            if (this.currIndex > this.itemsCount() - this.visibleItemsCount) {
                this.currIndex--;
                this.adjustVisibility();
            }
        },

        // restoreStyling() {
        //     this.$slots.default.forEach(el => el.elm.removeAttribute("style"));
        // },

        onDragStart(event) {
            this.isTouch = event.type === "touchstart";
            this.onEvent = event.type;
            if (!this.isTouch && event.button !== 0) {
                return;
            }

            this.startPosition = { x: 0, y: 0 };
            this.endPosition = { x: 0, y: 0 };
            this.isDragging = true;
            this.startPosition.x = this.isTouch
                ? event.touches[0].clientX
                : event.clientX;
            this.startPosition.y = this.isTouch
                ? event.touches[0].clientY
                : event.clientY;

            document.addEventListener(
                this.isTouch ? "touchmove" : "mousemove",
                this.onDrag,
                { passive: false }
            );
            document.addEventListener(
                this.isTouch ? "touchend" : "mouseup",
                this.onDragEnd
            );
        },

        onDrag(event) {
            this.onDragged++;
            this.endPosition.x = this.isTouch
                ? event.touches[0].clientX
                : event.clientX;
            this.endPosition.y = this.isTouch
                ? event.touches[0].clientY
                : event.clientY;
            this.delta.x = this.endPosition.x - this.startPosition.x;
            this.delta.y = this.endPosition.y - this.startPosition.y;

            const threshold = 1;
            // Vertical scrolling is prevented when you start swiping horizontally.
            this.isSwiping = Math.abs(this.delta.x) > threshold;
            if (Math.abs(this.delta.x) > threshold) {
                event.preventDefault();
                event.returnValue = false;
                return false;
            }
        },

        onDragEnd(event) {
            this.onEvent = event.type;
            const tolerance = 0.15;

            this.isDragging = false;
            const direction = 1 * Math.sign(this.delta.x);
            const draggedSlides = Math.round(
                Math.abs(this.delta.x / this.itemWidth) + tolerance
            );

            if (direction === -1) {
                for (let i = 0; i < draggedSlides; i++) {
                    this.slideRight();
                }
            } else if (direction === 1) {
                for (let i = 0; i < draggedSlides; i++) {
                    this.slideLeft();
                }
            }

            this.delta.x = 0;
            this.delta.y = 0;
            document.removeEventListener(
                this.isTouch ? "touchmove" : "mousemove",
                this.onDrag,
                { passive: false }
            );
            document.removeEventListener(
                this.isTouch ? "touchend" : "mouseup",
                this.onDragEnd
            );
        }
    },

    mounted() {
        if (this.isDragEnabled) {
            this.$refs.simpleCarousel.addEventListener(
                "mousedown",
                this.onDragStart
            );
            this.$refs.simpleCarousel.addEventListener(
                "touchstart",
                this.onDragStart
            );
        }
        this.$el.style.height = `${this.height}px`;
        this.carouselElement = this.$refs.simpleCarousel;
        this.observer = new ResizeObserver(this.handleWindowResize);
        this.observer.observe(this.carouselElement);
    },

    beforeDestroy() {
        this.observer.unobserve(this.carouselElement);
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/style.scss";

.simple-carousel {
    position: relative;
    width: 100%;

    .carousel-inner {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .carousel-items {
            display: flex;
            align-items: center;
            min-width: 100%;
            height: 100%;
            list-style: none;
            /* transition: transform 600ms cubic-bezier(0.86, 0, 0.07, 1); */
            transition: transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1);
        }
    }

    .navigation {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50% !important;
        background-color: $white;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        border: none;
        color: $red;
        transition: all 200ms;

        @media only screen and (max-width: 600px) {
            display: none;
        }

        &-left {
            left: -2em;
            transform: translateX(-40%) translateY(-50%);

            svg {
                margin-left: -10%;
            }
        }

        &-right {
            right: -2em;
            transform: translateX(40%) translateY(-50%);
        }

        &-disabled {
            background-color: #eee;
            opacity: 0.5;
        }

        &:hover {
            box-align: none;
        }
    }
}
</style>
