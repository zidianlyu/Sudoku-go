$('button').click(function(e) {
    let target = e.target;
    let rect = e.target.getBoundingClientRect();
    let ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
    target.appendChild(ripple);
    let rippleTopPos = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    let rippleLeftPos = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    let rippleClass = setTimeout(function() {
        $('.ripple').remove();
    }, 500);
});
