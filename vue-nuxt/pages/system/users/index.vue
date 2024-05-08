<script setup lang="ts">
import PageRequest from "@/store/entities/page-request";
import PageResult from "@/store/entities/page-result";
import openModal, { Components } from "~/composables/openModal";
import { DateTime } from 'luxon'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../store/modules/user';
window.DateTime = DateTime
class PageUserRequest extends PageRequest {
  keyword: string;
  isActive: boolean = true;
}
const { $bus } = useNuxtApp() as unknown as NuxtBus
const { createUser, getUserById } = useUserStore();
const { res } = storeToRefs(useUserStore());
function handleOnClickOpenModal(component: Components, data?: Object) {
  openModal(component, data);
}
let pageRequest: any = new PageUserRequest();
const checkSquare = ref();
const trash = ref();
let user = ref();
onMounted(async () => {
  $bus.$on('changeInput', (data: any) => {
    // do whatever you want with data 
    user = data;
  })

  await $bus.$on('checkValid', async (data: any) => {
    // do whatever you want with data 
    
    if(data){
      saveData()
    }
  })
});
const tableColumn = [
  {
    formatter: "responsiveCollapse",
    width: 40,
    minWidth: 30,
    hozAlign: "center",
    resizable: false,
    headerSort: false,
  },
  { title: "UserName", field: "userName", minWidth: 200, responsive: 0 },
  {
    title: "Name",
    field: "name",
    minWidth: 200,
    responsive: 0,
  },
  {
    title: "IsActive",
    field: "isActive",
    hozAlign: "center",
    vertAlign: "middle",
    headerHozAlign: "center",
    minWidth: 200,
    responsive: 0,
    formatter(cell: any, formatterParams: any) {

      return `<div class="flex items-center lg:justify-center ${cell.getData().isActive ? "text-success" : "text-danger"
        }">
      ${checkSquare.value.innerHTML}
                             ${cell.getData().isActive ? "Active" : "Inactive"}
                        </div>`;
    },
  },
  {
    title: "CreationTime",
    field: "creationTime",
    minWidth: 200,
    responsive: 0,
    hozAlign: "center",
    vertAlign: "middle",
    headerHozAlign: "center",
    formatter: (cell: any) => window.abp.timing.convertLuxonTime(DateTime, cell.getValue())
  },
  {
    title: "ACTIONS",
    minWidth: 200,
    field: "actions",
    responsive: 1,
    hozAlign: "center",
    vertAlign: "middle",
    headerHozAlign: "center",
    htmlOutput: true,
    formatter: (cell: any, formatterParams: any, onRendered: any) => {
      const editFunc = async () => {
        // Xử lý logic khi nhấn vào nút "Edit"
        
        console.log("Edit button clicked!");
        await edit(cell._cell.row.data.id)
        handleOnClickOpenModal(Components.CreateUser, res.value?.result)
        // Ví dụ: điều hướng đến trang chỉnh sửa bản ghi
      };

      const deleteFunc = () => {
        // Xử lý logic khi nhấn vào nút "Delete"
        console.log("Delete button clicked!");
        // Ví dụ: xác nhận và xóa bản ghi
      };

      const createSvgElement = (svgHtml: any) => {
        const div = document.createElement("div");
        div.innerHTML = svgHtml.trim();
        return div.firstChild;
      };

      const svgElement = ref();

      const editButton = document.createElement("a");
      editButton.className = "edit flex items-center mr-3";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", editFunc);
      svgElement.value = createSvgElement(checkSquare.value.innerHTML);
      if (svgElement) {
        editButton.insertBefore(svgElement.value, editButton.firstChild);
      }

      const deleteButton = document.createElement("a");
      deleteButton.className = "delete flex items-center text-danger";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", deleteFunc);
      svgElement.value = createSvgElement(trash.value.innerHTML);
      if (svgElement) {
        deleteButton.insertBefore(svgElement.value, deleteButton.firstChild);
      }

      // Tạo một container để chứa các nút và trả về container này
      const container = document.createElement("div");
      container.className = "flex lg:justify-center items-center";
      container.appendChild(editButton);
      container.appendChild(deleteButton);
      return container;
    },
  },
];

const save = async () => {
  
  await $bus.$emit("validate")

}

const saveData = async () => {
  
  await createUser(user)
  if (res.value.success) {
    $bus.$emit("reloadTable")
    $bus.$emit("result", true)
  }

}

