import { Outlet } from "react-router";
import backgroundImg from "../../assets/background.png";

function AuthLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
  {/* Left Section - Only on large screens */}
  <div className="hidden lg:flex w-1/2 h-full bg-black">
    <img
      src={backgroundImg}
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Section */}
  <div className="flex flex-1 h-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <Outlet />
  </div>
</div>

  );
}

export default AuthLayout;
