import renderWhile from 'lib/renderWhile';
import LoadingPage from 'pages/_loading';

export default renderWhile(({ loading }) => loading, LoadingPage);
