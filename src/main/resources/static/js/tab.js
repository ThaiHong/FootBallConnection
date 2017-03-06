/**
 * Created by nmtri on 12/26/2016.
 */
$(document).ready(function() {

    (function ($) {
        $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

        $('.tab ul.tabs li a').click(function (g) {
            var tab = $(this).closest('.tab'),
                index = $(this).closest('li').index();

            tab.find('ul.tabs > li').removeClass('current');
            $(this).closest('li').addClass('current');

            tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
            tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

            g.preventDefault();
        } );
    })(jQuery);

});

var loading= { message: '<img src="/assets/loading.gif" width="120"/>',css: {
    border:     'none',
    backgroundColor:'transparent'
},baseZ: 9999 }

