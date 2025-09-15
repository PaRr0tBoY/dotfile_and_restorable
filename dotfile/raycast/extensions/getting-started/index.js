"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  default: () => Command
});
module.exports = __toCommonJS(src_exports);
var import_api = require("@raycast/api");
var import_jsx_runtime = require("react/jsx-runtime");
function Command() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_api.List, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_api.List.Section, { title: "Basics", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkListItem, { title: "Familiarize yourself with Raycast", link: "https://raycast.com/manual" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkListItem, { title: "Install extensions from our public store", link: "https://www.raycast.com/store" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkListItem, { title: "Build your own extensions with our API", link: "https://developers.raycast.com" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkListItem, { title: "Invite your teammates", link: "raycast://organizations/ryanspace/manage" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_api.List.Section, { title: "Next Steps", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkListItem, { title: "Join the Raycast community", link: "https://raycast.com/community" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkListItem, { title: "Stay up to date via Twitter", link: "https://twitter.com/raycastapp" })
    ] })
  ] });
}
function LinkListItem(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_api.List.Item,
    {
      title: props.title,
      icon: import_api.Icon.Link,
      accessories: [{ text: props.link }],
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_api.ActionPanel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Action.OpenInBrowser, { url: props.link }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Action.CopyToClipboard, { title: "Copy Link", content: props.link })
      ] })
    }
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vRG9jdW1lbnRzL2NvZGUvcmF5Y2FzdEV4dC9yYXljYXN0LWV4dGVuc2lvbnMvZ2V0dGluZy1zdGFydGVkL3NyYy9pbmRleC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEFjdGlvblBhbmVsLCBBY3Rpb24sIEljb24sIExpc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gIHJldHVybiAoXG4gICAgPExpc3Q+XG4gICAgICA8TGlzdC5TZWN0aW9uIHRpdGxlPVwiQmFzaWNzXCI+XG4gICAgICAgIDxMaW5rTGlzdEl0ZW0gdGl0bGU9XCJGYW1pbGlhcml6ZSB5b3Vyc2VsZiB3aXRoIFJheWNhc3RcIiBsaW5rPVwiaHR0cHM6Ly9yYXljYXN0LmNvbS9tYW51YWxcIiAvPlxuICAgICAgICA8TGlua0xpc3RJdGVtIHRpdGxlPVwiSW5zdGFsbCBleHRlbnNpb25zIGZyb20gb3VyIHB1YmxpYyBzdG9yZVwiIGxpbms9XCJodHRwczovL3d3dy5yYXljYXN0LmNvbS9zdG9yZVwiIC8+XG4gICAgICAgIDxMaW5rTGlzdEl0ZW0gdGl0bGU9XCJCdWlsZCB5b3VyIG93biBleHRlbnNpb25zIHdpdGggb3VyIEFQSVwiIGxpbms9XCJodHRwczovL2RldmVsb3BlcnMucmF5Y2FzdC5jb21cIiAvPlxuICAgICAgICA8TGlua0xpc3RJdGVtIHRpdGxlPVwiSW52aXRlIHlvdXIgdGVhbW1hdGVzXCIgbGluaz1cInJheWNhc3Q6Ly9vcmdhbml6YXRpb25zL3J5YW5zcGFjZS9tYW5hZ2VcIiAvPlxuICAgICAgPC9MaXN0LlNlY3Rpb24+XG4gICAgICA8TGlzdC5TZWN0aW9uIHRpdGxlPVwiTmV4dCBTdGVwc1wiPlxuICAgICAgICA8TGlua0xpc3RJdGVtIHRpdGxlPVwiSm9pbiB0aGUgUmF5Y2FzdCBjb21tdW5pdHlcIiBsaW5rPVwiaHR0cHM6Ly9yYXljYXN0LmNvbS9jb21tdW5pdHlcIiAvPlxuICAgICAgICA8TGlua0xpc3RJdGVtIHRpdGxlPVwiU3RheSB1cCB0byBkYXRlIHZpYSBUd2l0dGVyXCIgbGluaz1cImh0dHBzOi8vdHdpdHRlci5jb20vcmF5Y2FzdGFwcFwiIC8+XG4gICAgICA8L0xpc3QuU2VjdGlvbj5cbiAgICA8L0xpc3Q+XG4gICk7XG59XG5cbmZ1bmN0aW9uIExpbmtMaXN0SXRlbShwcm9wczogeyB0aXRsZTogc3RyaW5nOyBsaW5rOiBzdHJpbmcgfSkge1xuICByZXR1cm4gKFxuICAgIDxMaXN0Lkl0ZW1cbiAgICAgIHRpdGxlPXtwcm9wcy50aXRsZX1cbiAgICAgIGljb249e0ljb24uTGlua31cbiAgICAgIGFjY2Vzc29yaWVzPXtbeyB0ZXh0OiBwcm9wcy5saW5rIH1dfVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uLk9wZW5JbkJyb3dzZXIgdXJsPXtwcm9wcy5saW5rfSAvPlxuICAgICAgICAgIDxBY3Rpb24uQ29weVRvQ2xpcGJvYXJkIHRpdGxlPVwiQ29weSBMaW5rXCIgY29udGVudD17cHJvcHMubGlua30gLz5cbiAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgIH1cbiAgICAvPlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWdEO0FBSzFDO0FBSFMsU0FBUixVQUEyQjtBQUNoQyxTQUNFLDZDQUFDLG1CQUNDO0FBQUEsaURBQUMsZ0JBQUssU0FBTCxFQUFhLE9BQU0sVUFDbEI7QUFBQSxrREFBQyxnQkFBYSxPQUFNLHFDQUFvQyxNQUFLLDhCQUE2QjtBQUFBLE1BQzFGLDRDQUFDLGdCQUFhLE9BQU0sNENBQTJDLE1BQUssaUNBQWdDO0FBQUEsTUFDcEcsNENBQUMsZ0JBQWEsT0FBTSwwQ0FBeUMsTUFBSyxrQ0FBaUM7QUFBQSxNQUNuRyw0Q0FBQyxnQkFBYSxPQUFNLHlCQUF3QixNQUFLLDRDQUEyQztBQUFBLE9BQzlGO0FBQUEsSUFDQSw2Q0FBQyxnQkFBSyxTQUFMLEVBQWEsT0FBTSxjQUNsQjtBQUFBLGtEQUFDLGdCQUFhLE9BQU0sOEJBQTZCLE1BQUssaUNBQWdDO0FBQUEsTUFDdEYsNENBQUMsZ0JBQWEsT0FBTSwrQkFBOEIsTUFBSyxrQ0FBaUM7QUFBQSxPQUMxRjtBQUFBLEtBQ0Y7QUFFSjtBQUVBLFNBQVMsYUFBYSxPQUF3QztBQUM1RCxTQUNFO0FBQUEsSUFBQyxnQkFBSztBQUFBLElBQUw7QUFBQSxNQUNDLE9BQU8sTUFBTTtBQUFBLE1BQ2IsTUFBTSxnQkFBSztBQUFBLE1BQ1gsYUFBYSxDQUFDLEVBQUUsTUFBTSxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQ2xDLFNBQ0UsNkNBQUMsMEJBQ0M7QUFBQSxvREFBQyxrQkFBTyxlQUFQLEVBQXFCLEtBQUssTUFBTSxNQUFNO0FBQUEsUUFDdkMsNENBQUMsa0JBQU8saUJBQVAsRUFBdUIsT0FBTSxhQUFZLFNBQVMsTUFBTSxNQUFNO0FBQUEsU0FDakU7QUFBQTtBQUFBLEVBRUo7QUFFSjsiLAogICJuYW1lcyI6IFtdCn0K
