import ErrorPage from './_ErrorPage';

const QueryError = ({ error }: { error: string }) => <ErrorPage statusCode={500} errorMessage={error.toString()} />;

export default QueryError;
