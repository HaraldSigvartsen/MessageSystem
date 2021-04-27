import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { InputField } from "./InputField";

export function MessagePage() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3000/message");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  // This is change the text equal to the property in the inputfields.
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //this will prevent it to wipe the other messages when we submit the msg
  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };
  //this is a render function where it maps each message then add a unique key.
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="mainContainer">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>

        <InputField
          label={"Name"}
          onChange={(e) => onTextChange(e)}
          value={state.name}
        />

        <div>
          <InputField
            label={"Message"}
            onChange={(e) => onTextChange(e)}
            value={state.message}
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="chatLog">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}
