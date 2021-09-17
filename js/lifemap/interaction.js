			var whichpage = 0;

			$("#route").click(function(){
				whichpage = 1;
				$("#route-top").show();
//				$("#route-suggestions").show();	
				$("#mainsearch").hide();		
				map.removeLayer(SPfocus);
				focusorgo();
			});
			$("#back-to-map").click(function(){
				$("#route-top").hide();
//				$("#route-suggestions").hide();	
				$("#route-bottom").hide();
				$("#mainsearch").show();
				whichpage = 0;

				map.removeLayer(markersRoute);
				map.removeLayer(polyline);
				//and we also clear the to and from variables
				taxidFrom = undefined; 
				taxidTo = undefined;
				//and we empty search fields
				$("#searchinput2").val('');
				$("#searchinput3").val('');
				$("#route").show();
				$("#logohelp").show();
			});
			$("#searchclear").click(function(){
				$("#searchinput").val('');
				$("#searchinput2").val('');
				$("#searchinput3").val('');
				taxidFrom = undefined;
				map.removeLayer(SPfocus);
			});
			$("#searchinput").focus(function() {
				$(this).autocomplete('search', $(this).val())
			})
			$("#searchinput2").focus(function() {
			    $("#route-bottom").hide();	
				$(this).autocomplete('search', $(this).val())
			})
			$("#searchinput3").focus(function() {
			    $("#route-bottom").hide();	
				$(this).autocomplete('search', $(this).val())
			})
			$("#searchinput2").keyup(function() {
				taxidFrom = undefined;
			});
			$("#searchinput3").keyup(function() {
				taxidTo = undefined;
			});
			$("#getroutedetails").click(function() {
				$("#route-details").show();
			});
			$("#closedetails").click(function() {
				$("#route-details").hide();
			});
			$("#closedetails2").click(function() {
				$("#route-details").hide();
			});
			$("#recenter").click(function() {
				mrcaroute();
			});
			$("#sandwich").click(function() {
				$("#theMenu").modal("toggle");
			})
			$("#about").click(function() {
//				$("#AboutModal").modal("toggle");
				$("#theMenu").modal("toggle");
				$("#aboutswiper").show();
				swiper2.slideTo(0);

			})
			$("#thetol").click(function() {
//				$("#AboutModal").modal("toggle");
				$("#theMenu").modal("toggle");
				$("#tolswiper").show();
				swiper3.slideTo(0);

			})
			$("#contact").click(function() {
//				$("#AboutModal").modal("toggle");
				$("#theMenu").modal("toggle");
				$("#contactswiper").show();
				swiper4.slideTo(0);

			})
			$("#share").click(function() {
//				$("#AboutModal").modal("toggle");
				$("#theMenu").modal("toggle");
				$("#shareswiper").show();
				swiper5.slideTo(0);

			})
			$("#gototuto").click(function() {
	      		$("#theMenu").modal("toggle");
				$("#tuto").show();
				swiper.slideTo(0);

			})
			$("#langs").click(function() {
				$("#theMenu").modal("toggle");
	      		$("#langchoice").modal("toggle");
			})

			$("#favoritesclick").click(function() {
				var isvisible = document.getElementById("favoritesdiv");
				var caretstate = document.getElementById("caretdown1"); 
				if (isvisible.style.display === "none") {
						isvisible.style.display = "block";
						caretstate.className = "fa fa-caret-up fa-sm fa-fw"; 
				  } else {
					    isvisible.style.display = "none";
						caretstate.className = "fa fa-caret-down fa-sm fa-fw"; 
				  }
			})

			$("#settingsclick").click(function() {
				var isvisible = document.getElementById("settingsdiv");
				var caretstate = document.getElementById("caretdown2"); 
				if (isvisible.style.display === "none") {
						isvisible.style.display = "block";
						caretstate.className = "fa fa-caret-up fa-sm fa-fw"; 
				  } else {
					    isvisible.style.display = "none";
						caretstate.className = "fa fa-caret-down fa-sm fa-fw"; 
				  }
			})
			$("#closelangchoice").click(function() {
				// $("#theMenu").modal("toggle");
			})

			function closetheswiper(x) {
	      		$("#theMenu").modal("toggle");
	      		$(x).parents('div').hide();

			}
