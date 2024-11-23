<script lang="ts" setup>
import InputCheckbox from '../../../components/form/InputCheckbox.vue';
import InputText from '../../../components/form/InputText.vue';
import CreateUser from '../../../store/entities/users/CreateUser';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../store/modules/user';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'tailvue'
import { useModal } from "../../../store/modal";
const $toast = useToast()
const modal = useModal()
const props = defineProps({
  data: Object
});

const loading = ref(false)

const entity = reactive(new CreateUser());
const { $bus } = useNuxtApp() as unknown as NuxtBus

const { getRoles, createUser, updateUser } = useUserStore(); // use auth store

const { roles, res } = storeToRefs(useUserStore());


const { handleSubmit } = useForm({
  validationSchema: yup.object({
    UserName: yup.string().required(),
    Name: yup.string().required(),
    Surname: yup.string().required(),
    EmailAddress: yup.string().required().email(),
    Password: !props.data?.isCreate ? yup.string().notRequired() : yup.string().required(),
    ConfirmPassword: !props.data?.isCreate ? yup.string().notRequired() : yup.string().required().oneOf([yup.ref('Password')]),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  await $bus.$emit("spinnerButton", true)
  try {
    if (entity?.Id) {
      await updateUser(entity)
    }
    else {
      await createUser(entity)
    }
    if (res.value.success) {
      $toast?.show({ message: res.value?.result?.toString() ?? "Success", type: "success" });
      $bus.$emit("reloadTable")
      modal.close()
    }
  } finally {
    await $bus.$emit("spinnerButton", false)
  }

});

const mappingEntity = (data: any) => {
  entity.Id = data?.id
  entity.UserName = data?.userName
  entity.Name = data?.name
  entity.Surname = data?.surname
  entity.EmailAddress = data?.emailAddress
  entity.IsActive = data?.isActive
  entity.RoleNames = data?.roleNames
}

onMounted(async () => {
  await getRoles();
  await $bus.$on('validateForm', async () => {
    await onSubmit()
  })
  mappingEntity(props.data)
  loading.value = props.data?.isCreate || entity.Id ? true : false
});

watch(() => props.data, () => {
  mappingEntity(props.data)
  loading.value = true
})

</script>
<template>
  <ClientOnly>
    <Tab v-show="loading">
      <TabItem title="User" id="user">
        <!-- BEGIN: Validation Form -->
        <form class="validate-form">
          <div class="grid grid-cols-2 gap-2">
            <div class="input-form">
              <InputText v-model="entity.UserName" id="userName" label-name="UserName" placeholder="UserName"
                :entity="entity" name="UserName" />
            </div>
            <div class="input-form">
              <InputText v-model="entity.Name" id="name" label-name="Name" placeholder="Name" :entity="entity"
                name="Name" />
            </div>
            <div class="input-form">
              <InputText v-model="entity.Surname" id="surname" label-name="Surname" placeholder="Surname"
                :entity="entity" name="Surname" />
            </div>
            <div class="input-form">
              <InputText v-model="entity.EmailAddress" id="emailAddress" label-name="EmailAddress"
                placeholder="EmailAddress" :entity="entity" name="EmailAddress" />
            </div>
            <div class="input-form" v-if="!entity.Id">
              <InputText v-model="entity.Password" id="password" label-name="Password" placeholder="Password"
                :entity="entity" name="Password" type="password" />
            </div>
            <div class="input-form" v-if="!entity.Id">
              <InputText v-model="entity.ConfirmPassword" id="confirmPassword" label-name="ConfirmPassword"
                placeholder="ConfirmPassword" :entity="entity" name="ConfirmPassword" type="password" />
            </div>
            <div class="input-form">
              <InputCheckbox v-model="entity.IsActive" id="isActive" name="IsActive" label-name="IsActive"
                :entity="entity" />
            </div>
          </div>
        </form> <!-- END: Validation Form -->
      </TabItem>
      <TabItem title="Roles" id="roles">
        <form class="validate-form">
          <div class="grid grid-cols-2 gap-2">
            <template v-for="role in roles">
              <div class="input-form">
                <InputCheckbox v-model="entity.RoleNames" :id="'role' + role.id" :value="role.name"
                  :label-name="role.displayName" :is-multiple="true" name="RoleNames" :entity="entity" />
              </div>
            </template>

          </div>
        </form> <!-- END: Validation Form -->
      </TabItem>

    </Tab>
    <div v-if="!loading">Loading...</div>
  </ClientOnly>

</template>