const edit = async (id: bigint) =>{
  
  await getUserById(id)
  // await $bus.$emit("getById", res)
}
// const fetchData = async () => {
//   pagerequest.maxResultCount = data.value.limit;
//   pagerequest.skipCount = data.value.offset;
//   pagerequest.sorting = "";
//   pagerequest.where = "";
//   pagerequest.keyword = "";
//   const response = await ajax.get(
//     "/api/services/app/User/GetAll" +
//       "?" +
//       new URLSearchParams(pagerequest).toString()
//   );
//   const responseJson = response.data.result as PageResult<User>;
//   console.log(responseJson);
//   return {
//     data: responseJson.items,
//     totalData: responseJson.totalCount,
//   };
// };
</script>
<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Tabulator</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button @click="handleOnClickOpenModal(Components.CreateUser)" class="btn btn-primary shadow-md mr-2">
        Add New Product
      </button>
      <div class="dropdown ml-auto sm:ml-0">
        <button class="dropdown-toggle btn px-2 box" aria-expanded="false" data-tw-toggle="dropdown">
          <span class="w-5 h-5 flex items-center justify-center">
            <LazyCustomIcon name="Plus" stroke-width="1.5" class="w-4 h-4" />
          </span>
        </button>
        <div class="dropdown-menu w-40">
          <ul class="dropdown-content">
            <li>
              <a href="" class="dropdown-item">
                <i data-lucide="file-plus" class="w-4 h-4 mr-2"></i> New
                Category
              </a>
            </li>
            <li>
              <a href="" class="dropdown-item">
                <i data-lucide="users" class="w-4 h-4 mr-2"></i> New Group
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- BEGIN: Users Layout -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select id="tabulator-html-filter-field" class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="remaining_stock">Remaining Stock</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Type</label>
          <select id="tabulator-html-filter-type" class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
            <option value="like" selected>like</option>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="!=">!=</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Value</label>
          <input id="tabulator-html-filter-value" type="text" class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..." />
        </div>
        <div class="mt-2 xl:mt-0">
          <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16">
            Go
          </button>
          <button id="tabulator-html-filter-reset" type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1">
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2">
          <i data-lucide="printer" class="w-4 h-4 mr-2"></i> Print
        </button>
        <div class="dropdown w-1/2 sm:w-auto">
          <button class="dropdown-toggle btn btn-outline-secondary w-full sm:w-auto" aria-expanded="false"
            data-tw-toggle="dropdown">
            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export
            <i data-lucide="chevron-down" class="w-4 h-4 ml-auto sm:ml-2"></i>
          </button>
          <div class="dropdown-menu w-40">
            <ul class="dropdown-content">
              <li>
                <a id="tabulator-export-csv" href="javascript:;" class="dropdown-item">
                  <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export
                  CSV
                </a>
              </li>
              <li>
                <a id="tabulator-export-json" href="javascript:;" class="dropdown-item">
                  <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export
                  JSON
                </a>
              </li>
              <li>
                <a id="tabulator-export-xlsx" href="javascript:;" class="dropdown-item">
                  <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export
                  XLSX
                </a>
              </li>
              <li>
                <a id="tabulator-export-html" href="javascript:;" class="dropdown-item">
                  <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export
                  HTML
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <!-- <div
        id="example-table"
        class="mt-5 table-report table-report--tabulator"
      ></div> -->
      <ClientOnly>
        <!-- ... -->
        <TableTabulator ref="tableTabulator" :table-column="tableColumn" :ajax-url="'/api/User/GetAll'" :method="'POST'"
          :params="pageRequest"></TableTabulator>
        <template #fallback>
          <!-- this will be rendered on server side -->
          <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center">
            <i data-loading-icon="puff" class="w-8 h-8"></i>
            <div class="text-center text-xs mt-2">puff</div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>

  <!-- BEGIN: Users Layout -->
  <Modal @save="save">
    <template v-slot:title></template>
  </Modal>
  <div ref="checkSquare" v-show="false">
    <LazyCustomIcon name="CheckSquare" class="w-4 h-4 mr-1" stroke-width="1.5" />
  </div>
  <div ref="trash" v-show="false">
    <LazyCustomIcon name="Trash2" class="w-4 h-4 mr-1" stroke-width="1.5" />
  </div>
</template>
