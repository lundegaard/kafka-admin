import { toast } from 'react-toastify';
import { ADMIN_API_URL } from '../../constants';

const BASE_URL = ADMIN_API_URL;

const toastInfo = (from, response) => {
  const msg = `${from}: ${response.status} ${response.statusText}`;
  toast.info(msg);
};

const toastWarn = (from, response) => {
  const msg = `${from}: ${response.status} ${response.statusText}`;
  toast.warn(msg);
};

const toastError = (from, response) => {
  const msg = `${from}: ${response.status} ${response.statusText}`;
  toast.error(msg);
};

export const getConnectors = async () => {
  const url = `${BASE_URL}/connectors`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status > 200) {
    toastError('Get Connectors', response);
    return '';
  }
  return response.json();
};

export const postConnectors = async (data) => {
  const url = `${BASE_URL}/connectors`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  });
  if (response.status === 409) {
    toastError('Post Connectors', response);
    return '';
  }
  toastInfo('Post Connectors', response);
  return response.json();
};

// CONNECTOR INFORMATION

export const getConnectorName = async (name) => {
  const url = `${BASE_URL}/connectors/${name}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status > 200) {
    toastError(`Get Connector ${name}`, response);
    return '';
  }
  return response.json();
};

export const getConnectorConfig = async (name) => {
  const url = `${BASE_URL}/connectors/${name}/config`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status > 200) {
    toastError(`Get Connector Config ${name}`, response);
    return '';
  }
  return response.json();
};

export const putConnectorConfig = async (name) => {
  const url = `${BASE_URL}/connectors/${name}/config`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.status > 201) {
    toastError(`Put Connector Config ${name}`, response);
    return '';
  }
  toastInfo(`Put Connector Config ${name}`, response);
  return response.json();
};

export const getConnectorStatus = async (name) => {
  const url = `${BASE_URL}/connectors/${name}/status`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status > 200) {
    toastError(`Get Connector Status ${name}`, response);
    return '';
  }
  return response.json();
};


// CONNECTOR OPERATIONS

export const postConnectorRestart = async (name) => {
  const url = `${BASE_URL}/connectors/${name}/restart`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 409) {
    toastWarn(`Post Connector Restart ${name}`, response);
    return;
  }
  if (response.status > 200) {
    toastError(`Post Connector Restart ${name}`, response);
  }
  toastInfo(`Post Connector Restart ${name}`, response);
};

export const putConnectorPause = async (name) => {
  const url = `${BASE_URL}/connectors/${name}/pause`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 202) {
    toastWarn(`Put Connector Pause ${name}`, response);
    return;
  }
  if (response.status > 200) {
    toastError(`Put Connector Pause ${name}`, response);
    return;
  }
  toastInfo(`Put Connector Pause ${name}`, response);
};

export const putConnectorResume = async (name) => {
  const url = `${BASE_URL}/connectors/${name}/resume`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 202) {
    toastWarn(`Put Connector Resume ${name}`, response);
    return;
  }
  if (response.status > 200) {
    toastError(`Put Connector Resume ${name}`, response);
    return;
  }
  toastInfo(`Put Connector Resume ${name}`, response);
};

export const deleteConnector = async (name) => {
  const url = `${BASE_URL}/connectors/${name}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status === 409) {
    toastWarn(`Delete Connector ${name}`, response);
    return;
  }
  if (response.status > 200) {
    toastError(`Delete Connector ${name}`, response);
    return;
  }
  toastWarn(`Delete Connector ${name}`, response);
};

// TASKS

export const getConnectorTasks = async (name) => {
  const url = `${BASE_URL}/connectors/${name}/tasks`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status > 200) {
    toastError(`Get Connector Tasks ${name}`, response);
    return '';
  }
  return response.json();
};

export const getConnectorTaskStatus = async (name, taskId) => {
  const url = `${BASE_URL}/connectors/${name}/tasks/${taskId}/status`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status > 200) {
    toastError(`Get Connector Task Status ${name}`, response);
    return '';
  }
  toastInfo(`Get Connector Task Status ${name}`, response);
  return response.json();
};

export const postConnectorTaskRestart = async (name, taskId) => {
  const url = `${BASE_URL}/connectors/${name}/tasks/${taskId}/restart`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (response.status > 200) {
    toastError(`Post Connector Task Restart ${name}`, response);
    return '';
  }
  toastWarn(`Post Connector Task Restart ${name}`, response);
  return response.json();
};

// PLUGINS

export const getConnectorPlugins = async () => {
  const url = `${BASE_URL}/connector-plugins`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (response.status > 200) {
    toastError('Get Connector Plugins', response);
    return '';
  }
  return response.json();
};

export const putConnectorPluginsConfigValidate = async (name, data) => {
  const url = `${BASE_URL}/connector-plugins/${name}/config/validate`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  });
  if (response.status > 200) {
    toastError(`Plugin Config Validate ${name}`, response);
    return '';
  }
  toastInfo(`Plugin Config Validate ${name}`, response);
  return response.json();
};
