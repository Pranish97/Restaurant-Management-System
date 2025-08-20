import { useState } from "react";
import logo from "../../assets/logo.png";
import CommonForm from "../../components/common/form";
import { resetPasswordFields } from "../../config";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { resetPassword } from "../../store/admin/user-slice";

const initialData = {
  password: "",
  confirmPassword: "",
};

function ResetPassword() {
  const [formData, setFormData] = useState(initialData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  function onSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(resetPassword({ id, password: formData.password })).then(
      (data) => {
        if(data?.payload?.success){
            toast.success(data.payload.message)
        }
      }
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[700px] h-auto border border-gray-400 shadow-lg rounded-md bg-white mx-auto mt-10">
        <div className="flex flex-col justify-center items-center gap-5 mt-4">
          <img src={logo} alt="Logo" width={150} height={110} />
          <h1 className="mt-2 text-4xl font-bold">Reset Your Password</h1>
          <p className="text-gray-600">Enter Your New Password for ChefOps</p>
        </div>

        <div className="px-32 mt-20 mb-20">
          <CommonForm
            formControls={resetPasswordFields}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Reset Password"}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
