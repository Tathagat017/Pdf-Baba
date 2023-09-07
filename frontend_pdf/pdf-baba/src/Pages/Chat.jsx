import React, { useState } from "react";
import FileUpload from "./../Components/FileUpload";
import ChatInterface from "../Components/ChatInterface";
import { SidebarFuction } from "../Layouts/SideBar";
import { Box, Flex } from "@chakra-ui/react";

const Chat = () => {
  const [render, ForcedRender] = useState(false);
  return (
    <Box w="100%">
      <Flex>
        <div
          style={{
            width: "25%",
            marginTop: "1%",
            padding: "1%",
            boxShadow:
              "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
          }}
        >
          <SidebarFuction render={render} forcedRender={ForcedRender} />
        </div>
        <div
          style={{
            width: "78%",
            margin: "auto",
            marginBottom: "",
          }}
        >
          <FileUpload forcedRender={ForcedRender} render={render} />
          <ChatInterface />
        </div>
      </Flex>
    </Box>
  );
};

export default Chat;
