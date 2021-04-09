
let triggers = {
     "connect": [],
     "tick": []
};
var conn = null;
 function WebSocketClient(clientcode, jwttoken, apikey, feedtype) {
        
     var  clientcode = clientcode ;          
     var  jwttoken = jwttoken;
     var  apikey = apikey;
     var  feedtype = feedtype;


     this.connect = function () {
          console.log("Connected");
          return new Promise((resolve, reject) => {
               if (clientcode === null || jwttoken === null || apikey === null || feedtype === null ) return "client_code or jwt_token or api_key or feed_type is missing";
               console.log("Before Open");
               conn = new WebSocket("wss://smartapisocket.angelbroking.com/websocket?jwttoken=" + jwttoken + "&&clientcode=" +clientcode+ "&&apikey=" +apikey
);
               conn.onopen = function onOpen(evt) {
                    
                    console.log("Before Hearbeat");
                    setInterval(function () {
                         console.log("Inside heartbeat function");
                         var _hb_req = '{"actiontype":"heartbeat","feedtype":"' + feedtype + '","jwttoken":"' + jwttoken + '","clientcode": "' + clientcode + '", "apikey": "'+ apikey +'"}';
                         conn.send(_hb_req);
                    }, 60000);
                    resolve()
                    console.log("Opened");
               };
               conn.onmessage = function (evt) {
                 console.log(evt);
                    var result = evt.data;
                    
                    trigger("tick", [result]);
               };
               conn.onerror = function (evt) {
                    console.log("error::", evt)
                    this.connect();
                    reject(evt)
               };
               conn.onclose = function (evt) {
                    console.log("Socket closed")
               };
          });
     }

     this.fetchData = function (actiontype, feedtype) {
          if (actiontype === null) return "task is missing";
          if (actiontype === "subscribe" || actiontype === "unsubscribe") {
              // var feedtype = feed_type;   //"nse_cm|2885&nse_cm|1594&nse_cm|11536"; //order_feed
               var _req = '{"actiontype":"' + actiontype + '","feedtype":"' + feedtype + '","jwttoken":"' + jwttoken + '","clientcode": "' + clientcode + '", "apikey": "'+ apikey +'"}';
               conn.send(_req);
               console.log("Fetch Data");
          } else return "Invalid action_type provided";
     };

     this.on = function (e, callback) {
          if (triggers.hasOwnProperty(e)) {
               triggers[e].push(callback);
          }
     };


     this.close = function () {
          conn.close()
     }
}

function _atos(array) {
     var newarray = [];
     try {
          for (var i = 0; i < array.length; i++) {
               newarray.push(String.fromCharCode(array[i]));
          }
     } catch (e) { }

     return newarray.join('');
}

// trigger event callbacks
function trigger(e, args) {
     if (!triggers[e]) return
     for (var n = 0; n < triggers[e].length; n++) {
          triggers[e][n].apply(triggers[e][n], args ? args : []);
     }
}

