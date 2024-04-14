import { useModal, Modal, ModalAction, ModalTitle } from "~/store/modal";
import CreateUser from "../pages/system/users/CreateUser.vue";
export enum Components {
  CreateUser = "CreateUser",
}

function getComponentData(component: Components): any {
  switch (component) {
    case Components.CreateUser:
      return CreateUser;
  }
}

export default function openModal(passingComponent: Components): void {
  const modal = useModal();
  const modalTitle: Record<Components, ModalTitle[]> = {
    CreateUser: [
      {
        title: "Add new user",
      },
    ],
  };
  const modalActions: Record<Components, ModalAction[]> = {
    CreateUser: [
      {
        label: "Close",
        buttonClass: "btn-outline-secondary mr-1",
        callback: (emit: (event: string, payload?: any) => void) => {
          emit('close', /* optional payload */);
          modal.close();
        },
      },
      {
        label: "Send",
        buttonClass: "btn-primary",
        callback: async (emit: (event: string, payload?: any) => void) => {
          await emit('save', /* optional payload */);
          // modal.close();
        },
      },
    ],
  };

  modal.open(
    getComponentData(passingComponent),
    modalTitle[passingComponent],
    modalActions[passingComponent]
  );
}
