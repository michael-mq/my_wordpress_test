import UUID from "./uuid.utils";

class LocalStorageUtils {
  static getContinuitySessionId() {
    try {
      var sesid = localStorage.getItem("continuity.sessionid");
      if (!sesid) {
        sesid = UUID.generate();
        localStorage.setItem("continuity.sessionid", sesid);
        localStorage.setItem("continuity.sequencenumber", 1);
      }

      return sesid;
    } catch (error) {
      console.error(error);
    }
  }

  static getContinuitySequenceNumber() {
    try {
      var seqno = localStorage.getItem("continuity.sequencenumber");
      if (!seqno) {
        seqno = 1;
        localStorage.setItem("continuity.sequencenumber", seqno);
      } else {
        seqno = parseInt(seqno);
        seqno += 1;
        localStorage.setItem("continuity.sequencenumber", seqno);
      }

      return seqno;
    } catch (error) {
      console.error(error);
    }
  }
}

export default LocalStorageUtils;
