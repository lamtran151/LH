import { useModal, Modal, ModalAction, ModalTitle } from "~/store/modal";
import CreateUser from "../pages/system/users/CreateUser.vue";
export enum Components {
  CreateUser = "CreateUser",
  UpdateUser = "UpdateUser",
}

function getComponentData(component: Components): any {
  switch (component) {
    case Components.CreateUser:
      return CreateUser;
    case Components.UpdateUser:
      return CreateUser;
  }
}

export default function openModal(passingComponent: Components, data?: Object) {
  const modal = useModal();
  const modalTitle: Record<Components, ModalTitle[]> = {
    CreateUser: [
      {
        title: "Add new user",
      },
    ],
    UpdateUser: [
      {
        title: "Edit user",
      },
    ],
  };
  const modalActions: Record<Components, ModalAction[]> = {
    CreateUser: [
      {
        label: "Close",
        isLoading: false,
        buttonClass: "btn-outline-secondary mr-1",
        callback: (emit: (event: string, payload?: any) => void) => {
          emit('close', /* optional payload */);
          modal.close();
        },
      },
      {
        label: "Save",
        isLoading: true,
        buttonClass: "btn-primary",
        callback: async (emit: (event: string, payload?: any) => void) => {
          await emit('save', /* optional payload */);
          // modal.close();
        },
      },
    ],
    UpdateUser: [
      {
        label: "Close",
        isLoading: false,
        buttonClass: "btn-outline-secondary mr-1 ",
        callback: (emit: (event: string, payload?: any) => void) => {
          emit('close', /* optional payload */);
          modal.close();
        },
      },
      {
        label: "Save",
        isLoading: true,
        buttonClass: "btn-primary",
        callback: async (emit: (event: string, payload?: any) => void) => {
          await emit('save', /* optional payload */);
        },
      },
    ],
  };
  const dataEdit = ref(data);

  modal.open(
    getComponentData(passingComponent),
    modalTitle[passingComponent],
    modalActions[passingComponent],
    dataEdit
  );
}
