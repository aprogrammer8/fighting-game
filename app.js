        var newMsg = ''; // Holds new messages to be sent to the server
        var chatContent = ''; // A running list of chat messages displayed on the screen
        var username = null; // Our username

        var socket = new WebSocket('ws://' + window.location.host + '/ws');
        socket.addEventListener('message', function(e) {
            var msg = JSON.parse(e.data);
            chatContent += '<div class="chip">'
                    + msg.username
                + '</div>'
                + (msg.message) + '<br/>';

            var element = document.getElementById('chat-messages');
	    console.log("element is",element,"and chatContent is",chatContent);
            element.innerHTML=chatContent;
            element.scrollTop = element.scrollHeight; // Auto scroll to the bottom
        });
        function send () {
            newMsg=document.getElementById("msgbox").value;
	    console.log("newmsg is"+newMsg);
            if (newMsg != '') {
                socket.send(
                    JSON.stringify({
                        username: username,
                        message: newMsg,
			command: ""
                    }
                ));
                document.getElementById("msgbox").value=""; // Reset the message box
            }
        }
        function join () {
            username = document.getElementById("usernamebox").value;
	    console.log("username is "+username);
            if (!username) {
                Materialize.toast('You must choose a username', 2000);
                return;
            }
	    document.getElementById("afterjoin").style.display = "block";
	    document.getElementById("beforejoin").style.display = "none";
        }

	function toggleReady () {
	    console.log("(Un)readying for game...");
            readyStatus = document.getElementById("readybutton").innerHTML;
            if (readyStatus.search("Unready for game")==-1) {
                var command = "READY";
                document.getElementById("readybutton").innerHTML="Unready for game";
            } else {
                var command = "UNREADY";
                document.getElementById("readybutton").innerHTML="Ready for game";
            }
	    socket.send(
	    	JSON.stringify({
	    		username:username,
	    		message: "",
	    		command: command
	    	}
	    ));
	}