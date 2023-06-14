import Swal from "sweetalert2";

const initSwalSuccess = (title) => {
  Swal.fire({
    title,
    toast: true,
    position: "top-end",
    icon: "success",
    width: "max-content",
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    timer: 1500,
    timerProgressBar: true,
  });
};
const initSwalError = (title) => {
  Swal.fire({
    title,
    toast: true,
    icon: "error",
    position: "top-end",
    width: "max-content",
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    timer: 2000,
    timerProgressBar: true,
  });
};

export { initSwalSuccess, initSwalError };
