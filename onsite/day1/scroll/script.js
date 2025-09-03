i = 0
l = ['red','blue','green','yellow','grey','black','pink','violet']
window.addEventListener("scroll", function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        let d = document.createElement('div');
        d.innerHTML = "Post " + String(i);
        d.style.background = l[Math.floor(Math.random() * l.length)];
        d.style.color = 'white';
        document.body.appendChild(d);
        i += 1
    }
});

// window.addEventListener("scroll", function () { ... });

// This sets up an event listener that runs the function every time the user scrolls.

// window.innerHeight

// This gives the height of the visible part of the browser window (viewport).

// window.scrollY

// This gives the number of pixels the user has scrolled vertically from the top of the page.

// document.body.offsetHeight

// This gives the total height of the entire web page (including the part that is not currently visible).


function load(){
    let  notscrollable = document.body.offsetHeight <= window.innerHeight;
    while (notscrollable){
        let d = document.createElement('div');
        d.innerHTML = "Post " + String(i);
        d.style.background = l[Math.floor(Math.random() * l.length)];
        d.style.color = 'white';
        document.body.appendChild(d);
        i += 1
        notscrollable = document.body.offsetHeight <= window.innerHeight;
    }

}

window.addEventListener("load", load);