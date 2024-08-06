import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <h1 className="font-header text-5xl mb-8">Oops!</h1>
      <p className="mb-2">Sorry, an unexpected error has occurred.</p>
      <div>
        <p className="text-[#aaa] font-light mb-6">{errorMessage}</p>
      </div>
      <button
        className="bg-primary-500 p-5 py-3 rounded-md text-black text-sm font-semibold font-display hover:bg-primary-300 ease-in duration-100"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </div>
  );
}
