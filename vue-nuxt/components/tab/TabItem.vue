
import { title } from 'process';
<script lang="ts" setup>
    interface Item {
        title: string;
        id: string;
    }

    const props = defineProps<Item>();
    const selectedTab = inject('selectedTab');
</script>
<template>
    <div class="tab-content mt-5">
        <div 
            data-transition data-selector=".active" 
            data-enter="transition-[visibility,opacity] ease-linear duration-150" 
            data-enter-from="!p-0 !h-0 overflow-hidden invisible opacity-0" 
            data-enter-to="visible opacity-100" 
            data-leave="transition-[visibility,opacity] ease-linear duration-150" 
            data-leave-from="visible opacity-100" 
            data-leave-to="!p-0 !h-0 overflow-hidden invisible opacity-0" 
            :id="id" role="tabpanel" 
            :aria-labelledby="id+'-tab'" 
            class="tab-pane leading-relaxed"
            :class="selectedTab == title ? 'active' : ''">
            <slot/>
        </div>
        
    </div>
</template>