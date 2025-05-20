"use client";
// import { useEffect } from "react";
// import { useRecoilState } from "recoil";

// import { globeVisibleState } from "@/atoms/globe-visible";

// export default function Error({
//  error,
//  reset,
// }: {
//  error: Error & { digest?: string };
//  reset: () => void;
// }): React.JSX.Element | null {
//  const [, setRecoilGlobeVisible] = useRecoilState(globeVisibleState);

//  useEffect(() => {
//      if (error.toString().toLocaleLowerCase().includes("webgl")) {
//          setRecoilGlobeVisible(false);
//          reset();
//      }
//  }, [error]);

//  return (
//      <div className="flex h-[100vh] items-center justify-center">
//          <div className="flex flex-col items-start justify-center gap-8 p-8 sm:p-16">
//              <p>Oops! It seems there was a problem loading the website.</p>
//              <p className="flex flex-col gap-4">
//                  <p>
//                      Please try{" "}
//                      <a
//                          className="underline"
//                          href="#"
//                          onClick={(): void => {
//                              window.location.reload();
//                          }}>
//                          refreshing
//                      </a>{" "}
//                      the page.
//                  </p>
//                  <p>If the issue persists, try using a different web browser.</p>
//                  <p className="mt-4 text-[0.5rem] text-gray-700">{error.toString().slice(0, 200)}</p>
//              </p>
//          </div>
//      </div>
//  );
// }
