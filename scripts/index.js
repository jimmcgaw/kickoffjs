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
		}
	});
});