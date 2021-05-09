import React, { Component, useEffect, useState, useRef } from "react";

const HistorySample = (props) => {
  const { history } = props;
  let unblock = useRef();
  const handleGoBack = () => {
    history.goBack();
  };
  const handleGoHome = () => {
    history.push("/");
  };
  useEffect(() => {
    unblock = history.block("정말 떠나실 건가요?");
    return () => (unblock = history.block("정말 떠나실 건가요?"));
  }, []);
  return (
    <div>
      <button onClick={handleGoBack}>뒤로</button>
      <button onClick={handleGoHome}>홈으로</button>
    </div>
  );
};

export default HistorySample;
