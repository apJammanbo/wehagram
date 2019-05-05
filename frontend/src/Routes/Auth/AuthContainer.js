import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const userName = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");
  const email = useInput("");

  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      userName: userName.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const localLoginMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value) {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("생성된 계정이 아닙니다. 새로운 계정을 생성하세요.");
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success("로그인을 위해서 이메일을 확인하세요.");
            setAction("confirm");
          }
        } catch {
          toast.error("요청이 실패했습니다. 다시 시도해 주세요.");
        }
      } else {
        toast.error("이메일은 필수 입력사항입니다.");
      }
    } else if (action === "signUp") {
      if (email.value && userName.value && firstName.value && lastName.value) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();

          if (!createAccount) {
            toast.error("계정생성에 실패했습니다.");
          } else {
            toast.success("계정이 생성되었습니다. 지금 로그인 하세요.");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("모든사항을 입력하세요");
      }
    } else if (action === "confirm") {
      if (secret.value) {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          if (token) {
            localLoginMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch (error) {
          toast.error("코드 승인에 실패했습니다.");
        }
      }
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      userName={userName}
      firstName={firstName}
      lastName={lastName}
      secret={secret}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
