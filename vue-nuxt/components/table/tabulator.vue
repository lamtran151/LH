<script setup>
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
console.log(props.tableColumn);
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
        ),
        "Content-Type": "application/json"
      },
      method: props.method
    },
    ajaxParams: props.params,
    reactiveData: true, //enable data reactivity
    columns: props.tableColumn, //define table columns
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    pagination: "remote",
    paginationSize: 10,
    paginationSizeSelector: [10, 25, 50, 100],
    ajaxResponse: function (url, params, response) {
      //url - the URL of the request
      //params - the parameters passed with the request
      //response - the JSON object returned in the body of the response.

      return response.result.items; //pass the data array into Tabulator
    },
  });
});
</script>

<template>
  <div ref="table" class="mt-5"></div>
</template>
