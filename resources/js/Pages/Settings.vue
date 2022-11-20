<script setup>
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
    import {ref} from "vue";
    import Profile from "@/pages/Settings/Profile.vue";
    import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
    import { Head } from '@inertiajs/inertia-vue3';
    import RolesPermissions from "@/Pages/Settings/RolesPermissions.vue";

    const menus = ref([
      {type:'header', name:'User Management'},
      {type:'menu', name:'Users', icon:'fa-users', disabled: true},
      {type:'menu', name:'Roles & Permissions', icon:'fa-lock', disabled: false},
      {type:'header', name:'Account'},
      {type:'menu', name:'Profile', icon:'fa-user', disabled: false},
    ])


</script>

<template>
    <Head title="Settings" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Settings
            </h2>
        </template>

        <section class="max-w-5xl mx-auto">
           <TabGroup as="section" class="grid gap-6 grid-cols-1 lg:grid-cols-12 mt-8" vertical>
                <TabList as="div" class="col-span-3 flex flex-col text-sm w-fit space-y-2">
                  <template v-for="item in menus">
                    <span v-if="item.type === 'header'" class="font-bold text-slate-400 pt-1">{{ item.name }}</span>
                    <Tab :disabled="item.disabled" v-slot="{ selected }" v-else-if="item.type === 'menu'">
                      <button :class="[
                          selected ? 'text-slate-800 font-bold bg-primary' : 'text-slate-500',
                          item.disabled ? 'opacity-70 pointer-events-none' : ''
                        ]"
                         class="rounded text-left whitespace-nowrap px-2 py-1.5 focus:border-none focus:ring-0 hover:bg-primary hover:text-slate-800 w-full">
                        <i class="fas mr-2" :class="item.icon"></i>
                          {{ item.name }}
                      </button>
                    </Tab>
                  </template>
                </TabList>

                <TabPanels class="col-span-9 bg-white dark:bg-dark-box dark:border-slate-600 p-4 rounded border shadow">
                  <TabPanel> Settings: to be done </TabPanel>
                  <TabPanel>
                      <RolesPermissions />
                  </TabPanel>
                </TabPanels>
            </TabGroup>
        </section>
    </AuthenticatedLayout>
</template>
