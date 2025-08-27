import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import { useDispatch } from "react-redux";
import { paymentStatus } from "../../store/admin/payment-slice";

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  const decoded = base64Decode(token);
  const dispatch = useDispatch();

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      dispatch(
        paymentStatus({ transaction_uuid: decoded.transaction_uuid })
      ).then((data) => {
        console.log(data)
        if (data.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
          setIsSuccess(true);
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };
  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);
  if (isLoading && !isSuccess) return <>Loading...</>;
  if (!isLoading && !isSuccess)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Oops! Payment Failed
          </h1>
          <p className="text-gray-700 mb-6">
            There was an error confirming your payment. We are working to
            resolve it.
          </p>
          <button
            onClick={() => navigate("/admin/table")}
            className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-500 transition-colors duration-200"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your payment. Your transaction was completed
          successfully.
        </p>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-500 transition-colors duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};
export default Success;
