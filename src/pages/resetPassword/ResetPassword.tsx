import { QueryBoundaries } from "@components/Common/QueryBoundaries";
import { AuthResetPassword } from "@components/Auth/Reset";


export default function ResetPasswordRoot() {


  return (
    <QueryBoundaries>
      <AuthResetPassword />
    </QueryBoundaries>
  );
}
