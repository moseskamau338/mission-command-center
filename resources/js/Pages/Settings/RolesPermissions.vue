<template>
<h4 class="text-lg font-semibold text-slate-500 dark:text-slate-400">Roles & Permissions</h4>
<p class="dark:text-slate-500 text-xs">
    Roles are groups into which you can categorize certain users in the systems. A Role (group) hase multiple permissions.
</p>
<form @submit.prevent="updatePassword" class="mt-4">
  <h5 class="text-sm font-bold text-slate-500">Manage Roles</h5>
   <div>
      <label for="name" class="text-xs font-semibold text-slate-400">Name</label>
       <div class="mt-1 relative w-1/2 rounded-md shadow-sm flex items-center space-x-2">
        <input type="text" required name="name" id="name" class="focus:ring-green-500 focus:border-green-500 w-full block pr-10 sm:text-sm border-gray-300 dark:bg-dark dark:border-slate-600 rounded-md" placeholder="E.g Admin">
           <button type="submit" class="text-sm bg-primary h-fit px-4 py-1 rounded hover:bg-opacity-60">Save</button>
       </div>

   </div>

  <!--<div class="w-full flex space-x-2 mt-5">-->
  <!--  <PrimaryButton>Save</PrimaryButton>-->
  <!--  <PrimaryButton class="bg-transparent" type="reset">Cancel</PrimaryButton>-->
  <!--</div>-->

</form>

 <TableLite :records="[]" :headers="[
     {key: 'role'},
     {key: 'permissions'},
     {key: 'No. Users'},
 ]" />

</template>

<script setup>
import {ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TableLite from "@/Components/Tables/TableLite.vue";

    const old = ref('password')
    const newPassword = ref('password')
    const confirmPassword = ref('password')
    const showOld = ref(false)
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)

    const updatePassword = () => {
      console.log('Will submit')
    }
</script>

<style scoped>

</style>
