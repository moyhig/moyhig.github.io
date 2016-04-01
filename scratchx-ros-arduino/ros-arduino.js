(function(ext) {
  var url1 = 'http://cdn.robotwebtools.org/EventEmitter2/current/eventemitter2.min.js';
  var url2 = 'http://cdn.robotwebtools.org/roslibjs/current/roslib.min.js';
    $.getScript(url1, function(d1, s1, x1) {
      $.getScript(url2, function(d2, s2, x2) {
        var ros = new ROSLIB.Ros({
          url : 'ws://10.211.55.29:9090'
        });
        var connected = false;

        ros.on('connection', function() {
          console.log('Connected to websocket server.');
          connected = true;
        });

        ros.on('error', function(error) {
          console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', function() {
          console.log('Connection to websocket server closed.');
          connected = false;
        });

        // shutdown時に呼ばれる
        ext._shutdown = function() {};

        // statusを返してやる。デバイスとつながってない時とかここで色々返せる。
        ext._getStatus = function() {
          if (connected) {
            return {status: 2, msg: 'Ready'};
          } else {
            return {status: 1, msg: 'Disconnected'};
          }
        };

        // blockが呼び出された時に呼ばれる関数を登録する。
        // 下にあるdescriptorでブロックと関数のひも付けを行っている。
        ext.do_domething = function(str) {
        };

        // ブロックと関数のひも付け
        var descriptor = {
            blocks: [
                [' ', 'do_something %s', 'do_something', 'sample text'],
            ]
        };

        // 最後にExtensionを登録する
        ScratchExtensions.register('Simple extension', descriptor, ext);
      });
    });
})({});
