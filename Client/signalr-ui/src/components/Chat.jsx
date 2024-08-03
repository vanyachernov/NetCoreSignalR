import {
  Heading,
  Box,
  Flex,
  CloseButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { PiTelegramLogoLight } from "react-icons/pi";
import { Message } from "./Message";
import "./Chat.css";
import { useState, useEffect, useRef } from "react";

export const Chat = ({ messages, chatRoom, closeChat, sendMessage }) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [messages]);

  const onSendMessage = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="cform-main">
      <Box display="flex" flexDirection="column" height="100%" width="100%">
        <Flex mb={3} justifyContent="space-between">
          <Heading fontSize="2xl" mr={6}>
            Chatroom - {chatRoom}
          </Heading>
          <CloseButton onClick={closeChat} />
        </Flex>
        <Flex flexGrow={1} direction="column" overflowY="auto" mb={3}>
          {messages.map((message, index) => (
            <Message key={index} messageInfo={message} />
          ))}
          <span ref={messagesEndRef} />
        </Flex>
        <Flex mt="auto" justifyContent="space-between">
          <Input
            type="text"
            value={message}
            placeholder="Enter message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button colorScheme="teal" ml={3} onClick={onSendMessage}>
            <PiTelegramLogoLight />
          </Button>
        </Flex>
      </Box>
    </div>
  );
};
