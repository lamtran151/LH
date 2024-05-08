<script lang="ts" setup>
import InputCheckbox from '../../../components/form/InputCheckbox.vue';
import InputText from '../../../components/form/InputText.vue';
import CreateUser from '../../../store/entities/users/CreateUser';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../store/modules/user';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
const props = defineProps({
  data: Object,
  isOpen: Boolean
});

console.log(props.data)

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
    Password: yup.string().required(),
    ConfirmPassword: yup.string().required().oneOf([yup.ref('password')]),
  }),
});

const onSubmit = handleSubmit(values => {

  $bus.$emit("checkValid", true)
});

onMounted(async () => {
  console.log(createUser)
  await getRoles();
  await $bus.$on('validate', async () => {

    await onSubmit()
  })
  createUser.UserName = props.data?.userName
  createUser.Name = props.data?.name
  createUser.Surname = props.data?.surname
  createUser.EmailAddress = props.data?.emailAddress
  createUser.IsActive = props.data?.isActive
});

</script>
<template>
  <Tab>
    <TabItem title="Tab 1" id="example-5">
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
          <div class="input-form">
            <InputText v-model="createUser.Password" id="password" label-name="Password" placeholder="Password"
              :entity="createUser" name="Password" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.ConfirmPassword" id="confirmPassword" label-name="ConfirmPassword"
              placeholder="ConfirmPassword" :entity="createUser" name="ConfirmPassword" />
          </div>
          <div class="input-form">
            <InputCheckbox v-model="createUser.IsActive" id="isActive" label-name="IsActive" :entity="createUser" />
          </div>
        </div>
      </form> <!-- END: Validation Form -->
      <!-- BEGIN: Success Notification Content -->
      <div id="success-notification-content" class="toastify-content hidden flex"> <i class="text-success"
          data-lucide="check-circle"></i>
        <div class="ml-4 mr-4">
          <div class="font-medium">Registration success!</div>
          <div class="text-slate-500 mt-1"> Please check your e-mail for further info! </div>
        </div>
      </div> <!-- END: Success Notification Content -->
      <!-- BEGIN: Failed Notification Content -->
      <div id="failed-notification-content" class="toastify-content hidden flex"> <i class="text-danger"
          data-lucide="x-circle"></i>
        <div class="ml-4 mr-4">
          <div class="font-medium">Registration failed!</div>
          <div class="text-slate-500 mt-1"> Please check the fileld form. </div>
        </div>
      </div> <!-- END: Failed Notification Content -->
    </TabItem>
    <TabItem title="Tab 2" id="example-6">
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
