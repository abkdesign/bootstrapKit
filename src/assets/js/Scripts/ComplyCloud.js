var jsonrules = [];
//var rulesactive = [];

$(function () {

    var url = document.location.toString();
    if (url.match('#')) {
        $('#' + url.split('#')[1]).addClass('in');
    }

    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);



    $('#PartId').change(function (f) {

        if ($(this).find(":selected").val() == "-1")
        {
            $(".newparteditor").show();
            $(".partfield").each(function (i) {
                $(this).attr("required", "true");
            });
        }
        else
        {
            $(".newparteditor").hide();
            $(".partfield").each(function (i) {
                $(this).removeAttr("required");
            });
        }

    });
    $("#submitnewdoc").on("click", function (f) {

        //alert(getBool($('#navbar .newdocumenttype').attr("data-thirdparty")));

        //if (($('#PartId').find(":selected").val() == "0") && getBool($('#navbar .newdocumenttype').attr("data-thirdparty")) )
        //{
        //    return false;
        //}

        return true;
        $("#submitnewdoc").attr("disabled", "disabled");

        
    });
    $('#navbar .newdocumenttype').click(function (f) {

        var dataid = $(this).attr("data-id");
        var thirdparty = getBool($(this).attr("data-thirdparty"));
        $(".newparteditor").hide();

        $(".partfield").each(function (i) {
            $(this).removeAttr("required");
        });
        



        if (thirdparty)
        {
            $('#NewDocumentModal .PartSelector').show();

        }
        else
        {

            $('#NewDocumentModal .PartSelector').hide();
        }

        window.console.info("Creating new document. Type: " + dataid);

        $('#NewDocumentModal .DocTypeName').html("<b>\"" + $(this).find(".doctypetitle").text() + "\"</b> dokument");
        $('#NewDocumentModal .Manchet').html($(this).find(".doctypemanchet").text());
        $('#NewDocumentTypeID').attr("value", dataid);



        $('#NewDocumentModal').modal({
            keyboard: false
        })
        
  


        return false;

    });

    if ($(".loginbox").length > 0)
    {

        $("#UserName").focus();
    }

    $("#documentstable").DataTable(
        {
            "order": [],
            "language": {
                "lengthMenu": "Viser _MENU_ dokumenter pr. side",
                "zeroRecords": "Ingen dokumenter oprettet!",
                "info": "Viser side _PAGE_ af _PAGES_",
                "search": "Søg:",
                "paginate": {
                    "first": "Første",
                    "last": "Sidste",
                    "next": "Næste",
                    "previous": "Forrige"
                }
            }
        });

    //signup validation
    if ($("#SignupForm").length > 0)
    {
        $("#SignupForm input[type='submit']").on("click", function (f) {

            alert("validate");
            return false;

        });
    }


});


function getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
}

function getRulesFromSelectedFieldID(fieldid) {

    var rules = [];
   

    jQuery.each(jsonrules, function () {
       
       
        if (this.QuestionFieldId == fieldid)
        {
            rules.push(this);
        }
    });
   
    return rules;
}


function getRulesFromSelectedQuestionID(questionid) {
    var rules = [];
    jQuery.each(jsonrules, function () {

        if (this.QuestionUmbId == questionid)
            rules.push(this);

    });

    return rules;

}

