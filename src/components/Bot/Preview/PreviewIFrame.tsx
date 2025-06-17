import React from "react";
export const PreviewIframe = () => {
  const [hostUrl] = React.useState<string>(
    () =>
      import.meta.env.VITE_HOST_URL ||
      window.location.protocol + "//" + window.location.host
  );
  return (
    <>
      <div>
        <iframe
          src={`${hostUrl}/#/embed/chat/?mode=iframe&no=button`}
          className="w-full bg-white"
          height={585}
          title="ScaffoldGPT"
        />
      </div>
    </>
  );
};
