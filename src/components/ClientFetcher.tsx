"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

const postmanBaseUrl =
  "https://b68f973d-c1e1-4f26-b67b-d76378990081.mock.pstmn.io";

const postmanNoAcessControlEndpoint = `${postmanBaseUrl}/noAccessControl`;
const postmanAccessControlEndpoint = `${postmanBaseUrl}/accessControl`;

const fetchFromApi = async (accessControl?: boolean | null | undefined) => {
  const searchParams = new URLSearchParams({});
  if (accessControl) searchParams.append("accessControl", "true");

  const response = await fetch("/api?" + searchParams);

  return response;
};

export default function ClientFetcher() {
  const [someOriginaccessControlResponse, setSameOriginAccessControlResponse] =
    useState<Response | null>(null);
  const [
    sameOriginNoAccessControlResponse,
    setSameOriginNoAccessControlResponse,
  ] = useState<Response | null>(null);

  const [
    differentOriginAccessControlResponse,
    setDifferentOriginAccessControlResponse,
  ] = useState<Response | null>(null);

  const [
    differentOriginNoAccessControlResponse,
    setDifferentOriginNoAccessControlResponse,
  ] = useState<Response | null>(null);

  const fetchData = () => {
    fetchFromApi(true).then((res) => {
      console.log("access control response", res);

      setSameOriginAccessControlResponse(res);
    });

    fetchFromApi().then((res) => {
      console.log("no access control res", res);

      setSameOriginNoAccessControlResponse(res);
    });

    fetch(postmanAccessControlEndpoint).then((res) => {
      console.log("postman access control response", res);
      setDifferentOriginAccessControlResponse(res);
    });

    fetch(postmanNoAcessControlEndpoint).then((res) => {
      console.log("postman no access control response", res);
      setDifferentOriginNoAccessControlResponse(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex">Client Fetcher component</div>
      <button
        onClick={fetchData}
        className="
        bg-blue-500 hover:bg-blue-700 text-white
        font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-blue-800 active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:active:bg-blue-800 dark:active:transform dark:active:scale-95 dark:focus:ring-opacity-50 dark:disabled:bg-blue-600 dark:disabled:hover:bg-blue-700 dark:disabled:focus:ring-blue-500 dark:disabled:active:bg-blue-800 dark:disabled:active:transform dark:disabled:active:scale-95 dark:disabled:focus:ring-opacity-50 dark "
      >
        Refetch
      </button>

      <div className="flex flex-col gap-2">
        <Link
          href="https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_response_header"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          CORS-safelisted response headers
        </Link>
        <ul>
          <li>Cache-Control</li>
          <li>Content-Language</li>
          <li>Content-Length</li>
          <li>Content-Type</li>
          <li>Expires</li>
          <li>Last-Modified</li>
          <li>Pragma</li>
        </ul>
      </div>

      <div className="">
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Expose-Headers"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Permitting scripts to access non-safelisted response headers
        </Link>
        <ul>
          <li>Access-Control-Expose-Headers</li>
        </ul>
      </div>

      <div>
        <div>
          <span className="text-purple-500">Same origin</span> headers{" "}
          <span className="text-green-500">With </span>access control
        </div>
        <div className="flex flex-col">
          {someOriginaccessControlResponse?.headers
            .entries()
            .map(([key, value], index) => (
              <div key={index}>
                {key}:{value}
              </div>
            ))}
        </div>
      </div>

      <div>
        <div>
          <span className="text-purple-500">Same origin</span> headers{" "}
          <span className="text-red-500">Without</span> access control
        </div>
        <div className="flex flex-col">
          {sameOriginNoAccessControlResponse?.headers
            .entries()
            .map(([key, value], index) => (
              <div key={index}>
                {key}:{value}
              </div>
            ))}
        </div>
      </div>

      <div>
        <div>
          <span className="text-purple-500">Different origin</span> headers{" "}
          <span className="text-green-500">With </span>access control
        </div>
        <div className="flex flex-col">
          {differentOriginAccessControlResponse?.headers
            .entries()
            .map(([key, value], index) => (
              <div key={index}>
                {key}:{value}
              </div>
            ))}
        </div>
      </div>

      <div>
        <div>
          <span className="text-purple-500">Different origin</span> headers{" "}
          <span className="text-red-500">Without</span> access control
        </div>
        <div className="flex flex-col">
          {differentOriginNoAccessControlResponse?.headers
            .entries()
            .map(([key, value], index) => (
              <div key={index}>
                {key}:{value}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
