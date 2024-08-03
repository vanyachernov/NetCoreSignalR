import { Heading, Text, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "./WaitingForm.css";

export const WaitingForm = ({ joinChat }) => {
  const [userName, setUsername] = useState();
  const [chatRoom, setChatroom] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const userCredentials = {
      userName: userName,
      chatRoom: chatRoom,
    };

    joinChat(userCredentials);
  };

  return (
    <form onSubmit={onSubmit} className="wform-main">
      <Heading fontSize="2xl" margin="5px 0 0 10px">
        IContact
      </Heading>
      <div className="form-inner">
        <Text mb={1}>Username</Text>
        <Input
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          placeholder="Enter username"
        ></Input>
      </div>
      <div className="form-inner">
        <Text mb={1}>Chat name</Text>
        <Input
          onChange={(e) => setChatroom(e.target.value)}
          name="chatName"
          placeholder="Enter chat name"
        ></Input>
      </div>
      <div className="form-inner">
        <Button type="submit" colorScheme="blue" width="100%">
          Join
        </Button>
      </div>
    </form>
  );
};
