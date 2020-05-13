'use strict'

window.addEventListener('load', () => {
    const url = new URL(window.location.href);
    console.log(url.searchParams.get("name"));
})
