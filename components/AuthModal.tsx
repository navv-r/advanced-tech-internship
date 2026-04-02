"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";

export default function AuthModal() {
  const {
    modalOpen,
    modalMode,
    closeModal,
    loginWithEmail,
    registerWithEmail,
    loginAsGuest,
    openModal,
  } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!modalOpen) return null;

  const isLogin = modalMode === "login";

  const getErrorMessage = (code: string) => {
    if (code === "auth/invalid-email") return "Invalid email address.";
    if (code === "auth/user-not-found" || code === "auth/invalid-credential")
      return "User not found. Please check your credentials.";
    if (code === "auth/wrong-password") return "Incorrect password.";
    if (code === "auth/weak-password")
      return "Password should be at least 6 characters.";
    if (code === "auth/email-already-in-use") return "Email already in use.";
    return "Something went wrong. Please try again.";
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isLogin && password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password);
      }
      closeModal();
      router.push("/for-you");
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    try {
      await loginAsGuest();
      closeModal();
      router.push("/for-you");
    } catch (err: any) {
      setError("Guest login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal__overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button className="modal__close" onClick={closeModal}>
          <AiOutlineClose />
        </button>

        {/* TITLE */}
        <div className="modal__title">
          {isLogin ? "Log in to Summarist" : "Sign up to Summarist"}
        </div>

        {/* GUEST LOGIN (only on login) */}
        {/* GUEST LOGIN — always visible, sits directly above Google */}
        <button
          className="modal__btn modal__guest"
          onClick={handleGuest}
          disabled={loading}
        >
          <AiOutlineUser style={{ marginRight: 8, fontSize: 18 }} />
          Login as a Guest
        </button>

        {/* GOOGLE (UI only) */}
        <button className="modal__btn modal__google" disabled>
          <FcGoogle style={{ marginRight: 8, fontSize: 18 }} />
          {isLogin ? "Login with Google" : "Sign up with Google"}
        </button>

        <div className="modal__divider">
          <span>or</span>
        </div>

        {/* EMAIL / PASSWORD */}
        <input
          type="email"
          placeholder="Email Address"
          className="modal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {error && <div className="modal__error">{error}</div>}

        <button
          className="modal__btn modal__submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
        </button>

        {isLogin && <div className="modal__forgot">Forgot your password?</div>}

        <div
          className="modal__switch"
          onClick={() => {
            setError("");
            openModal(isLogin ? "register" : "login");
          }}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </div>
      </div>
    </div>
  );
}
