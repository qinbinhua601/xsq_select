/**
 * Author 		: Alex Q
 * Date 		: 2014-12-5
 * Description 	: 下拉搜索框
 */

// var debug = true;
// var log = true;
function xsq_filter(str, node) {
    var ifExisted = false;
    node.find('dl dd').css('display', 'none');
    node.find('dl dd').each(function() {
        var $currentNode = $(this);
        if ($currentNode.text().search(str) != -1) {
            if (!ifExisted) {
                ifExisted = true;
            }
            $currentNode.css('display', '');
        }
    });
    return ifExisted;
}

function resetList(node) {
    node.find('dl dd').css('display', '');
    node.find('dl').slideDown(500);
}

function showCloseIcon(node) {
    node.find('b.close').show();
    node.find('b.down').hide();
}

function showDownIcon(node) {
    node.find('b.down').show();
    node.find('b.close').hide();
}

function resetInput(node) {
    node.find('.xsq_input').val('');
    node.find('.xsq_input').removeClass('checked');
    node.find('.xsq_input_val').val('');
}

function xsq_log(node) {
    if ((typeof(log) !== 'undefined' && log) || typeof(debug) !== 'undefined' && debug) {
        console.log('text : ' + node.find('.xsq_input').val());
        console.log('value : ' + node.find('.xsq_input_val').val());
    }
}
$(function() {
    if (typeof(debug) !== 'undefined' && debug) {
        $('.xsq_select input[type="text"],.xsq_select dl').css('width', 'initial');
        $('.xsq_select dl').css('border', '2px solid red');
    }
    $('.xsq_select .xsq_input').keyup(function(e) {
        var node = $(this).parents('.xsq_select');
        //for the navigation up & down
        if (e.keyCode == 40) { //down
            var filteredItems = node.find('dl dd:visible');
            var selectedItem = node.find('dl dd.selected').removeClass('selected');
            var currentIndex = filteredItems.index(selectedItem);
            currentIndex++;
            if ((typeof(log) !== 'undefined' && log) || typeof(debug) !== 'undefined' && debug) {
                console.log('position : ' + currentIndex);
            }

            filteredItems.eq(currentIndex).addClass('selected');
            return;
        } else if (e.keyCode == 38) { //up
            var filteredItems = node.find('dl dd:visible');
            var selectedItem = node.find('dl dd.selected').removeClass('selected');
            var currentIndex = filteredItems.index(selectedItem);
            currentIndex--;
            if ((typeof(log) !== 'undefined' && log) || typeof(debug) !== 'undefined' && debug) {
                console.log('position : ' + currentIndex);
            }
            filteredItems.eq(currentIndex).addClass('selected');
            return;
        } else if (e.keyCode == 13) { //enter
            node.find('dl dd.selected').removeClass('selected').click();
            return;
        }
        xsq_log(node);
        $(this).removeClass('checked');
        node.find('dl dd.selected').removeClass('selected');
        var inputVal = $(this).val();
        var len = inputVal.length;
        if (len != 0) {
            showCloseIcon(node);
        } else {
            showDownIcon(node);
            resetInput(node);
        }

        if (xsq_filter(inputVal, node)) {
            node.find('dl').show();
        }

        // console.log(len);
    });

    $('.xsq_select dl dd').click(function() {
        // alert(1);
        var node = $(this).parents('.xsq_select');
        var $currentNode = $(this);

        node.find('.xsq_input').val($currentNode.text());
        node.find('.xsq_input_val').val($currentNode.attr('value'));

        //show log
        xsq_log(node);

        node.find('.xsq_input').addClass('checked');
        node.find('dl').hide();
        showCloseIcon(node);
    });

    $('.xsq_select b.down').click(function() {
        var node = $(this).parents('.xsq_select');
        xsq_log(node);
        resetList(node);
        $(this).hide();
    });

    $('.xsq_select b.close').click(function() {
        var node = $(this).parents('.xsq_select');
        xsq_log(node);
        resetInput(node);
        node.find('dl').css('display', 'none');
    });

    $('.xsq_select .xsq_input').focus(function() {
        var node = $(this).parents('.xsq_select');
        xsq_log(node);
        var len = $(this).val().length;
        if (len != 0) {
            showCloseIcon(node);
        } else {
            showDownIcon(node);
        }
        node.find('dl').hide();
    });

    if (typeof(debug) !== 'undefined' && debug) {
        $('.xsq_select dl dd').mouseenter(function() {
            var node = $(this).parents('.xsq_select');
            var value = $(this).attr('value');
            var dom = '<span style="color:red;float:right;display:inline-block;">value : ' + value + '</span>';
            node.find('dl span').remove();
            $(dom).insertAfter($(this));
        });

        $('.xsq_select dl dd').mouseout(function() {
            var node = $(this).parents('.xsq_select');
            node.find('dl span').remove();
        });
    }



    // demo of the page
    $('dd[value="319"]').click();
});

