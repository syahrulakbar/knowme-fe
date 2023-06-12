import { useDispatch, useSelector } from "react-redux";
import { Button, Gap } from "../components";
import { RiDeleteBin5Line, BiPencil } from "../utils/icon-library";
import moment from "moment";
import { deleteCertificate } from "../config/Redux/Action";

const Certificate = () => {
  const dispatch = useDispatch();
  const { account, token, isUpdate } = useSelector((state) => state.globalReducer);
  const { certificate: certificates } = account;

  const handleShowModal = (event, id) => {
    event.preventDefault();
    dispatch({ type: "TOGGLE_MODAL", payload: { isShow: true, modal: "certificate" } });
    dispatch({ type: "UPDATE_CERTIFICATE", payload: id || "" });
  };
  const handleDeleteCertificate = (event, id) => {
    event.preventDefault();
    try {
      dispatch(deleteCertificate(token, id, isUpdate));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Gap height={10} />
      <div className="w-full flex justify-end">
        <Button onClick={handleShowModal} label="Add Certificate" className="font-medium bg-gray-200 text-primary-black dark:bg-white dark:text-black p-2 rounded-lg" />
      </div>
      <div id="certificate" className="container mx-auto mt-10">
        <div id="certificate-content" className="w-full flex flex-wrap justify-center">
          {certificates?.map((certificate, id) => {
            const formattedDate = moment(certificate.issueDate).format("MMMM YYYY");
            return (
              <div key={id} className="w-full lg:m-2 lg:w-[40%] h-max flex shadow-md shadow-sky-400 rounded-lg">
                <div className="w-full p-2">
                  <div className="w-full flex flex-row justify-between">
                    <a aria-label="link to my certificate" href={certificate.urlCertificate} target="_blank" rel="noopener noreferrer">
                      <h3 className="font-semibold hover:text-sky-400">{certificate.name}</h3>
                    </a>
                    <div className="flex flex-row gap-2">
                      <Button onClick={(event) => handleShowModal(event, certificate.id)} className=" dark:text-white">
                        <BiPencil size={20} />
                      </Button>
                      <Button onClick={(event) => handleDeleteCertificate(event, certificate.id)} className="text-red-500">
                        <RiDeleteBin5Line size={20} />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-normal">{certificate.companyName}</h4>
                  <p className="font-light text-sm">{formattedDate}</p>
                  {certificate.credential && <p className="font-light text-sm">{`Credential ID ${certificate.credential}`}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Certificate;
