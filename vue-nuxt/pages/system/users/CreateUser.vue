<script lang="ts" setup>
import InputCheckbox from '../../../components/form/InputCheckbox.vue';
import InputText from '../../../components/form/InputText.vue';
import CreateUser from '../../../store/entities/users/CreateUser';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../../store/modules/user';

const createUser = reactive(new CreateUser());
const { $bus } = useNuxtApp() as unknown as NuxtBus

const { getRoles } = useUserStore(); // use auth store

const { roles } = storeToRefs(useUserStore());

const test = () => {
  $bus.$emit('clickEvent', createUser)
}

onMounted(async () => {
  await getRoles();
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
              :entity="createUser" name="userName" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.Name" id="name" label-name="Name" placeholder="Name" :entity="createUser"
              name="name" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.Surname" id="surname" label-name="Surname" placeholder="Surname"
              :entity="createUser" name="surname" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.EmailAddress" id="emailAddress" label-name="EmailAddress"
              placeholder="EmailAddress" :entity="createUser" name="emailAddress" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.Password" id="password" label-name="Password" placeholder="Password"
              :entity="createUser" name="password" />
          </div>
          <div class="input-form">
            <InputText v-model="createUser.ConfirmPassword" id="confirmPassword" label-name="ConfirmPassword"
              placeholder="confirmPassword" :entity="createUser" name="confirmPassword" />
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
          <div class="input-form">
            <template v-for="role in roles">
              <InputCheckbox v-model="createUser.RoleNames" :id="'role' + role.id" :value="role.name"
                :label-name="role.displayName" :is-multiple="true" name="RoleNames" :entity="createUser" />
            </template>

          </div>
        </div>
      </form> <!-- END: Validation Form -->
    </TabItem>
  </Tab>
</template>
