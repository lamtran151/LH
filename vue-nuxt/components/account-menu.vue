<script setup lang="ts">
import { useAuthStore } from '../store/auth/auth';
const isOpen = ref(false)
const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const { logUserOut } = useAuthStore();

const logout = async () => {
    debugger
    await logUserOut();
};
</script>
<template>
    <div class="intro-x dropdown w-8 h-8">
        <div class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
            <button @click="toggleDropdown">
                <img alt="Midone - HTML Admin Template" src="/images/profile-5.jpg">
            </button>
        </div>
        <transition enter-active-class="transition-all ease-linear duration-150"
            enter-from-class="absolute !mt-5 invisible opacity-10 translate-y-1"
            enter-to-class="!mt-1 visible opacity-100 translate-y-0"
            leave-active-class="transition-all ease-linear duration-150"
            leave-from-class="!mt-1 visible opacity-100 translate-y-0"
            leave-to-class="absolute !mt-5 invisible opacity-10 translate-y-1">
            <div class="dropdown-menu w-56" :class="isOpen ? 'show' : ''" v-if="isOpen">
                <ul
                    class="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                    <li class="p-2">
                        <div class="font-medium">Christian Bale</div>
                        <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">Backend Engineer</div>
                    </li>
                    <li>
                        <hr class="dropdown-divider border-white/[0.08]">
                    </li>
                    <li>
                        <a href="" class="dropdown-item hover:bg-white/5"> <i data-lucide="user"
                                class="w-4 h-4 mr-2"></i> Profile </a>
                    </li>
                    <li>
                        <a href="" class="dropdown-item hover:bg-white/5"> <i data-lucide="edit"
                                class="w-4 h-4 mr-2"></i> Add Account </a>
                    </li>
                    <li>
                        <a href="" class="dropdown-item hover:bg-white/5"> <i data-lucide="lock"
                                class="w-4 h-4 mr-2"></i> Reset Password </a>
                    </li>
                    <li>
                        <a href="" class="dropdown-item hover:bg-white/5"> <i data-lucide="help-circle"
                                class="w-4 h-4 mr-2"></i> Help </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider border-white/[0.08]">
                    </li>
                    <li>
                        <nuxt-link href="/auth/login" @click="logout" class="dropdown-item hover:bg-white/5">
                            <i data-lucide="toggle-right" class="w-4 h-4 mr-2"></i> Logout
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </transition>

    </div>
</template>