<script setup lang="ts">
import { TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import appconst from "../../lib/appconst";
const table = ref(null); //reference to your table element
const tabulator = ref(null); //variable to hold your table
//   const tableData = reactive([]); //data for table to display
const props = defineProps({
  tableColumn: Object,
  ajaxUrl: String,
  method: String,
  params: Object
});
var params = ref(props.params);
console.log(props.tableColumn);
const reloadTable = () =>{
}
onMounted(() => {
  //instantiate Tabulator when element is mounted
  tabulator.value = new Tabulator(table.value, {
    ajaxURL: appconst.remoteServiceBaseUrl + props.ajaxUrl, //ajax URL
    ajaxConfig: {
      credentials: "same-origin", //send cookies with the request from the matching origin
      headers: {
        Authorization: "Bearer " + window.abp.auth.getToken(),
        ".AspNetCore.Culture": window.abp.utils.getCookieValue(
          "Abp.Localization.CultureName"
        )
      },
      method: props.method
    },
    ajaxContentType: "json",
    ajaxParams: params,
    reactiveData: true, //enable data reactivity
    columns: props.tableColumn, //define table columns
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    pagination: true,
    paginationMode: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 25, 50, 100],
    ajaxURLGenerator: function (url, config, params) {
      params["skipCount"] = (params.page - 1) * params.size;
      params["maxResultCount"] = params.size;
      return url;
    },
    ajaxResponse: function (url, params, response) {
      //url - the URL of the request
      //params - the parameters passed with the request
      //response - the JSON object returned in the body of the response.
      let last_page = Math.ceil(response.result.totalCount / params.size);
      return {
        data: response.result.items,
        last_page,
      };
    },
  });

  const { $bus } = useNuxtApp() as unknown as NuxtBus
  $bus.$on('reloadTable', () => {
    // do whatever you want with data 
    tabulator.value.setData()
  })
});
</script>

<template>
  <div ref="table" class="mt-5"></div>
</template>
