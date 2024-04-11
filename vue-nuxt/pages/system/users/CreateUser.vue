<script lang="ts" setup>
import CreateUser from '../../../store/entities/users/CreateUser';

const createUser = reactive(new CreateUser());
const { $bus } = useNuxtApp() as unknown as NuxtBus

const test = () => {
  $bus.$emit('clickEvent', createUser)
}

</script>
<template>
  <Tab>
    <TabItem title="Tab 1" id="example-5">
      <!-- BEGIN: Validation Form -->
      <form class="validate-form">
        <div class="grid grid-cols-2 gap-2">
          <div class="input-form">
            <label for="validation-form-1" class="form-label w-full flex flex-col sm:flex-row">
              Username
            </label>
            <input id="userName" v-model="createUser.UserName" @change="test" type="text" name="userName"
              class="form-control" placeholder="John Legend">
          </div>
          <div class="input-form">
            <label for="validation-form-1" class="form-label w-full flex flex-col sm:flex-row">
              Name
            </label>
            <input id="name" type="text" name="name" class="form-control" placeholder="John Legend">
          </div>
          <div class="input-form">
            <label for="validation-form-1" class="form-label w-full flex flex-col sm:flex-row">
              Surname
            </label>
            <input id="surname" type="text" name="surname" class="form-control" placeholder="John Legend">
          </div>
          <div class="input-form">
            <label for="email" class="form-label w-full flex flex-col sm:flex-row">
              Email Address
            </label>
            <input id="email" type="text" name="email" class="form-control" placeholder="John Legend">
          </div>
          <div class="input-form">
            <label for="password" class="form-label w-full flex flex-col sm:flex-row">
              Password
            </label>
            <input id="password" type="text" name="password" class="form-control" placeholder="John Legend">
          </div>
          <div class="input-form">
            <label for="confirmPassword" class="form-label w-full flex flex-col sm:flex-row">
              Confirm Password
            </label>
            <input id="confirmPassword" type="text" name="confirmPassword" class="form-control"
              placeholder="John Legend">
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
    <TabItem title="Tab 2" id="example-6">ok2</TabItem>
  </Tab>
</template>
