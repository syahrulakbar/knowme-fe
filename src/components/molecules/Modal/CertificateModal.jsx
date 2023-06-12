import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Gap, Input } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { getCertificateById, updateCertificate } from "../../../config/Redux/Action";
import moment from "moment";
import { BsFillCalendarDateFill } from "../../../utils/icon-library";
import { addCertificate } from "../../../config/Redux/Action";

const CertificateModal = () => {
  const dispatch = useDispatch();
  const { token, isUpdate } = useSelector((state) => state.globalReducer);
  const { certificateById, id } = useSelector((state) => state.certificateReducer);
  const Moment = moment().format("YYYY-MM");

  const handleSubmit = async (values) => {
    try {
      dispatch(addCertificate(token, isUpdate, values));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = async (values) => {
    try {
      dispatch(updateCertificate({ id, token, values, isUpdate }));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: certificateById?.name || "",
      companyName: certificateById?.companyName || "",
      urlCertificate: certificateById?.urlCertificate || "",
      credential: certificateById?.credential || "",
      issueDate: moment(certificateById?.issueDate).format("YYYY-MM") || Moment,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Certificate Name is required"),
      companyName: Yup.string().required("Issuing organization is required"),
    }),
    onSubmit: id ? handleUpdate : handleSubmit,
  });

  const handleCloseModal = (event) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
  };

  useEffect(() => {
    if (id) {
      try {
        dispatch(getCertificateById(token, id));
      } catch (error) {
        console.error(error);
      }
    }
    return () => {
      dispatch({ type: "SET_CERTIFICATE_ID", payload: {} });
    };
  }, [id]);

  return (
    <>
      <div className="w-[80%] max-h-[95vh] md:max-h-max  bg-white text-black dark:text-white dark:bg-black rounded-lg  z-10 overflow-y-auto p-2">
        <h2 className="text-center font-medium text-2xl p-2">Add Certificate</h2>
        <div className="flex flex-col md:flex-row">
          <form className="certificate p-2 w-full" onSubmit={formik.handleSubmit}>
            <Input label="Name" placeholder="Ex: Certified junior web developer" {...formik.getFieldProps("name")} />
            <Gap height={20} />
            <Input label="Issuing organization" placeholder="Ex: Microsoft" {...formik.getFieldProps("companyName")} />
            <Gap height={20} />
            <Input
              icon={<BsFillCalendarDateFill />}
              className={`pl-8 ${formik.touched.issueDate && formik.errors.issueDate && "bg-red-100 border-red-400 focus:border-red-400"}`}
              label="Issuing date"
              type="month"
              min="2000-03"
              {...formik.getFieldProps("issueDate")}
            />
            <Gap height={20} />
            <Input label="Credential ID" {...formik.getFieldProps("credential")} />
            <Gap height={20} />
            <Input label="URL Certificate" {...formik.getFieldProps("urlCertificate")} />
            <Gap height={30} />
            <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-2">
              <Button
                disabled={formik.isSubmitting}
                label="Cancel"
                className=" dark:text-white dark:border-white w-full text-primary-black  rounded-md border-2 border-primary-black text-lg p-2 font-semibold"
                type="button"
                onClick={(event) => handleCloseModal(event)}
              />
              <Button disabled={formik.isSubmitting} label={formik.isSubmitting ? "Loading..." : "Update"} className="bg-primary-blue dark:text-white  w-full text-white rounded-md  text-lg p-2 font-semibold" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CertificateModal;
