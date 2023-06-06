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
			$("#langchoicebutton").click(function() {
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
			//NEW : open and close the div with the species in the exhibition
			function closebarre2() {
				var caretstate = document.getElementById("carretstatehalfbut");
				var spdivstate = document.getElementById("barre2");
				if (spdivstate.className==="barreisopen") {
					caretstate.className = "fa fa-caret-up";
					spdivstate.className = "barreisclosed";
					$(".halfcirclediv").css("padding-right","16px");
					$(".bottomleftdivfortext").show();
					$("#map").css({"height":"75%","transition": "width 2s"});
					setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
				}
			}
			function openbarre2() {
				var caretstate = document.getElementById("carretstatehalfbut");
				var spdivstate = document.getElementById("barre2");
				if (spdivstate.className==="barreisclosed") {
					caretstate.className = "fa fa-caret-down";
					spdivstate.className = "barreisopen";
					$(".halfcirclediv").css("padding-right","16px");
					$(".bottomleftdivfortext").hide();
					$("#map").css({"height":"60%","transition": "width 2s"});
					setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
				}
			}


      function closebarre3() {
        var caretstate = document.getElementById("carretstatehalfbut3");
        var spdivstate = document.getElementById("barre3");
        if (spdivstate.className==="barreisopen") {
          caretstate.className = "fa fa-caret-up";
          spdivstate.className = "barreisclosed";
          $(".halfcirclediv3").css("padding-right","16px");
          $(".bottomleftdivfortext").show();
          $("#map").css({"height":"75%","transition": "width 2s"});
          setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
        }
      }
      function openbarre3() {
        var caretstate = document.getElementById("carretstatehalfbut3");
        var spdivstate = document.getElementById("barre3");
        if (spdivstate.className==="barreisclosed") {
          caretstate.className = "fa fa-caret-down";
          spdivstate.className = "barreisopen";
          $(".halfcirclediv3").css("padding-right","16px");
          $(".bottomleftdivfortext").hide();
          $("#map").css({"height":"60%","transition": "width 2s"});
          setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
        }
      }

      function closebarre4() {
        var caretstate = document.getElementById("carretstatehalfbut4");
        var spdivstate = document.getElementById("barre4");
        if (spdivstate.className==="barreisopen") {
          caretstate.className = "fa fa-caret-up";
          spdivstate.className = "barreisclosed";
          $(".halfcirclediv4").css("padding-right","16px");
          $(".bottomleftdivfortext").show();
          $("#map").css({"height":"75%","transition": "width 2s"});
          setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
        }
      }
      function openbarre4() {
        var caretstate = document.getElementById("carretstatehalfbut4");
        var spdivstate = document.getElementById("barre4");
        if (spdivstate.className==="barreisclosed") {
          caretstate.className = "fa fa-caret-down";
          spdivstate.className = "barreisopen";
          $(".halfcirclediv4").css("padding-right","16px");
          $(".bottomleftdivfortext").hide();
          $("#map").css({"height":"60%","transition": "width 2s"});
          setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
        }
      }

      function closebarre5() {
        var caretstate = document.getElementById("carretstatehalfbut5");
        var spdivstate = document.getElementById("barre5");
        if (spdivstate.className==="barreisopen") {
          caretstate.className = "fa fa-caret-up";
          spdivstate.className = "barreisclosed";
          $(".halfcirclediv5").css("padding-right","16px");
          $(".bottomleftdivfortext").show();
          $("#map").css({"height":"75%","transition": "width 2s"});
          setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
        }
      }
      function openbarre5() {
        var caretstate = document.getElementById("carretstatehalfbut5");
        var spdivstate = document.getElementById("barre5");
        if (spdivstate.className==="barreisclosed") {
          caretstate.className = "fa fa-caret-down";
          spdivstate.className = "barreisopen";
          $(".halfcirclediv5").css("padding-right","16px");
          $(".bottomleftdivfortext").hide();
          $("#map").css({"height":"60%","transition": "width 2s"});
          setTimeout(function(){ map.invalidateSize({animate:true})}, 2000);
        }
      }

			$(".halfcirclediv").click(function() {
				var spdivstate = document.getElementById("barre2");
				if (spdivstate.className==="barreisclosed") { // OPEN IT
					openbarre2()
				}
				else { // CLOSE IT
					closebarre2()
				}
			})

      $(".halfcirclediv3").click(function() {
				var spdivstate = document.getElementById("barre3");
				if (spdivstate.className==="barreisclosed") { // OPEN IT
					openbarre3()
				}
				else { // CLOSE IT
					closebarre3()
				}
			})

      $(".halfcirclediv4").click(function() {
				var spdivstate = document.getElementById("barre4");
				if (spdivstate.className==="barreisclosed") { // OPEN IT
					openbarre4()
				}
				else { // CLOSE IT
					closebarre4()
				}
			})

      $(".halfcirclediv5").click(function() {
        var spdivstate = document.getElementById("barre5");
        if (spdivstate.className==="barreisclosed") { // OPEN IT
          openbarre5()
        }
        else { // CLOSE IT
          closebarre5()
        }
      })

			$("#logohome").click(function() {
				gohome()
			})

			function gohome() {
				zoomTo(1);
				map.removeLayer(markersRoute);
				map.removeLayer(polyline);
				map.removeLayer(SPfocus);
				if (selected) {
      				degrise(selected);
      			}

			}
			function BackToInitialStep() {
				gohome();
				closebarre2();
				$("#back-to-map").click();
				$("#searchclear").click();
				$('.modal').modal('hide'); //close all modals
				closehelp();
			}

			function displayQRcode() {
				$("#qrcode").modal("toggle");
			}
			//HELP BUTTON AND DIV ACTION
			function openhelp() {
				BackToInitialStep()
				document.getElementById("helpdiv").style.display="block";
			}
			function closehelp() {
				document.getElementById("helpdiv").style.display="none";
			}
			$("#logohelp").click(function() {
	      		openhelp()
			})
