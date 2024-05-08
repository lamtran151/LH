import { defineStore } from "pinia";

export type Modal = {
  isOpen: boolean;
  view: object;
  titles?: ModalTitle[];
  actions?: ModalAction[];
  data?: Object;
};

export type ModalTitle = {
  title: string;
};

export type ModalAction = {
  label: string;
  buttonClass?: string;
  callback: (props?: any) => void;
};

export const useModal = defineStore("modal", {
  state: (): Modal => ({
    isOpen: false,
    view: shallowRef({}),
    titles: [],
    actions: [],
    data : shallowRef({})
  }),

  actions: {
    open(view: object, titles?: ModalTitle[], actions?: ModalAction[], data?: Object) {
      this.isOpen = true;
      this.actions = actions;
      this.titles = titles;
      // using markRaw to avoid over performance as reactive is not required
      this.view = markRaw(view);
      this.data = data;
    },

    close() {
      // Defining setTimeout to give space for the closing transition.
      this.isOpen = false;
      this.view = {};
      this.titles = [];
      this.actions = [];
    },
  },
});
