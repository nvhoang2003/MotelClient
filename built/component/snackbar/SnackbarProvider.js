"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var notistack_1 = require("notistack");
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
var settings_1 = require("../settings");
var iconify_1 = require("../iconify");
var styles_2 = require("./styles");
// Define the PropTypes for the component
SnackbarProvider.propTypes = {
    children: prop_types_1.default.node,
};
// Define the SnackbarProvider component
function SnackbarProvider(_a) {
    var children = _a.children;
    var themeDirection = (0, settings_1.useSettingsContext)().themeDirection;
    var isRTL = themeDirection === 'rtl';
    var notistackRef = (0, react_1.useRef)(null);
    var onClose = function (key) { return function () {
        var _a;
        (_a = notistackRef === null || notistackRef === void 0 ? void 0 : notistackRef.current) === null || _a === void 0 ? void 0 : _a.closeSnackbar(key);
    }; };
    return (<div>
      <styles_2.default>
        <notistack_1.SnackbarProvider ref={notistackRef} dense maxSnack={5} preventDuplicate autoHideDuration={3000} TransitionComponent={isRTL ? material_1.Collapse : undefined} variant="success" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} iconVariant={{
            info: <SnackbarIcon icon="eva:info-fill" color="info"/>,
            success: <SnackbarIcon icon="eva:checkmark-circle-2-fill" color="success"/>,
            warning: <SnackbarIcon icon="eva:alert-triangle-fill" color="warning"/>,
            error: <SnackbarIcon icon="eva:alert-circle-fill" color="error"/>,
        }} action={function (key) { return (<material_1.IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
              <iconify_1.default icon="eva:close-fill"/>
            </material_1.IconButton>); }}>
          {children}
        </notistack_1.SnackbarProvider>
      </styles_2.default>
    </div>);
}
exports.default = SnackbarProvider;
// Define the PropTypes for the SnackbarIcon component
SnackbarIcon.propTypes = {
    icon: prop_types_1.default.string,
    color: prop_types_1.default.string, // You might want to specify the type for color
};
// Define the SnackbarIcon component (you can replace this with your actual implementation)
function SnackbarIcon(_a) {
    var icon = _a.icon, color = _a.color;
    // Your implementation here
    return null;
}
function SnackbarIcon(_a) {
    var icon = _a.icon, color = _a.color;
    return (<material_1.Box component="span" sx={{
            mr: 1.5,
            width: 40,
            height: 40,
            display: 'flex',
            borderRadius: 1.5,
            alignItems: 'center',
            justifyContent: 'center',
            color: "".concat(color, ".main"),
            bgcolor: function (theme) { return (0, styles_1.alpha)(theme.palette[color].main, 0.16); },
        }}>
      <iconify_1.default icon={icon} width={24}/>
    </material_1.Box>);
}
