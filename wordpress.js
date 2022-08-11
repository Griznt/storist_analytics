
// Код аналитики wordpress блога, assets/js/theme.js

// DO NOT REMOVE!!! Amplitude analytics
		window.startTime = window.startTime || new Date();
		if (!amplitude.getInstance()) 
			amplitude.getInstance().init(AMPLITUDE_ID);
		function calculateDuration() {
			var endTime = new Date();
			return endTime - window.startTime;
		}
		function logEvent(event, name, props) {
			if(!props)
				props = {};
			props.duration = calculateDuration();
// 			console.warn('logging event: ', name, props, event)
			amplitude.getInstance().logEvent(name, props);
		}
		// Try for free and all buttons which leads to App [by url https://a3.storist.me/#/courses]
			function handleButtonClick(event) {
				var text = event.target.text;
				var pageURL = document.location.host + document.location.pathname;
				if(!text)
					text = event.target.innerText;
				logEvent(event, 'external_app_link_clicked', {source: 'blog', page: pageURL, text: text})
			}
			var buttons = $("a[href^='https://a3.storist.me/']");
			for(i = 0; i < buttons.length; i++) {
					var button = $(buttons[i]);
					button.on('click', handleButtonClick);
			}
// Amplitude analytics end


// Amplitude Analytics initialization. Theme Header -> header.php
// <!-- Amplitude analytics start -->
	// <script type="text/javascript">
		var AMPLITUDE_ID = "XXXXXXXXXX";

!function(e,t){var n=e.amplitude||{_q:[],_iq:{}},s=t.createElement("script");s.type="text/javascript",
s.integrity="sha384-hdEvx3zkd6VeH6O83N6nPQeUBkmA/KVVI/xP1PTxTSX9EGdyzELov1iyspAgfaI8",
s.crossOrigin="anonymous",s.async=!0,
s.src="https://cdn.amplitude.com/libs/amplitude-8.19.0-min.gz.js",
s.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};
var r=t.getElementsByTagName("script")[0];
function i(e,t){e.prototype[t]=function(){return this._q.push([t].concat(Array.prototype.slice.call(arguments,0))),this}}
r.parentNode.insertBefore(s,r);
for(var o=function(){return this._q=[],this},a=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove"],c=0;c<a.length;c++)i(o,a[c]);
n.Identify=o;for(var l=function(){return this._q=[],this},p=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"],u=0;u<p.length;u++)i(l,p[u]);
n.Revenue=l;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","enableTracking","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","groupIdentify","onInit","onNewSessionStart","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId","getDeviceId","getUserId","setMinTimeBetweenSessionsMillis","setEventUploadThreshold","setUseDynamicConfig","setServerZone","setServerUrl","sendEvents","setLibrary","setTransport"];
function v(e){function t(t){e[t]=function(){e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}for(var n=0;n<d.length;n++)t(d[n])}v(n),n.getInstance=function(e){return e=(e&&0!==e.length?e:"$default_instance").toLowerCase(),Object.prototype.hasOwnProperty.call(n._iq,e)||(n._iq[e]={_q:[]},v(n._iq[e])),n._iq[e]},e.amplitude=n}(window,document);

		var userId;
		var cookies = document.cookie.split('; ');
		for (var i = 0; i < cookies.length; i++) {
			var [key, value] = cookies[i];
			if(key == 'userId')
				userId = value;
	}
		amplitude.getInstance().init(AMPLITUDE_ID, userId || null, {
			includeUtm: true,
			includeReferrer: true,
			saveParamsReferrerOncePerSession: true
		});

	// </script>
	// <script>
		jQuery(document).ready(function($) {
			window.startTime = new Date();
			var pageURL = document.location.host + document.location.pathname;
		var checkExist = setInterval(function() {
		   if (amplitude && amplitude.getInstance()) {
			//URL query params (includes UTM and yclid/gclid)
				var urlSearchParams = new URLSearchParams(window.location.search);
				var params = Object.fromEntries(urlSearchParams.entries());
				params.page = pageURL;
				// amplitude.getInstance().setUserProperties(params); 
				amplitude.getInstance().logEvent("blog opened", params);
				clearInterval(checkExist);
		   }
		}, 100); 
		});
	// </script>
// <!-- Amplitude analytics end -->
