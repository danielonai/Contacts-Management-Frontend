const styles = {
  global: {
    "html, body": {
      backgroundColor: "gray.800",
      color: "whiteAlpha.800",
      display:"flex",
      justifyContent:"center",
      alignItems: "center",
      flexDirection: "column",
    },
    svg: {
      cursor: "pointer",
    },
    ".table": {
      border: "1px solid #424242",
    },
    ".tr": {
      display: "flex",
      width: "fit-content",
    },
    ".th, .td": { boxShadow: "inset 0 0 0 1px #424242", },
    ".th": {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "gray.400",
      padding: "0.5rem",
      fontWeight: "bold",
      fontSize: "xs",
      textTransform: "uppercase",
      textAlign: "center",
    },
    ".td > input": {
      m: "1",
      padding: "0.2rem",
      bg: "transparent",
      maxW: "100%",
    },
    ".date-wrapper": {
      display: "flex",
      alignItems: "center",
      w: "100%",
      h: "100%",
    },
    ".resizer": {
      position: "absolute",
      opacity: 0,
      top: 0,
      right: 0,
      h: "100%",
      w: "5px",
      bg: "#27bbff",
      cursor: "col-resize",
      userSelect: "none",
      touchAction: "none",
      borderRadius: "6px",
    },
    ".resizer.isResizing": {
      bg: "#2eff31",
      opacity: 1,
    },
    "*:hover > .resizer": {
      opacity: 1,
    },
    // Media Queries
    "@media screen and (max-width: 1300px)": {
      ".table": {
        fontSize: "14px",
        maxW: "700px",
        marginRight: "250px"
      },
      ".th": {
        maxW: "100px"
      },
      ".td": {
        maxW: "100px"
      }
    },
    "@media screen and (max-width: 1000px)": {
      ".table": {
        maxW: "500px",
        marginLeft: "50px"
      },
      ".th": {
        maxW: "70px",
        fontSize: "8px",
      },
      ".td": {
        maxW: "70px",
        fontSize: "8px"
      }
    },
    "@media screen and (max-width: 640px)": {
      ".table": {
        fontSize: "10px",
        maxW: "200px",
        marginLeft: "100px"

      },
      ".th": {
        maxW: "40px",
        fontSize: "4px",
      },
      ".td": {
        maxW: "40px",
        fontSize: "4px"
      },
      "#mobilebtn" :{
        fontSize: "6px",
      },
      
    },
  },
};

export default styles;
