import "babel-polyfill";
import "custom-event-polyfill";
//import 'whatwg-fetch';
import "bootstrap";
import "jquery";
import $ from "jquery";
import "./assets/scss/app.scss";
import "./assets/js/app.js";
$("#myModal").on("shown.bs.modal", function() {
  $("#myInput").trigger("focus");
});
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function($) {
  $('a[href^="#"]').bind('click.list-group-item', function(e) {
      e.preventDefault();
      
      // Get the current target hash
      var target = this.hash;
      
      // Animate the scroll bar action so its smooth instead of a hard jump
      $('html, body').stop().animate({
          'scrollTop' : $(target).offset().top - 210
      }, 100, 'swing', function() {
          //window.location.hash = target;
      });
  });
});


var jsonrules = [];
//var rulesactive = [];

$(function() {
  $(".edituserbtn").click(function() {
    //// clean form
    // $("#EditMode").val("false");
    // $("#Id").val("");
    // $("#inputName").val("");
    // $("#inputEmail").val("");
    // $("#Role").val([]);
    // $("#inputPW").val("");
    // $("#inputPW2").val("");

    $("#NewUserModal").modal();
    //$("#NewUserModal h4").html("Opret ny bruger");
    return false;
  });

  $("#generatepw").change(function() {
    if (this.checked) {
      $("#inputPW").attr("disabled", "disabled");
      $("#inputPW2").attr("disabled", "disabled");
    } else {
      $("#inputPW").removeAttr("disabled");
      $("#inputPW2").removeAttr("disabled");
    }
  });

  $("#changepw").change(function() {
    if (this.checked) {
      $("#inputPW").removeAttr("disabled");
      $("#inputPW2").removeAttr("disabled");
    } else {
      $("#inputPW").attr("disabled", "disabled");
      $("#inputPW2").attr("disabled", "disabled");
    }
  });

  $('[data-toggle="tooltip"]').tooltip();

  if ($(window.location.hash).length > 0) {
    var $target = $(window.location.hash);
    $("html, body").animate(
      {
        scrollTop: $target.offset().top  - 210
      },
      100
    );
  }

  $('[data-onpage="true"]').click(function() {
    var $target = $($(this).attr("data-goto"));
    //alert($(this).attr("data-goto"));
    $("html, body").animate(
      {
        scrollTop: $target.offset().top - 50
      },
      100
    );

    return false;
  });

  var url = document.location.toString();
  if (url.match("#")) {
    $("#" + url.split("#")[1]).addClass("in");
  }

  function toggleChevron(e) {
    $(e.target)
      .prev(".panel-heading")
      .find("i.indicator")
      .toggleClass("glyphicon-chevron-down glyphicon-chevron-up");
  }
  $("#accordion").on("hidden.bs.collapse", toggleChevron);
  $("#accordion").on("shown.bs.collapse", toggleChevron);

  $(".pdfopen").click(function() {
    var docid = $(this).attr("data-docid");
    var version = $(this).attr("data-docversion");

    OpenPDFUrl(docid, version);
  });

  $(".pdfdelete").click(function() {
    var docid = $(this).attr("data-docid");
    var version = $(this).attr("data-docversion");

    var warntxt =
      "Er du sikker? Alle data vedr. dette dokument vil blive slettet!";

    if (version != 0) {
      warntxt = "Er du sikker? Alle data vedr. version " + version + ".?";
    }

    if (window.confirm(warntxt)) {
      var requrl =
        "/umbraco/surface/DocumentsSurface/DeleteDocument/?DocId=" +
        docid +
        "&versionNumber=" +
        version;

      $.get(requrl, function(data) {
        if (version == 0) {
          document.location.href = "/home/documents";
        } else {
          document.location.href = document.location.href;
        }
      });
    }
  });

  $(".ignorepart").click(function() {
    var catid = $(this).attr("data-catid");
    var purposeid = $(this).attr("data-purposeid");

    var clsName = ".cls" + catid + purposeid;

    if ($(this).is(":checked")) {
      $.post(
        "/umbraco/surface/RegisterSurface/HandlePartIgnoreSubmit/?catid=" +
          catid +
          "&purposeid=" +
          purposeid +
          "&ignore=true",
        function(data) {
          //  alert("tilføj!");
          $(clsName).addClass("disabled");
        }
      );
    } else {
      $.post(
        "/umbraco/surface/RegisterSurface/HandlePartIgnoreSubmit/?catid=" +
          catid +
          "&purposeid=" +
          purposeid +
          "&ignore=false",
        function(data) {
          //  alert("fjen");
          $(clsName).removeClass("disabled");
        }
      );
    }
  });

  $("#PartId").change(function(f) {
    if (
      $(this)
        .find(":selected")
        .val() == "-1"
    ) {
      $(".newparteditor").show();
      $(".partfield").each(function(i) {
        $(this).attr("required", "true");
      });
    } else {
      $(".newparteditor").hide();
      $(".partfield").each(function(i) {
        $(this).removeAttr("required");
      });
    }
  });
  $("#submitnewdoc").on("click", function(f) {
    //alert(getBool($('#navbar .newdocumenttype').attr("data-thirdparty")));

    //if (($('#PartId').find(":selected").val() == "0") && getBool($('#navbar .newdocumenttype').attr("data-thirdparty")) )
    //{
    //    return false;
    //}

    return true;
    $("#submitnewdoc").attr("disabled", "disabled");
  });
  $(".newdocumenttype").click(function(f) {
    console.log("clicking on doctype", f.target);

    $("#PartChoose").val([]);
    $("#UmbQuestionnaireCategoryID").val([]);
    $("#UmbMainPurposeID").val([]);

    var dataid = $(this).attr("data-id");
    var title = $(this).attr("data-doctypetitle");
    var thirdparty = getBool($(this).attr("data-thirdparty"));
    var thirdpartyid = $(this).attr("data-thirdpartyid");

    $(".newparteditor").hide();

    $(".partfield").each(function(i) {
      $(this).removeAttr("required");
    });

    if (thirdparty) {
      $("#NewDocumentModal .PartSelector").show();
    } else {
      $("#NewDocumentModal .PartSelector").hide();
    }

    window.console.info("Creating new document. Type: " + dataid);

    $("#NewDocumentModal .DocTypeName").html('<b>"' + title + '"</b> dokument');
    $("#NewDocumentModal .Manchet").html(
      $(this)
        .find(".doctypemanchet")
        .text()
    );
    $("#NewDocumentTypeID").attr("value", dataid);

    $("#NewDocumentModal").modal({
      keyboard: false
    });

    if (thirdpartyid != "") {
      $("#PartId").val(thirdpartyid);
    }

    return false;
  });

  if ($(".loginbox").length > 0) {
    $("#UserName").focus();
  }

  // moved to partial view
  //$("#documentstable").DataTable(
  //    {
  //        "order": [],
  //        "language": {
  //            "lengthMenu": "Viser _MENU_ dokumenter pr. side",
  //            "zeroRecords": "Ingen dokumenter oprettet!",
  //            "info": "Viser side _PAGE_ af _PAGES_",
  //            "search": "Søg:",
  //            "paginate": {
  //                "first": "Første",
  //                "last": "Sidste",
  //                "next": "Næste",
  //                "previous": "Forrige"
  //            }
  //        }
  //    });

  //signup validation
  if ($("#SignupForm").length > 0) {
    $("#SignupForm input[type='submit']").on("click", function(f) {
      alert("validate");
      return false;
    });
  }
});

