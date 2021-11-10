import { MessageBar, MessageBarButton, MessageBarType } from "@fluentui/react";
import { FC } from "react";

const SuccessAlert: FC = () => {
  return (
    <MessageBar
      actions={<MessageBarButton>x</MessageBarButton>}
      messageBarType={MessageBarType.success}
      isMultiline={false}
    >
      Guardado con exito
    </MessageBar>
  );
};

export default SuccessAlert;
