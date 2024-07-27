import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useStateBasketContext } from "@/context/reza/StateBasketContext";

const LoginPage = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { isWrongPasswrod, setIsWrongPassword, isBtnLoading, setIsBtnLoading } = useStateBasketContext()

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    try {
      setIsBtnLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        nik: form.nik.value,
        password: form.password.value,
      });
      if (!response?.error) {
        push("/dashboard");
        form.reset();
        setIsBtnLoading(false)
      } else {
        setIsWrongPassword(true)
        setIsBtnLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container flex justify-center min-w-full min-h-screen">
      <div className="container flex flex-col w-1/3 mt-16">
        <div className="border p-5 rounded-xl bg-blue-500">
          <h1 className="text-2xl font-bold text-center text-white">LOGIN</h1>
          <div className="h-0.5 mt-2 rounded-full bg-white"></div>
          {isWrongPasswrod ? (
            <p className="text-center text-error mb-3">
              NIK atau Password salah!
            </p>
          ) : (
            ""
          )}

          <form onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-lg text-white">NIK</span>
              </label>
              <input
                type="number"
                name="nik"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-lg text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            {/* <div className="h-0.5 bg-white mt-4 mb-4 rounded-full"></div> */}
            <div className="flex justify-end">
              {!session ? (
                <button type="submit" className="bg-orange-500 py-2 px-3 rounded-md text-white font-bold w-full mt-10">
                  {isBtnLoading ? (
                    <div className="flex items-center">
                      <span className="loading loading-spinner me-2"></span>
                      Loading...
                    </div>
                  ) : (
                    "LOGIN"
                  )}
                </button>
              ) : (
                <Link
                  href={"/dashboard"}
                  className="btn
                bg-gray-300
                w-full">
                  Login
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="lg"
                    className="mt-0.5"
                  />
                </Link>
              )}
            </div>
          </form>
          <p className="mt-3 text-center text-white">
            Don{"'"}t have an account? <Link href={"/auth/register"} className="text-white font-medium ms-2">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;