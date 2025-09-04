import { useState } from "react";

import AuthLayout from "../components/layouts/AuthLayout";
import SignUpForm from "../components/Forms/SignUpForm";
import MobileFormDrawer from "../components/Drawers/MobileFormDrawer";

interface RegisterPageProps {
  onLoginClick?: () => void;
  onRegistrationComplete?: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onLoginClick,
  onRegistrationComplete,
}) => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <AuthLayout>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold sm:font-bold text-[#0E201E] mb-2 sm:text-left text-center">
          Welcome to Portal!
        </h1>
      </div>

      {/* Registration Form */}
      <div className="sm:hidden flex flex-col gap-4">
        {/* Create Account Button */}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            style={{ backgroundColor: "#75AE46" }}
            aria-label="Create new portal account"
            onClick={() => setShowSignUpForm(true)}
          >
            Create Portal Account
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">OR</span>
          </div>
        </div>

        {/* Google Sign Up Button */}
        <div>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="Sign up with Google account"
          >
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span className="ml-2">Continue with Google</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have a Portal Account?{" "}
            <button
              onClick={onLoginClick}
              className="font-medium hover:text-green-500 focus:outline-none"
              style={{ color: "#75AE46" }}
              aria-label="Navigate to login page"
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
      <div className="hidden sm:block">
        <SignUpForm
          onLoginClick={onLoginClick}
          onRegistrationComplete={onRegistrationComplete}
        />
      </div>
      <MobileFormDrawer
        isOpen={showSignUpForm}
        onClose={() => setShowSignUpForm(false)}
        header="Create an Account"
        height="100vh"
        showLogo
        noPadding
      >
        <SignUpForm
          onLoginClick={onLoginClick}
          onRegistrationComplete={onRegistrationComplete}
        />
      </MobileFormDrawer>
    </AuthLayout>
  );
};

export default RegisterPage;
