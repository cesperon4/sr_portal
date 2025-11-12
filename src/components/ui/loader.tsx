type LoaderProps = {
  text: string;
};

export function Loader({ text }: LoaderProps) {
  return (
    <div className="loader mx-auto mt-10">
      <div>
        <ul>
          {[...Array(5)].map((_, i) => (
            <li key={i}>
              <svg
                viewBox="0 0 90 120"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  width="90"
                  height="120"
                  rx="10"
                  ry="10"
                  fill="currentColor"
                />
                <line
                  x1="10"
                  y1="20"
                  x2="80"
                  y2="20"
                  stroke="white"
                  strokeOpacity="0.5"
                />
                <line
                  x1="10"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke="white"
                  strokeOpacity="0.5"
                />
                <line
                  x1="10"
                  y1="60"
                  x2="80"
                  y2="60"
                  stroke="white"
                  strokeOpacity="0.5"
                />
                <line
                  x1="10"
                  y1="80"
                  x2="80"
                  y2="80"
                  stroke="white"
                  strokeOpacity="0.5"
                />
                <line
                  x1="10"
                  y1="100"
                  x2="80"
                  y2="100"
                  stroke="white"
                  strokeOpacity="0.5"
                />
              </svg>
            </li>
          ))}
        </ul>
      </div>
      <span className="text-gray-500 text-sm mt-4 block text-center font-semibold">
        {text}
      </span>
    </div>
  );
}