function OpenPDFUrl(documentid, versionnumber) {
  var requrl =
    "/umbraco/surface/DocumentsSurface/GetPresignedPDFUrl/?DocId=" +
    documentid +
    "&versionNumber=" +
    versionnumber;

  $.get(requrl, function(data) {
    document.location.href = data;

    //var form = document.createElement("form");
    //form.method = "GET";
    //form.action = data;
    //form.target = "_blank";
    //document.body.appendChild(form);
    //form.submit();
  });

  //$.get(
  //    {
  //        url: requrl,
  //        cache: false,
  //        success: function () {
  //            var form = document.createElement("form");
  //            form.method = "GET";
  //            form.action = data;
  //            form.target = "_blank";
  //            document.body.appendChild(form);
  //            form.submit();
  //        }
  //    });
}

function getBool(val) {
  return !!JSON.parse(String(val).toLowerCase());
}

function getRulesFromSelectedFieldID(fieldid) {
  var rules = [];

  jQuery.each(jsonrules, function() {
    if (this.QuestionFieldId == fieldid) {
      rules.push(this);
    }
  });

  return rules;
}

function getRulesFromSelectedQuestionID(questionid) {
  var rules = [];
  jQuery.each(jsonrules, function() {
    if (this.QuestionUmbId == questionid) rules.push(this);
  });

  return rules;
}
