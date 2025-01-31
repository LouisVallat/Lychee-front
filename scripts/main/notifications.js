let notifications = {
	json: "",
};

notifications.update = function (params) {
	if (params.email.length > 1) {
		var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!regexp.test(String(params.email).toLowerCase())) {
			loadingBar.show("error", "Not a valid email address.");
			return false;
		}
	}

	api.post("User::UpdateEmail", params, function (data) {
		if (data !== true) {
			loadingBar.show("error", data.description);
			lychee.error(null, params, data);
		} else {
			loadingBar.show("success", "Email updated!");
		}
	});
};

notifications.load = function () {
	api.post("User::GetEmail", {}, function (data) {
		notifications.json = data;
		view.notifications.init();
	});
};
