<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useModal } from "../../store/modal";
const modal = useModal();
const { view, titles, actions } = storeToRefs(modal);
const props = defineProps({
  isLoading: Boolean
})
// convert all state properties to reactive references to be used on view

// reactive container to save the payload returned by the mounted view
const model = {};
const emit = defineEmits(['save', 'close']);

const handleActionClick = (action: any) => {
  const { callback, ...data } = action;
  callback((event: any, payload: any) => {
    emit(event, payload);
  }, data.view)
};
</script>

<template>
  <!-- BEGIN: Modal Content -->
  <div id="base_modal" class="modal fade" :class="modal.isOpen ? 'show' : ''" tabindex="-1" role="dialog"
    :aria-hidden="true" style="margin-top: 0px; margin-left: 0px; padding-left: 0px; z-index: 55">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- BEGIN: Modal Header -->
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">
            <h2 class="font-medium text-base mr-auto" v-for="title in titles">{{ title.title }}</h2>
          </h2>
          <div class="dropdown sm:hidden">
            <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false"
              data-tw-toggle="dropdown">
              <i data-lucide="more-horizontal" class="w-5 h-5 text-slate-500"></i>
            </a>
          </div>
        </div>
        <!-- END: Modal Header -->
        <!-- BEGIN: Modal Body -->
        <div class="modal-body grid gap-4 gap-y-3">
          <component v-if="modal.isOpen" :is="view" v-model="model" :data="modal.data"></component>
        </div>
        <!-- END: Modal Body -->
        <!-- BEGIN: Modal Footer -->
        <div class="modal-footer" style="position: relative;">
          <button v-for="action in actions" :key="action.label" :disabled="props.isLoading" class="btn w-20" :style="action.isLoading ? 'position: absolute; right: 10px; min-height: 38px;' : 'margin-right: 90px;'" :class="action.buttonClass + (props.isLoading ? ' cursor-not-allowed' : '')"
            @click="handleActionClick(action)">
            <template v-if="action.isLoading">
              <template v-if="props.isLoading">
                <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
                  <svg aria-hidden="true" class="h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg>
                </div>
              </template>
              <template v-else>
                <div>
                  {{ action.label }}
                </div>
              </template>
            </template>
            <template v-else>
              <div>
                {{ action.label }}
              </div>
            </template>
          </button>
        </div>
        <!-- END: Modal Footer -->
      </div>
    </div>
  </div>

  <!-- END: Modal Content -->
</template>
