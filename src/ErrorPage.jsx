import { Route, Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <>
      <h1>
        Page not found return <Link to="/">home</Link>
      </h1>
    </>
  );
}
export default ErrorPage;
