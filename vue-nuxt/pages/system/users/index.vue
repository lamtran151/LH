<script setup lang="ts">
import PageRequest from "@/store/entities/page-request";
import openModal, { Components } from "~/composables/openModal";
import { DateTime } from 'luxon'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../store/modules/user';
import CreateUser from '../../../store/entities/users/CreateUser';
import swalConfirm from "~/composables/swal";
window.DateTime = DateTime
const isLoading = ref(false)

const { $bus } = useNuxtApp() as unknown as NuxtBus

const { getUserById, deleteUser } = useUserStore();
const { res } = storeToRefs(useUserStore());

function handleOnClickOpenModal(component: Components, data?: Object) {
  openModal(component, data);
}

const fields = [{ name: "UserName", type: "string", field: "keyword" }, { name: "Name", type: "string", field: "name" }];
const types = [{ name: "Like", type: "in" }, { name: "=", type: "==" }];

const checkSquare = ref();
const trash = ref();
let entity = reactive(new CreateUser());
onMounted(async () => {
  await $bus.$on('changeInput', (data: any) => {
    // do whatever you want with data 
    entity = data;
  })

  await $bus.$on('spinnerButton', (data: boolean) => {
    // do whatever you want with data 
    isLoading.value = data
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
    responsive: 0
  },
  {
    title: "IsActive",
    field: "isActive",
    hozAlign: "center",
    vertAlign: "middle",
    headerHozAlign: "center",
    minWidth: 200,
    responsive: 0,
    headerSort: false,
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
    headerSort: false,
    formatter: (cell: any, formatterParams: any, onRendered: any) => {
      const editFunc = async () => {
        console.log("Edit button clicked!");
        handleOnClickOpenModal(Components.UpdateUser, {});
        await editById(cell._cell.row.data.id)
        handleOnClickOpenModal(Components.UpdateUser, res.value?.result)
        console.log(res.value?.result)
        mappingEntity(res.value?.result)
      };

      const deleteFunc = async () => {
        console.log("Delete button clicked!");
        await swalConfirm(await deleteById(cell._cell.row.data.id))
      };

      const editButton = window.abp.utils.createButton("edit", "Edit", checkSquare.value.innerHTML, editFunc)
      const deleteButton = window.abp.utils.createButton("delete text-danger", "Delete", trash.value.innerHTML, deleteFunc)

      const container = document.createElement("div");
      container.className = "flex lg:justify-center items-center";
      container.appendChild(editButton);
      container.appendChild(deleteButton);
      return container;
    },
  },
];

const deleteById = async (id: bigint) => {
  return async () => {
    await deleteUser(id)
    if (res.value.success) {
      $bus.$emit("reloadTable")
    }
    return res
  };
}

const validateForm = async () => {
  await $bus.$emit("validateForm")
}

const save = async () => {
  await validateForm()
}

const editById = async (id: bigint) => {
  await getUserById(id)
}

const mappingEntity = (data: any) => {
  entity.Id = data?.id
  entity.UserName = data?.userName
  entity.Name = data?.name
  entity.Surname = data?.surname
  entity.EmailAddress = data?.emailAddress
  entity.IsActive = data?.isActive
  entity.RoleNames = data?.roleNames
}
</script>
<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Tabulator</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button @click="handleOnClickOpenModal(Components.CreateUser, { isCreate: true })"
        class="btn btn-primary shadow-md mr-2">
        Add New Product
      </button>
    </div>
  </div>
  <!-- BEGIN: Users Layout -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <SearchTable :field="fields" :type="types"></SearchTable>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <ClientOnly>
        <TableTabulator ref="tableTabulator" :table-column="tableColumn" :ajax-url="'/api/User/GetAll'" :method="'POST'"
          :params="{}"></TableTabulator>
      </ClientOnly>
    </div>
  </div>

  <Modal @save="save" :isLoading="isLoading">
    <template v-slot:title></template>
  </Modal>
  <div ref="checkSquare" v-show="false">
    <LazyCustomIcon name="CheckSquare" class="w-4 h-4 mr-1" stroke-width="1.5" />
  </div>
  <div ref="trash" v-show="false">
    <LazyCustomIcon name="Trash2" class="w-4 h-4 mr-1" stroke-width="1.5" />
  </div>
</template>
