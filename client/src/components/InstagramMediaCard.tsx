import { useEffect } from "react";

// Extend the Window interface to include the 'instgrm' property
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const InstagramMediaCard = ({
  permalink,
  username,
  displayName,
}: {
  permalink: string;
  username: string;
  displayName: string;
}) => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [permalink]);

  return (
    <div className="my-2">
      <blockquote
        className="instagram-media m-[1px] w-[calc(100%-2px)] max-w-[540px] min-w-[326px] rounded border-0 bg-white p-0 shadow"
        data-instgrm-captioned
        data-instgrm-permalink={permalink}
        data-instgrm-version="14"
      >
        <div className="p-4">
          <a
            href={permalink}
            className="block w-full bg-white text-center no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Header: Avatar & Text Skeleton */}
            <div className="mb-4 flex items-center">
              <div className="mr-4 h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex flex-grow flex-col justify-center">
                <div className="mb-1 h-3.5 w-[100px] rounded bg-gray-200"></div>
                <div className="h-3.5 w-[60px] rounded bg-gray-200"></div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="pt-[19%]"></div>

            {/* Instagram Icon Placeholder */}
            <div className="mx-auto mb-3 h-[50px] w-[50px] rounded-full bg-gray-200"></div>

            {/* Link Text */}
            <div className="pt-2">
              <div className="font-sans text-sm leading-[18px] font-semibold text-[#3897f0]">
                View this post on Instagram
              </div>
            </div>

            {/* (Optional) Add more mock skeletons here */}
          </a>

          {/* Caption */}
          <p className="mt-2 overflow-hidden px-0 py-2 text-center font-sans text-sm leading-[17px] text-ellipsis whitespace-nowrap text-[#c9c8cd]">
            <a
              href={permalink}
              className="text-[#c9c8cd] no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              A post shared by {displayName} (@{username})
            </a>
          </p>
        </div>
      </blockquote>
    </div>
  );
};

export default InstagramMediaCard;
