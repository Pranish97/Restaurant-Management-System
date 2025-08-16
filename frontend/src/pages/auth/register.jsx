import { useState } from "react";
import { Link, useNavigate } from "react-router";
import CommonForm from "../../components/common/form";
import { registerFormControls } from "../../config";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  gender: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        navigate("/auth/login");
      }else{
        toast.error(data?.payload?.message)
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground [font-family:'Iansui',cursive] mb-8">
          Register to ChefOps
        </h1>

        <CommonForm
          formControls={registerFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Register"}
          onSubmit={onSubmit}
        />

        <p className="mt-5 flex  justify-center gap-1">
          Already Have a Account?
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
