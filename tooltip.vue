<template>
  <div
    ref="containerRef"
    :class="{
      relative: !detachBody,
      static: detachBody,
    }"
  >
    <slot
      name="trigger"
      :is-open="isOpen"
      :toggle="toggle"
      :open="open"
      :close="close"
    />
    <transition name="fade">
      <div
        v-if="isOpen"
        class="font-8 absolute z-40 h-fit w-[200px] rounded-md bg-color-1 p-3 text-start text-neutral-2 shadow-40 before:absolute before:h-0 before:w-0 before:border-b-[8px] before:border-l-[8px] before:border-r-[8px] before:border-b-color-1 before:border-l-transparent before:border-r-transparent before:content-['']"
        :class="{
          'w-full': fullWidth,
          'left-1/2 -translate-x-1/2 before:-top-2 before:left-1/2 before:-translate-x-1/2':
            align === TOOLTIP_ALIGN.BOTTOM_CENTER,
          'left-1/2 -translate-x-1/2 before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:rotate-180':
            align === TOOLTIP_ALIGN.TOP_CENTER,
          '-left-4 before:-top-2 before:left-[17px]': align === TOOLTIP_ALIGN.BOTTOM_LEFT,
          '-left-4 before:-bottom-2 before:left-[17px] before:rotate-180':
            align === TOOLTIP_ALIGN.TOP_LEFT,
          '-right-4 before:-top-2 before:right-[17px]': align === TOOLTIP_ALIGN.BOTTOM_RIGHT,
          '-right-4 before:-bottom-2 before:right-[17px] before:rotate-180':
            align === TOOLTIP_ALIGN.TOP_RIGHT,
        }"
        :style="bodyOffsetStyle"
      >
        <slot
          name="body"
          :close="close"
          :toggle="toggle"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  ref, computed,
} from 'vue';
import {
  onClickOutside,
} from '@vueuse/core';

import {
  BODY_OFFSET,
  TBodyOffset,
  TTooltipAlign,
  TOOLTIP_ALIGN,
} from '@/components/tooltip/tooltip';

interface IProps {
  align?: TTooltipAlign;
  bodyOffsetY?: TBodyOffset;
  bodyOffsetX?: TBodyOffset;
  detachBody?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  align: 'BOTTOM_CENTER',
  bodyOffsetY: BODY_OFFSET.NO_OFFSET,
  bodyOffsetX: BODY_OFFSET.NO_OFFSET,
  detachBody: false,
  fullWidth: false,
});

// eslint-disable-next-line func-call-spacing, no-spaced-func
defineEmits<{
  (event: 'toggle', value: boolean): void;
}>();

const containerRef = ref<HTMLElement | null>(null);

const isOpen = ref<boolean>(false);

const bodyOffsetStyle = computed(() => {
  switch (props.align) {
    case TOOLTIP_ALIGN.BOTTOM_CENTER:
      return {
        top: `calc(100% + ${props.bodyOffsetY})`,
      };
    case TOOLTIP_ALIGN.BOTTOM_LEFT:
      return {
        top: `calc(100% + ${props.bodyOffsetY})`,
        left: `${props.bodyOffsetX}`,
      };
    case TOOLTIP_ALIGN.BOTTOM_RIGHT:
      return {
        top: `calc(100% + ${props.bodyOffsetY})`,
        right: `${props.bodyOffsetX}`,
      };
    case TOOLTIP_ALIGN.TOP_CENTER:
      return {
        bottom: `calc(100% + ${props.bodyOffsetY})`,
      };
    case TOOLTIP_ALIGN.TOP_LEFT:
      return {
        bottom: `calc(100% + ${props.bodyOffsetY})`,
        left: `${props.bodyOffsetX}`,
      };
    case TOOLTIP_ALIGN.TOP_RIGHT:
      return {
        bottom: `calc(100% + ${props.bodyOffsetY})`,
        right: `${props.bodyOffsetX}`,
      };
    default:
      return {};
  }
});

const close = () => {
  isOpen.value = false;
};

const open = () => {
  isOpen.value = true;
};

const toggle = () => {
  if (isOpen.value) {
    close();
  } else {
    open();
  }
};

onClickOutside(containerRef, () => {
  close();
});
</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
