
$(document).ready(function(){

    var btn = document.getElementById("btn");

    btn.addEventListener("click", function(){

        var name = $("#name").val();
        var method = $("#method").val();
        var errorMessages = [];
        var errors = false

        if(name == ""){

            errorMessages.push("<p>Please fill in name</p>");
            errors = true;
        }
        if(method == "Choose Method"){

            errorMessages.push("<p>Please choose a method</p>");
            errors = true;
        }

        if(!errors){

            $("#errorDiv").fadeOut(1000);

            $.ajax({

                url: "php/pingen.php",
                type: "GET",
                data: {name: name, method: method},
                cache: false,
                success: function(result){

                    $("#main").children().prop("disabled", false);
                    $("#pin").html("Hover to get PIN");
                    $("#pin").css("color", "black");

                    $("#pin").mouseover(function(){

                        $(this).css("backgroundColor", "green");
                        $(this).css("color", "blanchedalmond");
                        $(this).html(result);
                    });
                    
                    $("#pin").mouseout(function(){

                        $(this).css("backgroundColor", "lightblue");
                        $(this).css("color", "black");
                        $(this).html("Hover to get PIN");
                    });
                    
                }
            });

            //will execute once request is sent and will not wait for response.
            $("#main").children().prop("disabled", true);
            $("#pin").css("color", "blue");
            $("#pin").html("Getting PIN");
        }
        else{
            
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

            for(var i = 0; i < errorMessages.length; i++)
                errorMessage += errorMessages[i];

            $("body").append("<div id='errorDiv' hidden></div>");
            $("#errorDiv").html(errorMessage);
            $("#errorDiv").fadeIn(1000);
            $("#errorDiv").css("backgroundColor", "red");

        }
    });
});