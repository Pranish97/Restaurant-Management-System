import { useState } from "react";
import { Link } from "react-router";
import CommonForm from "../../components/common/form";
import { loginFormControls } from "../../config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground [font-family:'Iansui',cursive] mb-8">
          Login to ChefOps
        </h1>

        <CommonForm
          formControls={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Login"}
          onSubmit={onSubmit}
        />

        <p className="mt-2 flex  justify-center gap-1">
          Dont't Have Account?
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
