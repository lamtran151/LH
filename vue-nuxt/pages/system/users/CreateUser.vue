<script lang="ts" setup>
import InputCheckbox from '../../../components/form/InputCheckbox.vue';
import InputText from '../../../components/form/InputText.vue';
import CreateUser from '../../../store/entities/users/CreateUser';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../store/modules/user';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
const props = defineProps({
  data: Object
});

const createUser = reactive(new CreateUser());
const { $bus } = useNuxtApp() as unknown as NuxtBus

const { getRoles } = useUserStore(); // use auth store

const { roles } = storeToRefs(useUserStore());

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    UserName: yup.string().required(),
    Name: yup.string().required(),
    Surname: yup.string().required(),
    EmailAddress: yup.string().required().email(),
    Password: props.data != undefined ? yup.string().notRequired() : yup.string().required(),
    ConfirmPassword: props.data != undefined ? yup.string().notRequired() : yup.string().required().oneOf([yup.ref('Password')]),
  }),
});

const onSubmit = handleSubmit(values => {
  $bus.$emit("checkValid", true)
});

onMounted(async () => {
  await getRoles();
  await $bus.$on('validate', async () => {
    await onSubmit()
  })
  createUser.Id = props.data?.id
  createUser.UserName = props.data?.userName
  createUser.Name = props.data?.name
  createUser.Surname = props.data?.surname
  createUser.EmailAddress = props.data?.emailAddress
  createUser.IsActive = props.data?.isActive
  createUser.RoleNames = props.data?.roleNames
});

</script>
<template>
  <Tab>
    <TabItem title="User" id="user">
      <!-- BEGIN: Validation Form -->
      <form class="validate-form">
        <div class="grid grid-cols-2 gap-2">
          <div class="input-form">
            <InputText v-model="createUser.UserName" id="userName" label-name="UserName" placeholder="UserName"
              :entity="createUser" name="UserName" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.Name" id="name" label-name="Name" placeholder="Name" :entity="createUser"
              name="Name" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.Surname" id="surname" label-name="Surname" placeholder="Surname"
              :entity="createUser" name="Surname" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.EmailAddress" id="emailAddress" label-name="EmailAddress"
              placeholder="EmailAddress" :entity="createUser" name="EmailAddress" />
          </div>
          <div class="input-form" v-if="createUser.Id">
            <InputText v-model="createUser.Password" id="password" label-name="Password" placeholder="Password"
              :entity="createUser" name="Password" />
          </div>
          <div class="input-form" v-if="createUser.Id">
            <InputText v-model="createUser.ConfirmPassword" id="confirmPassword" label-name="ConfirmPassword"
              placeholder="ConfirmPassword" :entity="createUser" name="ConfirmPassword" />
          </div>
          <div class="input-form">
            <InputCheckbox v-model="createUser.IsActive" id="isActive" name="IsActive" label-name="IsActive" :entity="createUser" />
          </div>
        </div>
      </form> <!-- END: Validation Form -->
    </TabItem>
    <TabItem title="Roles" id="roles">
      <form class="validate-form">
        <div class="grid grid-cols-2 gap-2">
          <template v-for="role in roles">
            <div class="input-form">
              <InputCheckbox v-model="createUser.RoleNames" :id="'role' + role.id" :value="role.name"
                :label-name="role.displayName" :is-multiple="true" name="RoleNames" :entity="createUser" />
            </div>
          </template>

        </div>
      </form> <!-- END: Validation Form -->
    </TabItem>
  </Tab>
</template>
