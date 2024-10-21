import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyAccountAPI } from "../apis";

const VerifyAccount = () => {
  const [params] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const verifyAccount = async () => {
    const response = await verifyAccountAPI(params.get("token"));
    alert(response.msg);
  };

  useEffect(() => {
    setLoading(true);

    verifyAccount();

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return "";
};

export default VerifyAccount;