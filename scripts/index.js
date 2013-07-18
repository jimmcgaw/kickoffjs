$(function(){
	$.ajax({
		url : "/members",
		type : "get",
		error : function(){
			// this browser will self-destruct
		},
		success : function(response){
			var ul = $("<ul />").attr({ "id" : "member_list" });
			$.each(response, function(index, member){
				var li = $("<li />").text(member.name);
				ul.append(li);
			});
			$("#content").html(ul);
			$("#pick").show();
		}
	});

	$("#pick").click(function(){
		var lis = $("#content").find("li");
		var count = lis.length;
		var random_member_index = Math.floor(Math.random()*(count+1));
		var winner = $(lis[random_member_index]);
		if (winner.text() === "Joshua Ball"){
			alert("Josh Ball cannot win this!");
		} else {
			winner.css("font-weight", "bold");
		winner.append(" <-- winner winner chicken dinner!");
		}
	});
});