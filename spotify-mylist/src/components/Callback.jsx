import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { getAccessToken } from "../static/js/main";
import { Navigate, useNavigate } from "react-router-dom";

function Callback() {
  getAccessToken();

  return <Navigate to="/" />;
}

export default Callback;
