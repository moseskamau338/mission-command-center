<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
})

const features = ['Staff Management', 'Student Management', 'Assesment Reports', 'Website CMS', 'Manage Applications', 'Expenses', 'Donations']

</script>

<template>
    <Head title="Welcome" />

    <main>
        <div class="w-1/3 mx-auto mt-2">
            <img src="/images/mcc-logo-01.svg" />
        </div>
        <div class="bg-white border-2 shadow-md max-w-3xl mx-auto mt-8 p-2 rounded border-slate-300">
           <p>
             This application is meant to help missionaries manage their dayily activities such as:
           </p> 
           <div class="flex flex-wrap">
               <div class="mt-2" v-for="feature in features" :key="feature">
                   <mark class="p-1 border h-fit mr-2 leading-loose text-sm font-medium bg-slate-200 rounded-sm whitespace-nowrap" v-html="feature"></mark>
               </div>
           </div>

           <div class="mt-8 flex justify-end space-x-2">
            <a href="/dashboard" class="bg-slate-800 text-slate-200 px-2 py-1 text-sm font-bold rounded-sm">Dashboard</a>
           </div>
        </div>
    </main>
</template>
