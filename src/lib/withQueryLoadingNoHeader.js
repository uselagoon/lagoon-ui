import renderWhile from 'lib/renderWhile';
import { LoadingPageNoHeader } from 'pages/_loading';

export default renderWhile(({ loading }) => loading, LoadingPageNoHeader);
