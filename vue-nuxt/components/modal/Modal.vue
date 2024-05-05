<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useModal } from "../../store/modal";
const modal = useModal();
const { isOpen, view, titles, actions } = storeToRefs(modal);

const { $bus } = useNuxtApp() as unknown as NuxtBus
$bus.$on('result', (data: any) => {
  // do whatever you want with data 
  
  if (data)
    modal.close()
})

// convert all state properties to reactive references to be used on view

// reactive container to save the payload returned by the mounted view
const model = {};
const props = defineProps(['actions']);
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
    :aria-labelledby="`create-user`" :aria-hidden="true"
    style="margin-top: 0px; margin-left: 0px; padding-left: 0px; z-index: 55">
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
          <component v-if="modal.isOpen" :is="view" v-model="model"></component>
        </div>
        <!-- END: Modal Body -->
        <!-- BEGIN: Modal Footer -->
        <div class="modal-footer">
          <button v-for="action in actions" :key="action.label" class="btn w-20" :class="action.buttonClass"
            @click="handleActionClick(action)">
            {{ action.label }}
          </button>
        </div>
        <!-- END: Modal Footer -->
      </div>
    </div>
  </div>

  <!-- END: Modal Content -->
</template>
