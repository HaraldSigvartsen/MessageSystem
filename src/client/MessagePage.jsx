import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export function MessagePage() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3000/socket.io/");
    socketRef.current.on("connect", () => {
      console.log("Connected");
      socketRef.current.on("message", ({ name, message }) => {
        setChat((current) => [...current, { name, message }]);
      });
    });
    return () => socketRef.current.disconnect();
  }, []);

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
        <h1>Send a Message!</h1>

        <h4>Name</h4>
        <input
          type="text"
          name="name"
          onChange={onTextChange}
          value={state.name}
        />

        <div>
          <h4>Message</h4>
          <input
            type="text"
            name="message"
            onChange={onTextChange}
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
