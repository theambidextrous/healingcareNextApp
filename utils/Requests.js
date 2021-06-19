import conf from "./config";

const loginUser = (postData) => {
  return fetch(conf.base_api + "users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
  .then((res) => {
    return res.json();
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};
const subscribeAlert = (postData) => {
  return fetch(conf.base_api + "users/sub/alerts", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
  .then((res) => {
    return res.json();
  })
  .catch((error) => {
    return Promise.reject(error);
  });
}
const addJob = (postData) => {
  return fetch(conf.base_api + "jobs/add/mann", {
    method: "POST",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      // "Authorization": "Bearer faketoken",
    },
    body: postData,
  })
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .catch((error) => {
      // console.log(error);
      return Promise.reject(error);
    });
};
const editJob = (postData, editlink) => {
  return fetch(conf.base_api + "jobs/edit/mann/" + editlink, {
    method: "POST",
    headers: {
      // Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      // "Authorization": "Bearer faketoken",
    },
    body: postData,
  })
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .catch((error) => {
      // console.log(error);
      return Promise.reject(error);
    });
};
const addUser = (postData) => {
  return fetch(conf.base_api + "users/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
const getJob = (jobId) => {
  return fetch(conf.base_api + "jobs/find/" + jobId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
        console.log(error);
      return Promise.reject(error);
    });
};
const getJobEditLink = (editlink) => {
  return fetch(conf.base_api + "jobs/find/for/edit/" + editlink, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
        console.log(error);
      return Promise.reject(error);
    });
};
const getJobs = (page) => {
    return fetch(conf.base_api + "jobs/find/all/list/" + page, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200 ) {
          return res.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        // console.log(error);
        return Promise.reject("Server authorization failed");
      });
};
const findByTag = (tag, offset) => {
  return fetch(conf.base_api + "jobs/find/by/" + tag + "/list/" + offset, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .catch((error) => {
      // console.log(error);
      return Promise.reject("Server authorization failed");
    });
};
const findByCompany = (company, offset) => {
  return fetch(conf.base_api + "jobs/find/co/" + company + "/list/" + offset, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .catch((error) => {
      // console.log(error);
      return Promise.reject("Server authorization failed");
    });
};
const searchJobs = (keyword) => {
    return fetch(conf.base_api + "jobs/search/all/list/" + keyword, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        // console.log(error);
        return Promise.reject("Server authorization failed");
      });
};
export {
  loginUser,
  addJob,
  editJob,
  addUser,
  getJob,
  getJobs,
  searchJobs,
  subscribeAlert,
  findByTag,
  findByCompany,
  getJobEditLink

};
