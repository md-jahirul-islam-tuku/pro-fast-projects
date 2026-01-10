import { Outlet } from "react-router-dom";
import image from "../assets/authImage.png";
import Logo from "../components/Shared/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen webWidth">
      <div className="flex min-h-screen flex-col-reverse lg:flex-row-reverse">
        
        {/* LEFT SIDE (Image) */}
        <div className="flex-1 bg-lime-50 flex items-center justify-center">
          <img
            src={image}
            alt="Auth Visual"
            className="max-h-[80vh] object-contain"
          />
        </div>

        {/* RIGHT SIDE (Form Area) */}
        <div className="flex-1 bg-base-100 flex flex-col p-6 lg:p-10">
          <Logo />

          <div className="flex flex-1 items-center justify-center">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
