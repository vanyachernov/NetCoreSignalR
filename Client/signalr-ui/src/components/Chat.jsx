import { Heading, Box, Flex, CloseButton } from "@chakra-ui/react";
import { Message } from "./Message";
import "./Chat.css";

export const Chat = ({ messages, chatRoom, closeChat }) => {
  return (
    <div className="cform-main">
      <Box m={6}>
        <Flex mb={3}>
          {console.log(chatRoom)}
          <Heading fontSize="2xl" mr={6}>
            Chatroom - {chatRoom}
          </Heading>
          <CloseButton onClick={closeChat} />
        </Flex>
        <Flex>
          {messages.map((message, index) => {
            return <Message key={index} messageInfo={message} />;
          })}
        </Flex>
      </Box>
    </div>
  );
};
