<template>
<h4 class="text-lg font-semibold text-slate-500 dark:text-slate-400">Account Profile</h4>

    <table class="mt-5">
    <tr>
      <td class="text-sm font-semibold text-slate-400 pr-2">Email:</td>
      <td class="text-xs font-semibold px-5">
        <div class="flex space-x-2 items-center">
          <span>example@mail.com</span>
        </div>
      </td>
    </tr>
      <tr>
      <td class="text-sm font-semibold text-slate-400 pr-2">Name:</td>
      <td class="text-xs font-semibold px-5">
        <div class="flex space-x-2 items-center">
          <span>Moses Kamau</span>
        </div>
      </td>
    </tr>
  </table>
<form @submit.prevent="updatePassword" class="mt-4">
  <h5 class="text-sm font-bold">Manage Password</h5>
   <div>
      <label for="old-password" class="text-xs font-semibold text-slate-400">Old Password</label>
       <div class="mt-1 relative w-1/2 rounded-md shadow-sm">
        <input v-model="old" :type="showOld ? 'text' : 'password'" name="old-password" id="old-password" class="focus:ring-green-500 focus:border-green-500 w-full block pr-10 sm:text-sm border-gray-300 dark:bg-dark dark:border-slate-600 rounded-md" placeholder="*******">
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div class="flex space-x-2 items-center">
              <button @click="showOld = !showOld" class="hover:font-bold text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 h-7 w-7 p-2 flex items-center justify-center rounded-full transition-all">
                <i :class="showOld ? 'fa-eye-slash' : 'fa-eye'" class="fad text-xs"></i>
              </button>
            </div>
        </div>
      </div>
   </div>

  <div class="mt-4">
      <label for="password" class="text-xs font-semibold text-slate-400">New Password</label>
       <div class="mt-1 relative w-1/2 rounded-md shadow-sm">
        <input v-model="newPassword" :type="showPassword ? 'text' : 'password'" name="password" id="account-number" class="focus:ring-green-500 focus:border-green-500 w-full block pr-10 sm:text-sm border-gray-300 dark:bg-dark dark:border-slate-600 rounded-md" placeholder="*******">
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div class="flex space-x-2 items-center">
              <button @click="showPassword = !showPassword" class="hover:font-bold text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 h-7 w-7 p-2 flex items-center justify-center rounded-full transition-all">
                <i :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" class="fad text-xs"></i>
              </button>
            </div>
        </div>
      </div>
   </div>

  <div class="mt-4">
      <label for="confirm_password" class="text-xs font-semibold text-slate-400">Confirm Password</label>
       <div class="mt-1 relative w-1/2 rounded-md shadow-sm">
        <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" name="confirm_password" id="confirm_password" class="focus:ring-green-500 focus:border-green-500 w-full block pr-10 sm:text-sm border-gray-300 dark:bg-dark dark:border-slate-600 rounded-md" placeholder="*******">
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div class="flex space-x-2 items-center">
              <button @click="showConfirmPassword = !showConfirmPassword" class="hover:font-bold text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 h-7 w-7 p-2 flex items-center justify-center rounded-full transition-all">
                <i :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'" class="fad text-xs"></i>
              </button>
            </div>
        </div>
      </div>
   </div>

  <div class="w-full flex space-x-2 mt-5">
    <PrimaryButton>Save</PrimaryButton>
    <PrimaryButton class="bg-transparent" type="reset">Cancel</PrimaryButton>
  </div>

</form>

</template>

<script setup>
import {ref} from "vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";

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
