<template>
  <Modal :show="open" size="small" source="confirmation" asAlert class="z-[75]">
    <template #body>
      <div class="flex space-x-2 my-2 mb-10">
          <Avatar :variant="type" :icon="theme.toast(type).icon" />
        <div>
          <slot>
            <h2 class="font-bold text-lg">{{ title }}</h2>
            <p class="text-sm" v-html="description"></p>
          </slot>

          <div class="mt-3" v-if="phrase && phrase.length">
           <p class="text-xs text-slate-500"> Enter the phrase <b>'{{ phrase }}'</b></p>
           <input @keyup.enter="emit('ok'); confirmPhrase = ''" type="text" v-model="confirmPhrase" class="focus:ring-green-500 focus:border-green-500 block w-full text-xs border-gray-300 placeholder-gray-400 dark:bg-dark-box dark:border-gray-600 rounded leading-none py-1.5 mt-1" placeholder="Enter phrase" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <slot name="footer">
        <div class="flex space-x-5">
          <CButton :disabled="(phrase && (phrase.length > 0) && (confirmPhrase !== phrase)) || loading" :variant="type" @click="emit('ok'); confirmPhrase = ''">
            <span v-if="loading">
              <i class="fad fa-spinner-third animate-spin"></i>
              Loading ..
            </span>
            <span v-else>Ok</span>
          </CButton>
          <CButton variant="secondary" @click="emit('cancel')">Cancel</CButton>
        </div>
      </slot>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/page/Modal.vue";
import CButton from "@/components/elements/CButton.vue";
import Avatar from "@/components/elements/Avatar.vue";
import {inject, ref} from "vue";
import {ThemeGenerator} from "@/library/ThemeGenerator";

export default {
  name: "Confirmation",
  props:{
    phrase:{type: String, default:''},
    open:{type:Boolean, default: false},
    loading:{type:Boolean, default: false},
    type:{type:String, default: 'danger' },
    title: { type: String},
    description: { type: String}
  },
  components:{
        Modal, CButton, Avatar
  },
  setup(props, {emit}){
    const emitter = inject('emitter')
    const theme = new ThemeGenerator()
    let confirmPhrase = ref('')


    emitter.on('close_modal', (source)=>{
      if (source==='confirmation'){
        emit('close')
      }
    })

    return {emit, theme, confirmPhrase}
   }
}
</script>

<style scoped>

</style>
