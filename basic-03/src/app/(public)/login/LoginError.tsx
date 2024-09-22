import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoginErrorProps {
  error: string | null;
}

const toErrorMessage = (error: string | null) => {
  if (error == "OAuthAccountNotLinked") {
    return "This email for this account is associated with another login provider. Please login with the original provider";
  }
  return `An error occurred when logging in: ${error}`;
};

const LoginError = ({ error }: LoginErrorProps) => {
  if (!error || error.length == 0) return "";
  return (
    <Alert variant="bowls_manager">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{toErrorMessage(error)}</AlertDescription>
    </Alert>
  );
};
export default LoginError;
