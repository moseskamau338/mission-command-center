<template>

    <div class="px-4">
      <!-- selected invoice totals -->
      <!--  <span v-if="sumSelected().value">Totals: {{sumSelected().formated}}</span>-->
      <!-- end of selected invoice totals -->


    <div class="sm:flex sm:items-center">
       <!-- headers -->
      <div class="sm:flex-auto">
        <slot name="header"></slot>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none md:ml-4">
        <!-- actions -->
        <slot name="actions"></slot>
      </div>
    </div>


    <div class="mx-4 mt-4 flex flex-col">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
           <div id="scrollable" class="ring-1 ring-black ring-opacity-5 md:rounded min-h-[150px] max-h-80 overflow-y-auto border dark:border-slate-500 rounded">
              <!-- table -->
              <table class="min-w-full table-fixed border-collapse border-2 border-transparent divide-y divide-gray-300">
                <!-- table header -->
                <thead class="sticky top-0 z-10 whitespace-nowrap bg-gray-200 dark:bg-dark">
                <tr class="py-0">
                  <th  v-for="(field, index) in headers" scope="col" class="px-2 py-3 text-left text-xs font-semibold min-w-2 group text-dark dark:text-gray-400">
                      <slot :name="'header_'+field.key" v-bind:field="field">
                        <div class="relative flex items-start">
                          <div class="flex h-5 items-center" v-show="selectable && index === 0">
                            <input id="selection" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-churpy-green focus:ring-green-500" />
                          </div>
                          <div class="ml-3 text-xs">
                            <label for="selection" class="font-medium">{{(field.label || makeTitle(field.key, '_')).toUpperCase()}}</label>
                          </div>
                        </div>
                      </slot>
                      </th>
                      <th v-if="actioned">
                        <span class="sr-only">actions</span>
                        <slot name="action_header"></slot>
                      </th>

                </tr>
                </thead>
               <!-- table body -->
               <tbody class="h-9 overflow-auto bg-white divide-y divide-gray-200 dark:divide-slate-600 dark:bg-dark/60">

                <!-- table row(s) -->
                <template v-if="!loading && data.length > 0" :key="index" v-for="(record, index) in data.slice(startIndex, endIndex)">

                  <tr class="transition-all odd:bg-gray-100 hover:bg-gray-100/60 dark:hover:bg-gray-300/20 dark:odd:bg-gray-600"
                      :class="[record.selected? 'border-l-2':'']">

                      <!-- row data -->
                  <td @click="rowClicked(record)" :key="ind" v-for="(field, ind) in headers" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                    <slot :name="field.key" v-bind:record="record">
                      <div class="relative flex items-start">
                        <div class="flex h-5 items-center" v-if="selectable && ind === 0">
                          <input v-model="record.selected" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-churpy-green hover:cursor-pointer focus:ring-green-500" />
                        </div>
                        <div class="ml-3 text-sm">
                          <label class="font-medium">{{record[field.key]}}</label>
                        </div>
                      </div>
                    </slot>
                  </td>

                      <!-- row actions -->
                      <td v-if="actioned" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">
                        <slot name="row_actions" v-bind:record="record"></slot>
                      </td>

                    </tr>

                    <slot name="inner_table" v-bind:record="record">

                    </slot>
                </template>

                      <tr v-else-if="loading">
                        <td :colspan="headers.length">
                          <div class="mt-8 text-center">
                             <i class="mr-2 animate-spin fa-duotone fa-spinner-third"></i>
                             <span class="mt-4 font-bold">Processing...</span>
                           </div>
                        </td>
                      </tr>
                      <tr v-else class="dark:bg-dark">
                        <td :colspan="headers.length">
                             <Empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>



        <Paginator v-if="!removePagination" :records="records" :totalRecords="totalRecords" @paginate-records="paginationUpdate" />

        </div>
  </div>

</template>

<script setup>
import {inject, toRef, ref} from "vue";
//import { useTables } from "@/library/tables";
import Empty from "@/Components/Empty.vue";
import Paginator from "@/Components/Tables/Pagination/Paginator.vue";

const emit = defineEmits(['paginationQueryInfo'])

  const props = defineProps({
    loading:{default:false},
    removePagination: Boolean,
    selectable:{default:false, type:Boolean},
    headers:{required:true, type:Array},
    actioned:{default:false, type:Boolean},
    url:{default:''},
    records:{
      type:Array,
      default:[]
    },
    totalRecords: {type: Number}
  })
    const {makeTitle} = inject('helpers')
    let data = toRef(props,"records");
    let startIndex = ref(0);
    let endIndex = ref(3000);
    //const {selectRow, sumSelected} = useTables()

    //function rowClicked(record){
    //  if (props.selectable){
    //     console.log('Row clicked')
    //    selectRow(record)
    //  }
    //}

    function paginationUpdate(paginatorInfo){
      console.log('[TABLELITE] Received info from paginator', paginatorInfo);
      emit("paginationQueryInfo", {info: paginatorInfo});
      //const { start, end, currentPage, currentPageSize } = paginatorInfo;

      // Update the start and end indexes
      // startIndex.value = start;
      // endIndex.value = end;

      /**
       * @TODO: do the fetching here to get the updated paginated data
       */

    }

</script>

<style scoped>

</style>
