import * as React from 'react';
import { useEffect, useState } from "react";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/session_status?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
        setSession(data.session);
      });
  }, []);

  console.log(status);
  console.log(session);

  if (status === 'open') {
    return (
      <p>Error</p>
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

export default Return;