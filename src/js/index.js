import BChatVideo from "./bchatvideo";
import { bChatData } from "./data";

((doc) => {
  const oBChatVideo = doc.getElementById("bChatVideo");
  const oBChatCan = doc.getElementById("bChatCan");

  const init = () => {
    window.bChatVideo = new BChatVideo(oBChatVideo, oBChatCan, { bChatData });

    bindEvent();

    // console.log("bchat");
  };

  const bindEvent = () => {
    oBChatVideo.addEventListener("play", handleVideoPlay, false);
    oBChatVideo.addEventListener("pause", handleVideoPause, false);
    // oBChatVideo.addEventListener("timeupdate", handleVideoTimeUpdate, false);

    // function handleVideoTimeUpdate(e) {
    //   console.log(oBChatVideo.currentTime, e);
    // }
  };

  function handleVideoPlay() {
    bChatVideo.bChatPaused = false;
    bChatVideo.render();
  }

  function handleVideoPause() {
    bChatVideo.bChatPaused = true;
  }

  init();
})(document);
