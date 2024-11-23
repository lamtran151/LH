import Swal from 'sweetalert2'
import { useToast } from 'tailvue'
export default async function swalConfirm(callback: Function, title: string = "You won't be able to revert this!") {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: title,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
        if (result.isConfirmed) {
            const resultCallback = await callback()
            if (process.client) {
                const $toast = useToast()
                debugger
                if (resultCallback.value && resultCallback.value?.success) {
                    $toast?.show({ message: resultCallback.value.result?.toString() ?? "Success", type: "success" });
                }
                else {
                    $toast?.show({ message: resultCallback.value.error?.message?.toString() ?? "Error", type: "danger" });
                }
            }
        }
    });
}