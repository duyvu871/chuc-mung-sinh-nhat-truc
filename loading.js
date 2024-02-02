// Disclaimer: The progression number and the animation doesn't add up, it's just for looks!

// Get element
const $count = $('[data-count-to]'),
    to = parseFloat($count.attr('data-count-to'));

// Get animation properties
const root = window.getComputedStyle(document.documentElement),
    duration = root.getPropertyValue('--progress-duration'),
    easing = root.getPropertyValue('--progress-easing');

$({countNum: 0}).animate({countNum: to}, {
    duration: duration / 2,
    easing: 'swing',
    step: function() {
        const process = Math.ceil(this.countNum);
        $count.text(process);
        if (process === 100) {
            setTimeout(() => {
                $('body').addClass('completed');
            }, 0);
        }
    },
    complete: completed()
});

function completed() {
    console.log('completed');
}