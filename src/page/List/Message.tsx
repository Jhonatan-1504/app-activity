import { MessageBar, MessageBarButton, MessageBarType } from "@fluentui/react";

const Message = () => {
  return (
    <MessageBar
      actions={
        <div>
          <MessageBarButton>X</MessageBarButton>
        </div>
      }
      messageBarType={MessageBarType.success}
      isMultiline={false}
    >
      Agregado correctamente
    </MessageBar>
  );
};

export default Message;
