import useScreenSize from "../../hooks/useScreenSize";
import LottieAnimation from "../LottieAnimation";

type ChildrenProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: ChildrenProps) => {
  const screenSize = useScreenSize();

  return (
    <div className="flex flex-col-reverse lg:flex-row bg-white mx-1 sm:mx-14 my-6 sm:p-14">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center px-8 sm:px-12 lg:px-16 text-left">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Side - Lottie Animation with Stars */}
      <div className="flex lg:w-1/2 items-center justify-center p-0.5 sm:p-8 relative overflow-hidden">
        <div className="text-center relative z-10">
          <div className="text-center relative z-10">
            <LottieAnimation
              type="animation"
              width={
                screenSize.width < 640
                  ? 300
                  : screenSize.width < 1024
                  ? 400
                  : 700
              }
              height={
                screenSize.width < 640
                  ? 370
                  : screenSize.width < 1024
                  ? 400
                  : 700
              }
              loop={true}
              autoplay={true}
              className="mb-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
