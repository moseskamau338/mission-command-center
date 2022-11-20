<template>
  <div :key="id" class="block h-32 relative overflow-hidden rounded">
    <!--
    * The input has an "overlayed" class which we define using @apply in the style block below
    * This ensures that no matter where you drag inside of the "drop zone" the default browser behavior for file inputs will kick in and assign that file(s) to the input
    * If we didn't do this the browser would instead just attempt to open the file in the window
    -->
    <input
      id="file_uploader_input"
      type="file"
      class="overlayed cursor-pointer"
      :multiple="multiple"
      @change="handleUpload"
      accept=".pdf,.csv,.xls,.xlsx"
    />
    <input type="hidden" name="file" id="file" v-model="files">

    <!-- The pointer-events-none class here is very important as it allows our drags and clicks to pass through to the input underneath -->
    <div
      :class="`overlayed bg-gray-100 border-gray-300 border-2 border-dashed text-gray-800 pointer-events-none flex justify-center items-center dark:border-gray-400 dark:bg-dark-box`"
    >
      <div class="text-center flex justify-center items-center h-full">
        <!-- Let's use a slot here to make our component a little more flexible (maybe the end developer would live to add an icon in there, etc) -->
        <slot v-if="!files.length>0">
          <div class="space-y-1 text-center">
            <i class="fa-duotone fa-file-circle-plus text-gray-400 mx-auto text-3xl"></i>
              <div class="flex text-sm text-gray-600 dark:text-gray-400">
                  <span class="font-bold">Upload a file</span>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, XLSX up to 2MB</p>
            </div>
        </slot>

        <!--
        * Print out the file name so the user gets the feedback that the input accepted the file appropriately
        * This is really the only part that relies on Vue,
        the actual drag and drop functionality is handled by the default browser behavior for the input.
        This puts the majority of the functionality on the browser which is great!
        That means we don't have to mess with it
        -->
        <small v-if="files.length" :class="`text-dark dark:text-slate-400 block`">
          <slot name="file" :files="files" :uploadInfo="uploadInfo">
            {{ uploadInfo }}
          </slot>
        </small>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, computed } from 'vue'
export default {
  name: "FileUploader",
  // props seem best defined in the Object API style as we're used to
  props: {
    id: { type: String, default: 'drag-and-drop-input' },
    multiple: { type: Boolean, default: true },
    color: { type: String, default: 'gray' },
  },
  // Everything else goes in a setup function
  setup(props, { emit }) {
    // keep up with the files state (think data)
    const files = ref([])

    // display the uploaded file names (think computed)
    const uploadInfo = computed(() => {
      return files.value.length === 1
        ? files.value[0].name
        : `${files.value.length} files selected`
    })

    // handle the file upload event (think methods)
    const handleUpload = (e) => {
      files.value = Array.from(e.target.files) || []
      emit('input', files.value)
    }

    return { files, uploadInfo, handleUpload }
  },
}
</script>

<style scoped>
/* Finally we use Tailwind CSS to create our overlayed class */
.overlayed {
  @apply absolute top-0 left-0 right-0 bottom-0 w-full block;
}
</style>
