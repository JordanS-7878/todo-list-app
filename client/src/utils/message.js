import { message } from "antd";

let messageApi = null;

// called once in App
export const setMessageApi = (api) => {
  messageApi = api;
};

export const showMessage = {
  success: (text) => messageApi?.success(text),
  error: (text) => messageApi?.error(text),
  info: (text) => messageApi?.info(text),
  warning: (text) => messageApi?.warning(text),
};
