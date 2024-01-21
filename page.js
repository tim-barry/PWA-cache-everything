// Executes in webpage context, with access to DOM
// Executes on each navigation

const CACHE_NAME = "v1";
const SW_controls = () => document.querySelectorAll(".sw_control");
const SW_message = () => document.querySelector("#sw_message");

function showMsg(s) {
	SW_message().innerText = s;
}

if ("serviceWorker" in navigator) {
	//let the user activate SW registration with a button press
} else {
	SW_controls().forEach(el => {el.disabled = true;});
	showMsg("Service Workers not supported by your browser");
}

function enable_SW() {
	navigator.serviceWorker.register("/sw.js").then(
		reg => showMsg("Service Worker registered"),
		err => showMsg(`Service Worker registration failed: ${err}`)
	);
}
function disable_SW() {
	navigator.serviceWorker.getRegistration()
		.then(reg => reg?.unregister())
		.then(result => showMsg(result ? "Unregistered!" : "Wasn't registered yet"));
}
function clear_caches() {
	caches.delete(CACHE_NAME).then(result => showMsg(result ? "Deleted cache" : "Cache did not exist"));
}


