import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { useAuthStore } from "../../store/AuthStore";

export const EmailVerificationFinal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("createTokenEmail");

  const emailVerification = useAuthStore((state) => state.emailVerification);
  useEffect(() => {
    emailVerification(token, navigate);
  }, []);

  return (
    <div className="w-full">
      <Navbar />

      <p className="text-lg text-blue-500 text-center mt-20">Verfying...</p>
    </div>
  );
};
