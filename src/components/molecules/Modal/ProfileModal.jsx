import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Gap, Input } from "../../index";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const api = import.meta.env.VITE_API_SERVER;

const ProfileModal = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const [sosialMedia, setSosialMedia] = useState([{ Github: "" }]);
  const { token, account } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { user } = account;
  const handleUpdate = async (values) => {
    const decoded = await jwtDecode(token);
    const axiosJWT = dispatch(AxiosJWTConfig(decoded.exp));

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("role", values.role);
    formData.append("about", values.about);
    formData.append("picture", values.picture);
    formData.append("sosialMedia", JSON.stringify(sosialMedia.filter((item) => Object.values(item)[0] !== "")));

    await axiosJWT
      .patch(`${api}users/${decoded.id}`, formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
      email: Yup.string().email("Invalid Email"),
    }),
    onSubmit: handleUpdate,
  });

  const handleAddSocialMedia = () => {
    setSosialMedia([...sosialMedia, { Github: "" }]);
  };
  const handleChangeSocialMedia = (event, index) => {
    const { value } = event.target;
    setSosialMedia((prevSosialMedia) => {
      const updatedSosialMedia = [...prevSosialMedia];
      updatedSosialMedia[index] = { [value]: updatedSosialMedia[index]?.[value] || "" };
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
  useEffect(() => {
    if (user) {
      setSosialMedia(user?.sosialMedia);
      setImgPreview(`http://localhost:3000/assets/${user?.picture}`);
    }
  }, [user]);

  return (
    <div className="w-[80%] absolute bg-white text-black dark:text-white dark:bg-black rounded-lg bottom-5 top-5 z-10 overflow-y-auto">
      <h2 className="text-center font-medium text-2xl p-2">Edit Profile</h2>
      <form className="p-2" onSubmit={formik.handleSubmit}>
        <img width={200} height={200} className="object-cover" src={imgPreview} alt="image" />
        <Input label="Profile Picture" accept="image/*" id="picture" name="picture" type="file" className="p-0" onChange={(event) => handleChangeImage(event)} />
        <Gap height={20} />
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
            <div key={index} className="w-full flex">
              <select onChange={(event) => handleChangeSocialMedia(event, index)} value={Object.keys(item)[0]} name="sosialMedia" id="sosialMedia" className="text-black h-10">
                <option value="Github">Github</option>
                <option value="Instagram">Instagram</option>
                <option value="Linkedin">Linkedin</option>
              </select>
              <Input value={Object.values(item)[0]} type="text" onChange={(event) => handleChangeInputSocialMedia(event, index)} />
              <Button label="Delete" onClick={(event) => handleDeleteSocialMedia(event, index)} />
            </div>
          ))}
        </div>
        <Button label="Add Social Media" type="button" onClick={handleAddSocialMedia} />

        <div className="w-full flex justify-center gap-2">
          <Button disabled={formik.isSubmitting} label={formik.isSubmitting ? "Loading..." : "Update"} className="bg-slate-900" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ProfileModal;
