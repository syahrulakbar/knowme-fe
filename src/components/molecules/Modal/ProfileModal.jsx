import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Gap, Input } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUser } from "../../../config/Redux/Action";
import ProfilePicture from "../../../assets/images/profilePicture.png";
import { initSwalError } from "../../../utils/alert-initiator";
import { IoMdAdd, RiDeleteBin5Line, AiFillCamera } from "../../../utils/icon-library";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState(null);
  const [sosialMedia, setSosialMedia] = useState([{ github: "" }]);
  const { token, account, isUpdate } = useSelector((state) => state.globalReducer);
  const { user } = account;

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("role", values.role);
    formData.append("about", values.about);
    formData.append("picture", values.picture);
    formData.append("sosialMedia", JSON.stringify(sosialMedia.filter((item) => Object.values(item)[0] !== "")));
    try {
      await dispatch(updateUser(token, isUpdate, formData));
      dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || "",
      name: user?.name || "",
      role: user?.role || "",
      about: user?.about || "",
      picture: user?.picture || null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      picture: Yup.mixed()
        .test("fileSize", "Image size maks 3 MB", (value) => {
          if (value.size) {
            const maxSize = 3 * 1024 * 1024;
            return value.size <= maxSize;
          }
          return true;
        })
        .test("imageType", "Only image files are allowed", (value) => {
          if (value.type) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
            return allowedTypes.includes(value.type);
          }
          return true;
        }),
    }),
    onSubmit: handleUpdate,
  });

  const handleAddSocialMedia = () => {
    if (sosialMedia?.length === 3) {
      return initSwalError("Sorry, only 3 social media");
    }
    setSosialMedia([{ github: "" }, ...sosialMedia]);
  };

  const handleChangeSocialMedia = (event, index) => {
    const { value } = event.target;
    setSosialMedia((prevSosialMedia) => {
      const updatedSosialMedia = [...prevSosialMedia];
      updatedSosialMedia[index] = { [value]: Object.values(updatedSosialMedia[index]) };
      return updatedSosialMedia;
    });
  };

  const handleDeleteSocialMedia = (event, index) => {
    event.preventDefault();
    const list = [...sosialMedia];
    list.splice(index, 1);
    setSosialMedia(list);
  };

  const handleChangeInputSocialMedia = (event, index) => {
    const { value } = event.target;
    setSosialMedia((prevSosialMedia) => {
      const updatedSosialMedia = [...prevSosialMedia];
      const selectedSocialMedia = Object.keys(updatedSosialMedia[index])[0];
      updatedSosialMedia[index] = { [selectedSocialMedia]: value };
      return updatedSosialMedia;
    });
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("picture", file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleCloseModal = (event) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: false, modal: "" } });
  };

  useEffect(() => {
    if (user) {
      setSosialMedia(user?.sosialMedia);
      setImgPreview(`http://localhost:3000/assets/${user?.picture}`);
    }
  }, [user]);

  return (
    <>
      <div className="w-[80%] max-h-[95vh] md:max-h-max  bg-white text-black dark:text-white dark:bg-black rounded-lg  z-10 overflow-y-auto p-2">
        <h2 className="text-center font-medium text-2xl p-2">Edit Profile</h2>
        <div className="flex flex-col md:flex-row">
          <div id="profile-image" className="w-full md:w-1/3 flex justify-center">
            <div className="w-full">
              <div className="w-full flex justify-center">
                <div className="relative w-[200px] h-[200px]">
                  <img loading="lazy" className=" object-cover object-top absolute inset-0 w-full h-full p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={imgPreview || ProfilePicture} alt="Bordered avatar" />
                  <Input accept="image/*" id="picture" name="picture" type="file" className="absolute z-10 p-0 h-[200px] opacity-0" onChange={(event) => handleChangeImage(event)} />
                  <div className="absolute right-5 bottom-0 p-2 rounded-full bg-white text-black ring-2 ring-gray-300 dark:ring-gray-500">
                    <AiFillCamera size={30} />
                  </div>
                </div>
              </div>
              <div className="w-full text-center">
                <Gap height={10} />
                <label htmlFor="picture">Change Photo Profile</label>
                {formik.errors.picture && <p className="text-red-500 text-xs">{formik.errors.picture}</p>}
              </div>
            </div>
          </div>
          <form className="p-2 w-full" onSubmit={formik.handleSubmit}>
            <Input label="Email" name="email" id="email" type="text" {...formik.getFieldProps("email")} />
            <Gap height={20} />
            <Input label="Name" name="name" id="name" type="text" {...formik.getFieldProps("name")} />
            <Gap height={20} />
            <Input label="Job" name="role" id="role" type="text" {...formik.getFieldProps("role")} />
            <Gap height={20} />
            <Input label="Bio" name="about" id="about" type="text" {...formik.getFieldProps("about")} />
            <Gap height={20} />
            <p>Sosial Media</p>
            <div className="w-full h-28 overflow-x-auto">
              {sosialMedia?.map((item, index) => (
                <div key={index} className="w-full flex gap-2 flex-row  my-2">
                  <div className="flex flex-col md:flex-row w-5/6 md:w-[95%] gap-2">
                    <select onChange={(event) => handleChangeSocialMedia(event, index)} value={Object.keys(item)[0]} name="sosialMedia" id="sosialMedia" className="text-black font-medium h-10 rounded-md bg-gray-200">
                      <option value="github">Github</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">Linkedin</option>
                    </select>
                    <Input value={Object.values(item)[0]} type="text" onChange={(event) => handleChangeInputSocialMedia(event, index)} />
                  </div>
                  <Button type="button" onClick={(event) => handleDeleteSocialMedia(event, index)} className="text-red-600 ">
                    <RiDeleteBin5Line size={20} />
                  </Button>
                </div>
              ))}
            </div>
            <Gap height={10} />
            <Button label="Add Social Media" type="button" onClick={handleAddSocialMedia} className=" flex gap-2 flex-row-reverse  items-center bg-sky-100  text-blue-700 p-1 rounded-md">
              <IoMdAdd size={15} />
            </Button>
            <Gap height={30} />
          </form>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row justify-center gap-2">
          <Button
            disabled={formik.isSubmitting}
            label="Cancel"
            className=" dark:text-white dark:border-white w-full text-primary-black  rounded-md border-2 border-primary-black text-lg p-2 font-semibold"
            type="button"
            onClick={(event) => handleCloseModal(event)}
          />
          <Button
            disabled={formik.isSubmitting}
            label={formik.isSubmitting ? "Loading..." : "Update"}
            className="bg-primary-blue dark:text-white  w-full text-white rounded-md  text-lg p-2 font-semibold"
            type="button"
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
