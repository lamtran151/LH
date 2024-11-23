<script setup lang="ts">
import InputText from '../form/InputText.vue';

interface Field {
  name: string;
  type: string;
  field: string;
}
interface Type {
  name: string;
  type: string;
}
interface Props {
  field: Array<Field>;
  type: Array<Type>;
}

const { $bus } = useNuxtApp() as unknown as NuxtBus

const props = defineProps<Props>();
console.log(props);

const listField = reactive([{
  selectedField: props.field[0].field,
  selectedType: props.type[0].type,
  filterValue: ""
}]);

const addProps = () => {
  listField.push({
    selectedField: props.field[0].field,
    selectedType: props.type[0].type,
    filterValue: ""
  })
}

const emits = defineEmits(['update:modelValue']);

const search = async () => {
  debugger
  const params = {};
  listField.forEach((element) => {
    (params as any)[element.selectedField] = element.filterValue;
  })
  $bus.$emit("reloadTable", params)
}

</script>

<template>
  <form id="tabulator-html-filter-form" class="sm:mr-auto">

    <template v-for="p in listField" :key="p.key">
      <div class="flex mb-1">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select id="tabulator-html-filter-field" v-model="p.selectedField"
            class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
            <template v-for="item in field" :key="item.key">
              <option :value="item.field">{{ item.name }}</option>
            </template>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Type</label>
          <select id="tabulator-html-filter-type" v-model="p.selectedType"
            class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
            <template v-for="item in type" :key="item.key">
              <option :value="item.type">{{ item.name }}</option>
            </template>
            <!-- <option value="like" selected>like</option>
        <option value="=">=</option>
        <option value="<">&lt;</option>
        <option value="<=">&lt;=</option>
        <option value=">">></option>
        <option value=">=">>=</option>
        <option value="!=">!=</option> -->
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <InputText v-model="p.filterValue" :class-input="'sm:w-40 2xl:w-full mt-2 sm:mt-0'" id="filterValue"
            class-label="w-12 flex-none xl:w-auto xl:flex-initial mr-2" label-name="Value" placeholder="Search..."
            :entity="p" name="filterValue" :is-search="true" />
        </div>
      </div>

    </template>


  </form>
  <div class="mt-2 xl:mt-0">
    <button id="tabulator-html-filter-go" @click="search" type="button" class="btn btn-primary w-full sm:w-16">
      Go
    </button>
    <button id="tabulator-html-filter-reset" type="button"
      class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1">
      Reset
    </button>
    <button type="button" @click="addProps" class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1">
      Reset
    </button>
  </div>
</template>