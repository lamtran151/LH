<script setup lang="ts">
import { ColumnDefinition, HttpMethod, TabulatorFull as Tabulator } from "tabulator-tables"; //import Tabulator library
import appconst from "../../lib/appconst";
const table = ref(); //reference to your table element
const tabulator = ref(); //variable to hold your table
//   const tableData = reactive([]); //data for table to display
const props = defineProps({
  tableColumn: Object,
  ajaxUrl: String,
  method: String,
  params: Object
});
var params = ref(props.params);
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
      method: props.method as HttpMethod
    },
    ajaxContentType: "json",
    ajaxParams: params,
    reactiveData: true, //enable data reactivity
    columns: props.tableColumn as ColumnDefinition[], //define table columns
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    sortMode: "remote",
    pagination: true,
    paginationMode: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 25, 50, 100],
    ajaxURLGenerator: function (url, config, params) {
      debugger
      Object.keys(params._value).forEach((element) => {
        params[element] = params._value![element];
      });
      const dir = params.sort[0]?.field ? (params.sort[0]?.field + " " + (params.sort[0]?.dir == "asc" ? "ascending" : "descending")) : ""
      params["skipCount"] = (params.page - 1) * params.size;
      params["maxResultCount"] = params.size;
      params["sorting"] = dir
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
  $bus.$on('reloadTable', (data: any) => {
    if(data){
      params.value = data;
    }
    tabulator.value.setData()
  })
});
</script>

<template>
  <div ref="table" class="mt-5"></div>
</template>
