<script lang="ts" setup>
    const slots = useSlots();
    const tabTitles = ref(slots.default().map(tab => tab.props));
    const selectedTab = ref(tabTitles.value[0].title);
    provide('selectedTab', selectedTab);
</script>

<template>
    <div>
    <ul data-tw-merge role="tablist" class="w-full flex">
        <li 
            v-for="tab in tabTitles"
            :key="tab.title"
            role="presentation" class="focus-visible:outline-none flex-1"
            :id="tab.id+'-tab'"
            data-tw-merge
            @click="selectedTab = tab.title"
            >
            <button 
                data-tw-merge 
                :data-tw-target="'#'+tab.id" 
                role="tab" 
                class="cursor-pointer block appearance-none px-5 py-2.5 border border-transparent text-slate-700 dark:text-slate-400 [&.active]:text-slate-800 [&.active]:dark:text-white border-b-2 border-transparent dark:border-transparent [&.active]:border-b-primary [&.active]:font-medium [&.active]:dark:border-b-primary w-full py-2"
                :class="selectedTab == tab.title ? 'active' : ''">{{ tab.title }}</button>
        </li>
    </ul>
    <slot/>
</div>
</template>