const { GRPC } = require("@cerbos/grpc");
const { users } = require("./db");

// The Cerbos PDP instance
const cerbos = new GRPC("localhost:3593", {
  tls: false,
});

const SHOW_PDP_REQUEST_LOG = false;

module.exports = async (principalId, action, resourceAtrr = {}) => {
  const user = users.find((item) => item.id === Number(principalId));

  const cerbosObject = {
    resource: {
      kind: "blogpost",
      policyVersion: "default",
      id: resourceAtrr.id + "" || "new",
      attributes: resourceAtrr,
    },
    principal: {
      id: principalId + "" || "0",
      policyVersion: "default",
      roles: [user?.role || "unknown"],
      attributes: user,
    },
    actions: [action],
  };

  SHOW_PDP_REQUEST_LOG &&
    console.log("cerbosObject \n", JSON.stringify(cerbosObject, null, 4));

  const cerbosCheck = await cerbos.checkResource(cerbosObject);

  const isAuthorized = cerbosCheck.isAllowed(action);

  if (!isAuthorized)
    throw new Error("You are not authorized to visit this resource");
  return true;
};
