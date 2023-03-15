import { Outlet } from "react-router-dom";
import { errorMsg } from "../../services/feedbackService";
import { getIsAdmin } from "../../services/userService";

export default function AdminProtected(userDetails) {
  const isAuthenticated = getIsAdmin();
  return isAuthenticated ? <Outlet /> : errorMsg("You are not Admin");
}
