<template>
    <ClientOnly>
        <div>
            <div
                class="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700">
                <div class="h-full flex items-center">
                    <!-- BEGIN: Logo -->
                    <a href="" class="logo -intro-x hidden md:flex xl:w-[180px] block">
                        <img alt="Midone - HTML Admin Template" class="logo__image w-6" src="/images/logo.svg">
                        <span class="logo__text text-white text-lg ml-3"> Enigma </span>
                    </a>
                    <!-- END: Logo -->
                    <!-- BEGIN: Breadcrumb -->
                    <breadcrumb />
                    <!-- END: Breadcrumb -->
                    <!-- BEGIN: Search -->
                    <search />
                    <!-- END: Search -->
                    <!-- BEGIN: Account Menu -->
                    <account-menu />
                    <!-- END: Account Menu -->
                </div>
            </div>
            <div class="flex overflow-hidden">
                <LayoutSidebar />
                <div class="content">
                    <slot />
                </div>
            </div>
        </div>
    </ClientOnly>


</template>
