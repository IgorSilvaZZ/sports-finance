import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectResponsible } from "../store/responsible/responsible.slice";

export const Private = () => {
  const { token } = useSelector(selectResponsible);

  return token !== "" ? <Outlet /> : <Navigate to='/' />;
};
