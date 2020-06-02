import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FaPhoneAlt, FaComments } from "react-icons/fa";
import "./VideoChat.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  // width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: calc(15vh);
`;

const VideoChat = (props) => {
  const [yourID, setYourID] = useState("");
  const [members, setMembers] = useState([]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(
      "https://fathomless-journey-95730.herokuapp.com/",
      // "http://localhost:8000",
      {
        query: {
          sessionid: props.sessionid,
        },
      }
    );

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on("yourID", (id) => {
      console.log(id, "id");
      setYourID(id);
    });
    socket.current.on("allUsers", (members) => {
      console.log(members, "members");
      setMembers(members);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
    console.log(props.sessionid, "sessionid is here in UseEffect");
    // callPeer()
  }, [props.sessionid]);

  // function toggleVideo(stream) {
  //   console.log("toggleVideo clicked");
  //   navigator.mediaDevices.getUserMedia({ video: false, audio: false });
  // }

  //takes in callUser & acceptCall
  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        {/* <p>{caller} is calling you</p> */}
        <button
          style={{ backgroundColor: "#fcee09", color: "#000" }}
          onClick={acceptCall}
          className="btn callButton"
        >
          <IconContext.Provider
            value={{ size: "0.8em", style: { paddingRight: "0.2rem" } }}
          >
            <FaComments />
          </IconContext.Provider>
          <span className="btn__content">Accept Call</span>
        </button>
      </div>
    );
  }
  console.log(members, "members");
  return (
    <Container className="videoContainer">
      <Row>
        {/* <button className="btn callButton" onClick={() => toggleVideo()}>
          Camera
        </button>
        <button className="btn callButton">Mic</button> */}
        {members
          .filter((memberName) => memberName !== yourID)
          .map((memberName) => (
            <button
              className="btn callButton"
              onClick={() => callPeer(memberName)}
            >
              <IconContext.Provider
                value={{ size: "0.8em", style: { paddingRight: "0.2rem" } }}
              >
                <FaPhoneAlt />
              </IconContext.Provider>
              <span className="btn__content">Call</span>
            </button>
          ))}
        <div>{incomingCall}</div>
      </Row>
      <div>
        <Row>
          {UserVideo}
          {PartnerVideo}
        </Row>
      </div>
    </Container>
  );
};

export default VideoChat;
