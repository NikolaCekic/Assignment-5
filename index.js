/*Author: Nikola Cekic, 000333667*/

//waits for DOM to load
$(document).ready(function(){

    //event handler for 'generate' button
    $("#btn").bind("click", function(){

        var errorMessages = [];
        var errors = false

        //input from user
        var name = $("#name").val();
        var method = $("#method").val();

        //tests to see whether name has been entered and creates an error message if it hasn't
        if(name == ""){

            errorMessages.push("<p>Please fill in name</p>");
            errors = true;
        }

        //tests to see if method has been chosen and creates an error message if it hasn't
        if(method == "Choose Method"){

            errorMessages.push("<p>Please choose a method</p>");
            errors = true;
        }

        if(!errors){

            //hides error messages
            $("#errorDiv").fadeOut(1000);

            //ajax request to server that generates pin
            $.ajax({

                url: "php/pingen.php",
                type: "GET",
                data: {name: name, method: method},
                cache: false,
                success: function(result){

                    //enables form elements once http response is recieved from server
                    $("#main").children().prop("disabled", false);

                    //styling and content change of div to inform user that pin has been generated
                    $("#pin").html("Hover to get PIN");
                    $("#pin").css("color", "black");

                    //shows pin upon hover and styles div container
                    $("#pin").mouseover(function(){

                        $(this).css("backgroundColor", "green");
                        $(this).css("color", "blanchedalmond");
                        $(this).html(result);
                    });
                    
                    //hides pin upon cursor exit and returns styls of div container to previous
                    $("#pin").mouseout(function(){

                        $(this).css("backgroundColor", "lightblue");
                        $(this).css("color", "black");
                        $(this).html("Hover to get PIN");
                    });
                    
                }
            });

            //disables form and informs user that pin is being generated after request to
            //server is sent but before response is recieved
            $("#main").children().prop("disabled", true);
            $("#pin").css("color", "blue");
            $("#pin").html("Getting PIN");
        }
        else{
            
            //these two lines and the mouseover and mouseout event handlers below return 
            //div container with pin to original state after input error
            $("#pin").css("color", "blanchedalmond");
            $("#pin").html("Your PIN Will Appear Here");

            $("#pin").mouseover(function(){

                $(this).css("backgroundColor", "lightblue");
                $(this).css("color", "blanchedalmond");
                $(this).html("Your PIN Will Appear Here");
            });

            $("#pin").mouseout(function(){

                $(this).css("backgroundColor", "lightblue");
                $(this).css("color", "blanchedalmond");
                $(this).html("Your PIN Will Appear Here");
            });

            var errorMessage = "";

            //adds error messages to string from array
            for(var i = 0; i < errorMessages.length; i++)
                errorMessage += errorMessages[i];

            //displays error messages
            $("body").append("<div id='errorDiv' hidden></div>");
            $("#errorDiv").html(errorMessage);
            $("#errorDiv").fadeIn(1000);
            $("#errorDiv").css("backgroundColor", "red");

        }
    });
});