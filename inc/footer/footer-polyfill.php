<?php
/**
 * Theme:				
 * Template:			footer-polyfill.php
 * Description:			
 */
?>

<script id="polyfill-checker">
    /* <![CDATA[ */
    (function () {
            var cssPropertyValueSupported = function cssPropertyValueSupported(prop, value) {
                var d = document.createElement('div');
                d.style[prop] = value;
                return d.style[prop] === value;
            };
            if (!cssPropertyValueSupported('position', 'sticky')) {
                var stickyScript = document.createElement('script');
                stickyScript.src = '<?php echo get_template_directory_uri() . "/js/polyfills/sticky.polyfill.min.js"; ?>';
                document.body.appendChild(stickyScript);
            }
            if (!cssPropertyValueSupported('object-fit', 'cover')) {
                var objectFitScript = document.createElement('script');
                objectFitScript.src = '<?php echo get_template_directory_uri() . "/js/polyfills/object-fit.polyfill.min.js"; ?>';
                objectFitScript.async = false;
                objectFitScript.addEventListener('load', function() {
                    var objectFitInlineScript = document.createElement('script');
                    var initPolyFill = document.createTextNode('(function() { objectFitImages() }());');
                    objectFitInlineScript.appendChild(initPolyFill);
                    document.body.appendChild(objectFitInlineScript);
                });
                document.body.appendChild(objectFitScript);
            }
            if (!('Promise' in window)) {
                var promiseScript = document.createElement('script');
                promiseScript.src = '<?php echo get_template_directory_uri() . "/js/polyfills/promise.polyfill.min.js"; ?>';
                document.body.appendChild(promiseScript);
            }
            if (!('fetch' in window)) {
                var fetchScript = document.createElement('script');
                fetchScript.src = '<?php echo get_template_directory_uri() . "/js/polyfills/fetch.polyfill.min.js"; ?>';
                document.body.appendChild(fetchScript);
            }
            if (!('IntersectionObserver' in window)) {
                var intersectionScript = document.createElement('script');
                intersectionScript.src = '<?php echo get_template_directory_uri() . "/js/polyfills/intersectionobserver.polyfill.min.js"; ?>';
                document.body.appendChild(intersectionScript);
            }
            if (!('DOMParser' in window)) {
                var domParserScript = document.createElement('script');
                domParserScript.src = '<?php echo get_template_directory_uri() . "/js/polyfills/domparser.polyfill.min.js"; ?>';
                document.body.appendChild(domParserScript);
            }
            if (!('scroll' in window) || !('scrollBy' in window) || !('scrollTo' in window)) {
                var smoothScrollScript = document.createElement('script');
                smoothScrollScript.src = '<?php echo get_template_directory_uri() . "/js/polyfills/smoothscroll.polyfill.min.js"; ?>';
                document.body.appendChild(smoothScrollScript);
            }
        }());
    /* ]]> */
</script>